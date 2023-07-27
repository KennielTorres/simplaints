import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mb-4 flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Consumer Complaints Simplified.
        </h1>
        <p className=" mb-2 text-muted-foreground">
          Consumer Complaints processed by the{" "}
          <a
            href="https://www.consumerfinance.gov/"
            className="text-green-500 hover:text-green-700"
            rel="noopener noreferrer"
            target="_blank"
          >
            Consumer Financial Protection Bureau
          </a>{" "}
          analyzed numerically and visually.
        </p>
        <p className="max-w-[1000px] text-lg">
          SimPlaints provides you with numeric data, percentages, and bar charts
          to help you visualize and understand the processed consumer
          complaints.
        </p>
      </div>
      <div className="flex max-w-[1000px] flex-col flex-wrap gap-2 md:justify-normal">
        <h2 className="text-xl font-semibold md:text-2xl">Get Started</h2>
        <div className="border-b-slategray-700 mb-4 border-b"></div>
        <p className="font-semibold">Analytics</p>
        <p className="mb-4 ml-6">
          See the total documents processed for all products, the percentages
          that each product constitutes, and a bar chart to help you visually
          understand those numbers.
        </p>
        <div className="mb-10 flex flex-col items-center md:items-baseline">
          <Button asChild variant={"default"} className="max-w-[10rem]">
            <Link href={"/analytics"}>Visit Analytics</Link>
          </Button>
        </div>
        <div className="border-b-slategray-700 mb-4 border-b"></div>
        <h2 className="font-semibold">About</h2>
        <p className="mb-4 ml-6">
          Interested about the application? Find out what technologies it's
          using.
        </p>
        <div className="mb-10 flex flex-col items-center md:items-baseline">
          <Button asChild variant={"outline"} className="max-w-[10rem]">
            <Link href={"/about"}>Visit About</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
