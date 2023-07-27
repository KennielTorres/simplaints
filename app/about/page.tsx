import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

import { siteConfig } from "@/config/site"

export default function AboutPage() {
  return (
    <section id="about-container" className="w-100 mx-4 pb-20 pt-6 md:mx-10">
      <h2 className="mb-5 text-2xl font-semibold md:text-3xl">About</h2>
      <p className="mb-4 text-xl font-semibold">Technologies</p>
      <div className="border-b-slategray-700 mb-4 border-b"></div>
      <ul className="mb-10 flex flex-col gap-4">
        <li className="text-lg hover:text-green-500">
          <Link
            href={"https://nextjs.org/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            Next.js
          </Link>
        </li>
        <li className="text-lg hover:text-green-500">
          <Link
            href={"https://tanstack.com/query/latest"}
            rel="noopener noreferrer"
            target="_blank"
          >
            TanStack Query
          </Link>
        </li>
        <li className="text-lg hover:text-green-500">
          <Link
            href={"https://www.chartjs.org/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            Chart.js
          </Link>
        </li>
        <li className="text-lg hover:text-green-500">
          <Link
            href={"https://react-chartjs-2.js.org/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            React-Chart.js
          </Link>
        </li>
        <li className="text-lg hover:text-green-500">
          <Link
            href={"https://www.typescriptlang.org/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            TypeScript
          </Link>
        </li>
        <li className="text-lg hover:text-green-500">
          <Link
            href={"http://cfpb.github.io/api/ccdb/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            Consumer Complaints API
          </Link>
        </li>
        <li className="text-lg hover:text-green-500">
          <Link
            href={"https://render.com/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            Render
          </Link>
        </li>
      </ul>
      <p className="mb-4 text-xl font-semibold">Developer</p>
      <div className="border-b-slategray-700 mb-4 border-b"></div>
      <p className="mb-4 text-lg text-muted-foreground md:text-xl">
        Kenniel Torres
      </p>
      <ul className="flex flex-row flex-wrap gap-4">
        <li className="hover:text-[#0077b5]">
          <Link
            href={siteConfig.links.linkedIn}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Linkedin></Linkedin>
          </Link>
        </li>
        <li className="hover:text-slate-500">
          <Link
            href={siteConfig.links.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github></Github>
          </Link>
        </li>
      </ul>
    </section>
  )
}
