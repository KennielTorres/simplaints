"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js/auto"
import { useTheme } from "next-themes"
import { Bar } from "react-chartjs-2"

import {
  currentYear,
  percentageOfTotal,
  truncateString,
} from "@/components/utils"

// Activate Chart.JS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function AnalyticsPage() {
  const { setTheme, theme } = useTheme()

  const fetchAllData = async () => {
    try {
      const res = await fetch("/api/handleData", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      })
      const data = await res.json()
      return data
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  // Fetches and handles state management of data
  const { data, isLoading, error } = useQuery({
    queryKey: ["allData"],
    queryFn: fetchAllData,
  })

  // @TODO: Replace with loading component
  if (isLoading) {
    return <p>Loading...</p>
  }

  // @TODO: Replace with error component
  if (error) {
    return <p>An error occurred!</p>
  }

  // All Products Chart
  const allProductsData = {
    labels: Object.values(
      data?.data?.aggregations?.product?.product?.buckets
    ).map((item: any) => truncateString(item?.key, 20)),
    datasets: [
      {
        data: Object.values(
          data?.data?.aggregations?.product?.product?.buckets
        ).map((item: any) => item?.doc_count),
        backgroundColor:
          theme === "light"
            ? ["lightgreen", "green", "gray"]
            : ["lightblue", "blue", "white"],
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
        text: "All Products",
      },
      subtitle: {
        display: true,
        text: "Documents Submitted",
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === "light" ? "lightgray" : "rgba(246,250,244,0.5)",
        },
      },
      y: {
        grid: {
          color: theme === "light" ? "lightgray" : "rgba(246,250,244,0.5)",
        },
      },
    },
  }

  return (
    <>
      <section id="stat-container" className="w-100 mx-4 md:mx-10">
        <div className="pb-1 pt-5 text-3xl font-extrabold md:text-4xl">
          Analytics
        </div>
        <p className="text-foreground-muted pb-3">Year: {currentYear()}</p>
        <div
          id="all-products"
          className="mb-20 flex w-full flex-col place-content-center"
        >
          <div className="text-xl font-bold leading-tight md:text-2xl">
            All Products
          </div>
          <p>Total: {data?.data?.hits?.total?.value}</p>
          <div className="flex h-[20rem] w-auto flex-wrap justify-center lg:h-[30rem]">
            <Bar
              data={allProductsData}
              options={allProductsOptions}
              className="max-w-3xl"
            />
          </div>
        </div>
        <div className="mb-10 flex flex-col flex-wrap">
          <p className="text-xl font-bold leading-tight md:text-2xl">
            Product Pages
          </p>
          <p className="text-lg text-muted-foreground">
            By visiting any of the products below, you will see their
            sub-products.
          </p>
          <ul>
            {Object.values(
              data?.data?.aggregations?.product?.product?.buckets
            ).map((item: any, index: number) => (
              <li
                key={index}
                id={index.toString()}
                className="my-4 flex flex-col flex-wrap"
              >
                <Link
                  href={`/analytics/product/${index}`}
                  className="uppercase transition-all hover:text-green-500"
                >
                  {item?.key}.
                </Link>
                <p className="ml-5">Document Count: {item?.doc_count}</p>
                <p className="ml-5">
                  Percentage of Total:{" "}
                  {percentageOfTotal(
                    parseInt(data?.data?.hits?.total?.value),
                    parseInt(item?.doc_count)
                  )}
                  %
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
