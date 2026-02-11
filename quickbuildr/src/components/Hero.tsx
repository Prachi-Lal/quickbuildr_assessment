import React from 'react'
import { FaLinkedin } from "react-icons/fa"


export default function Hero() {
  return (
    <header className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">Prachi Lal</h1>
      <div className="mt-6 flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/prachi-lal/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
        >
          <FaLinkedin size={20} />
        </a>
      </div>

      <p className="mt-1 text-sm text-neutral-600">Software Developer | Backend Engineer</p>
      <p className="mt-4 text-neutral-700 max-w-prose">I build reliable, scalable APIs and backend systems. Available for collaboration and consulting.</p>
    </header>
  )
}
