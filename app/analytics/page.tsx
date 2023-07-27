'use client'

import { useQuery } from "@tanstack/react-query"
import { useTheme } from "next-themes"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import Link from "next/link"
import { truncateString, percentageOfTotal, currentYear } from "@/components/utils"

// Activate Chart.JS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function statsPage(){
    const { setTheme, theme } = useTheme()

    const fetchAllData = async () => {
        try {
            const res = await fetch('/api/handleData',
                {
                    method: 'GET',
                    headers: {
                        "accept": "application/json"
                    }
                },
            )
            const data = await res.json()
            return data
        }
        catch (err) {
            console.log(err)
            throw(err)
        }
    };

    // Fetches and handles state management of data
    const {data, isLoading, error} = useQuery({
        queryKey: ['allData'],
        queryFn: fetchAllData,
    });

    // @TODO: Replace with loading component
    if (isLoading) {
        return(
            <p>Loading...</p>
        )
    }

    // @TODO: Replace with error component
    if (error) {
        return(
            <p>An error occurred!</p>
        )
    }

    // All Products Chart
    const allProductsData = {
        labels: Object.values(data?.data?.aggregations?.product?.product?.buckets).map((item:any) => truncateString(item?.key, 20)),
        datasets: [
            {
                data: Object.values(data?.data?.aggregations?.product?.product?.buckets).map((item:any) => item?.doc_count),
                backgroundColor: (theme === 'light' ? ['lightgreen', 'green', 'gray',] : ['lightblue', 'blue', 'white',]),
            }, 
        ],
    }
    const allProductsOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'All Products',
            },
            subtitle: {
                display: true,
                text: 'Documents Submitted'
            }
        },
        scales: {
            x: {
                grid: {
                    color: (theme === 'light' ? 'lightgray' : 'rgba(246,250,244,0.5)')
                }
            },
            y: {
                grid: {
                    color: (theme === 'light' ? 'lightgray' : 'rgba(246,250,244,0.5)')
                }
            }
        }
    }

    return(
        <>
            <section id="stat-container" className="mx-4 md:mx-10 w-100">
                <div className="text-3xl font-extrabold md:text-4xl pt-5 pb-1">Analytics</div>
                <p className="text-foreground-muted pb-3">Year: {currentYear()}</p>
                <div id="all-products" className="flex flex-col place-content-center w-full mb-20">
                    <div className="text-xl font-bold leading-tight md:text-2xl">All Products</div>
                    <p>Total: {data?.data?.hits?.total?.value}</p>
                    <div className="flex flex-wrap justify-center h-[20rem] lg:h-[30rem] w-auto">
                        <Bar data={allProductsData} options={allProductsOptions} className="max-w-3xl"/>
                    </div>
                </div>
                <div className="flex flex-col flex-wrap mb-10">
                    <p className="text-xl font-bold leading-tight md:text-2xl">Product Pages</p>
                    <p className="text-lg text-muted-foreground">By visiting any of the products below, you will see their sub-products.</p>
                    <ul>
                        {Object.values(data?.data?.aggregations?.product?.product?.buckets).map((item:any, index:number) => 
                            <li key={index} id={index.toString()} className="my-4 flex flex-col flex-wrap">
                                <Link href={`/analytics/product/${index}`} className="hover:text-green-500 uppercase transition-all">{item?.key}.</Link>
                                <p className="ml-5">Document Count: {item?.doc_count}</p>
                                <p className="ml-5">Percentage of Total: {percentageOfTotal(parseInt(data?.data?.hits?.total?.value), parseInt(item?.doc_count))}%</p>
                            </li>
                        )}
                    </ul>
                </div>
            </section>
        </>
    )
}

