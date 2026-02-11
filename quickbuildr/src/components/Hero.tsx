import React from 'react'
import { FaLinkedin, FaGithub, FaGlobe, FaMedium } from "react-icons/fa"
import { MdEmail } from "react-icons/md"



export default function Hero() {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
        Prachi Lal
      </h1>

      <div className="mt-6 flex items-center justify-center gap-6">

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/YOUR-LINKEDIN-USERNAME/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
        >
          <FaLinkedin size={20} />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Prachi-Lal"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 hover:border-black hover:text-black transition-all duration-200"
        >
          <FaGithub size={20} />
        </a>

        {/* Email */}
        <a
          href="mailto:plalindia01@gmail.com"
          aria-label="Send Email"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 hover:border-red-500 hover:text-red-500 transition-all duration-200"
        >
          <MdEmail size={20} />
        </a>

        {/* Portfolio */}
        <a
          href="https://fish-turn-db4.notion.site/Prachi-Lal-APIs-Automation-and-Clean-Data-Handled-1f4ebdfd0328807994ebecf4dbed27a0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio Website"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 hover:border-emerald-500 hover:text-emerald-500 transition-all duration-200 hover:scale-110"
        >
          <FaGlobe size={20} />
        </a>

        {/* Medium */}
        <a
          href="https://medium.com/@plalindia01"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Medium Articles"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 hover:border-neutral-900 hover:text-neutral-900 transition-all duration-200 hover:scale-110"
        >
          <FaMedium size={20} />
        </a>

      </div>


      <p className="mt-1 text-sm text-neutral-600">Software Developer | Backend Engineer</p>
      <p className="mt-4 text-neutral-700 max-w-prose">I build reliable, scalable APIs and backend systems. Available for collaboration and consulting.</p>
    </header>
  )
}
