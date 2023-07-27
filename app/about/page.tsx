import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Github, Linkedin } from "lucide-react"

export default function AboutPage(){

    return(
        <section id="about-container" className="mx-4 md:mx-10 w-100 pb-20 pt-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-5">About</h2>
            <p className="text-xl font-semibold mb-4">Technologies</p>
            <div className="border-b border-b-slategray-700 mb-4"></div>
            <ul className="flex flex-col gap-4 mb-10">
                <li className="hover:text-green-500 text-lg"><Link href={'https://nextjs.org/'} rel="noopener noreferrer" target="_blank">Next.js</Link></li>
                <li className="hover:text-green-500 text-lg"><Link href={'https://tanstack.com/query/latest'} rel="noopener noreferrer" target="_blank">TanStack Query</Link></li>
                <li className="hover:text-green-500 text-lg"><Link href={'https://www.chartjs.org/'} rel="noopener noreferrer" target="_blank">Chart.js</Link></li>
                <li className="hover:text-green-500 text-lg"><Link href={'https://react-chartjs-2.js.org/'} rel="noopener noreferrer" target="_blank">React-Chart.js</Link></li>
                <li className="hover:text-green-500 text-lg"><Link href={'https://www.typescriptlang.org/'} rel="noopener noreferrer" target="_blank">TypeScript</Link></li>
                <li className="hover:text-green-500 text-lg"><Link href={'http://cfpb.github.io/api/ccdb/'} rel="noopener noreferrer" target="_blank">Consumer Complaints API</Link></li>
                <li className="hover:text-green-500 text-lg"><Link href={'https://render.com/'} rel="noopener noreferrer" target="_blank">Render</Link></li>
            </ul>
            <p className="text-xl font-semibold mb-4">Developer</p>
            <div className="border-b border-b-slategray-700 mb-4"></div>
            <p className="mb-4 text-lg md:text-xl text-muted-foreground">Kenniel Torres</p>
            <ul className="flex flex-row flex-wrap gap-4">
                <li className="hover:text-[#0077b5]"><Link href={siteConfig.links.linkedIn} rel="noopener noreferrer" target="_blank"><Linkedin></Linkedin></Link></li>
                <li className="hover:text-slate-500"><Link href={siteConfig.links.github} rel="noopener noreferrer" target="_blank"><Github></Github></Link></li>
            </ul>
        </section>
    )
}