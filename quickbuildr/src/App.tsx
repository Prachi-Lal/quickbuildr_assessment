import React from 'react'
import Hero from './components/Hero'
import ContactForm from './components/ContactForm'
import Compatibility from "./components/Compatibility"


export default function App() {
  return (
    <div className="min-h-screen flex items-center bg-neutral-50">
      <main className="container py-16">
        <div className="bg-white shadow-sm rounded-lg p-8 md:p-12">
          <Hero />
          <Compatibility />
          <ContactForm />
        </div>
      </main>
    </div>
  )
}
