import React from 'react'
import { FaLinkedin, FaGithub, FaGlobe, FaMedium } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"



export default function Hero() {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
        Prachi Lal
      </h1>


      <div className="mt-6 flex items-center justify-center gap-5">

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/YOUR-LINKEDIN-USERNAME/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">

          <FaLinkedin size={20} />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Prachi-Lal"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
        >
          <FaGithub size={20} />
        </a>

        {/* Email */}
        <a
          href="mailto:plalindia01@gmail.com"
          aria-label="Send Email"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
        >
          <MdEmail size={20} />
        </a>

        {/* Portfolio */}
        <a
          href="https://fish-turn-db4.notion.site/Prachi-Lal-APIs-Automation-and-Clean-Data-Handled-1f4ebdfd0328807994ebecf4dbed27a0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio Website"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
        >
          <FaGlobe size={20} />
        </a>

        {/* Medium */}
        <a
          href="https://medium.com/@plalindia01"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Medium Articles"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
        >
          <FaMedium size={20} />
        </a>

      </div>


      <p className="mt-3 text-slate-600 text-sm sm:text-base">
        Backend Engineer · API Systems · Cloud Infrastructure
      </p>

      <p className="mt-4 max-w-xl mx-auto text-slate-600 leading-relaxed">
        I design and build reliable, scalable backend systems and APIs.
        Currently open to collaboration and consulting opportunities.
      </p>

    </header>
  )
}
