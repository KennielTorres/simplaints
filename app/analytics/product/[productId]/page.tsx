'use client'
import { usePathname, redirect } from "next/navigation"
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
import { truncateString, percentageOfTotal } from "@/components/utils"

// Activate Chart.JS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)


export default function productPage(){
    const path = usePathname()
    const productID = path.split('/')[3]

    // Return to statistics page if productID is not a number, or, in range
    if (parseInt(productID) < 0 || parseInt(productID) > 8 || isNaN(parseInt(productID))){
        redirect('/analytics')
    }

    const { setTheme, theme } = useTheme()

    const fetchProductData = async () => {
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
        queryKey: ['productData'],
        queryFn: fetchProductData,
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

    // Product Chart
    const productData = {
        labels: Object.values(data?.data?.aggregations?.product?.product?.buckets[productID]['sub_product.raw']?.buckets).map((item:any) => truncateString(item?.key, 20)),
        datasets: [
            {
                data: Object.values(data?.data?.aggregations?.product?.product?.buckets[productID]['sub_product.raw']?.buckets).map((item:any) => item?.doc_count),
                backgroundColor: (theme === 'light' ? ['lightgreen', 'green', 'gray',] : ['lightblue', 'blue', 'white',]),
            }, 
        ],
    }
    const productOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Statistics from Product ${productID}` ,
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
                },
                beginAtZero: true,
            },
            y: {
                grid: {
                    color: (theme === 'light' ? 'lightgray' : 'rgba(246,250,244,0.5)')
                },
                beginAtZero: true,
            }
        }
    }

    return(
        <>
            <section id="product-container" className="mx-4 md:mx-10 w-100">
                <div className="text-3xl font-extrabold md:text-4xl pt-5 pb-3">Statistics</div>
                <div id="all-products" className="flex flex-col place-content-center w-full mb-20">
                    <div className="text-xl font-bold leading-tight md:text-2xl">Product: {data?.data?.aggregations?.product?.product?.buckets[productID]?.key}.</div>
                    <p>Total: {data?.data?.aggregations?.product?.product?.buckets[productID]?.doc_count}</p>
                    <div className="flex flex-wrap justify-center">
                        <Bar data={productData} options={productOptions} className="max-w-3xl"/>
                    </div>
                </div>
                <div className="flex flex-col flex-wrap mb-10">
                    <p className="text-xl font-bold leading-tight md:text-2xl">Sub-products</p>
                    <ul>
                        {Object.values(data?.data?.aggregations?.product?.product?.buckets[productID]['sub_product.raw']?.buckets).map((item:any, index:number) => 
                            <li key={index} id={index.toString()} className="my-4 flex flex-col flex-wrap">
                                <p className="uppercase">{item?.key}.</p>
                                <p className="ml-5">Document Count: {item?.doc_count}</p>
                                <p className="ml-5">Percentage of Total: {percentageOfTotal(parseInt(data?.data?.aggregations?.product?.product?.buckets[productID]?.doc_count), parseInt(item?.doc_count))}%</p>
                            </li>
                        )}
                    </ul>
                </div>

            </section>
        </>
    )
}

