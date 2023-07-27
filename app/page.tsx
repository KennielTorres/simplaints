import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2 mb-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Consumer Complaints Simplified.
        </h1>
        <p className=" text-muted-foreground mb-2">
          Consumer Complaints processed by the <a href="https://www.consumerfinance.gov/" className="text-green-500 hover:text-green-700" rel="noopener noreferrer" target="_blank">Consumer Financial 
          Protection Bureau</a> analyzed numerically and visually.
        </p>
        <p className="text-lg max-w-[1000px]">SimPlaints provides you with numeric data, percentages, and bar charts to help you visualize 
          and understand the processed consumer complaints. 
        </p>
      </div>
      <div className="flex flex-col flex-wrap gap-2 md:justify-normal max-w-[1000px]">
        <h2 className="text-xl md:text-2xl font-semibold">Get Started</h2>
        <div className="border-b border-b-slategray-700 mb-4"></div>
        <p className="font-semibold">Analytics</p>
        <p className="ml-6 mb-4">
          See the total documents processed for all products,
          the percentages that each product constitutes, and a bar chart
          to help you visually understand those numbers.
        </p>
        <div className="flex flex-col items-center md:items-baseline mb-10">
          <Button asChild variant={'default'} className="max-w-[10rem]">
            <Link href={'/analytics'}>Visit Analytics</Link>
          </Button>
        </div>
        <div className="border-b border-b-slategray-700 mb-4"></div>
        <h2 className="font-semibold">About</h2> 
        <p className="ml-6 mb-4">
          Interested about the application? Find out what technologies it's using.
        </p>    
        <div className="flex flex-col items-center md:items-baseline mb-10">
          <Button asChild variant={'outline'} className="max-w-[10rem]">
            <Link href={'/about'}>Visit About</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
