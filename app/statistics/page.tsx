'use client'

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
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
    const [categoryState, setCategory] = useState("None") // Under evaluation if necessary...

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

    // Truncate string function. Used for chart data labels.
    function truncateString(str: string, num: number) {
        // If the length of str is less than or equal to num just return string.
        if (str.length <= num) {
            return str
        }
        // Return string truncated with '...' concatenated to the end of str.
        return str.slice(0, num) + '...'
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
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Statistics from All Products',
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
            <div id="stat-container" className="mx-4 md:mx-10 w-100">
                <div className="text-3xl font-extrabold md:text-4xl pt-5 pb-3">Statistics</div>
                <div id="all-products" className="flex flex-col place-content-center w-full mb-20">
                    <div className="text-xl font-bold leading-tight md:text-2xl">All Products</div>
                    <p>Total: {data?.data?.hits?.total?.value}</p>
                    <div className="flex flex-wrap justify-center">
                        <Bar data={allProductsData} options={allProductsOptions} className="max-w-3xl"/>
                    </div>
                </div>
                <div className="flex flex-col flex-wrap mb-10">
                    <p className="text-xl font-bold leading-tight md:text-2xl">Product Pages</p>
                    <p className="text-lg italic underline underline-offset-4">Proceed to see the sub-products by visiting any of the products below.</p>
                    <ul>
                        {Object.values(data?.data?.aggregations?.product?.product?.buckets).map((item:any) => 
                            <li key={item?.key} className="my-2"> <Link href={'#'}>{item?.key}</Link> </li>
                        )}
                    </ul>
                </div>
                {/* Example of conditonal rendering. */}
{/*  
                <div>
                    {(categoryState == "None") &&
                        <p>test</p>
                    }
                </div>
*/}
            </div>
        </>
    )
}

