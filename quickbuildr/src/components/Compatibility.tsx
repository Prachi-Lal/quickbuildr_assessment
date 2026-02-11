import React, { useState } from "react"

type FormState = {
  backend_interest: number
  async_comfort: number
  communication_value: number
  timezone_overlap: number
  code_quality_focus: number
}

export default function Compatibility() {
  const [form, setForm] = useState<FormState>({
    backend_interest: 5,
    async_comfort: 5,
    communication_value: 5,
    timezone_overlap: 5,
    code_quality_focus: 5,
  })

  const [result, setResult] = useState<{ score: number; verdict: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [field]: Number(e.target.value) })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("https://quickbuildr-assessment.onrender.com/compatibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      setResult({
        score: data.compatibility_score,
        verdict: data.verdict,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const Slider = ({
    label,
    field,
    value,
  }: {
    label: string
    field: keyof FormState
    value: number
  }) => (
    <div className="space-y-2">
      <label className="text-sm text-slate-700">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={handleChange(field)}
          className="w-full"
        />
        <span className="w-6 text-sm text-slate-600">{value}</span>
      </div>
    </div>
  )

  return (
    <section className="mt-16 max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-center text-slate-900">
        🤝 Collaboration Compatibility
      </h2>

      <Slider
        label="How much do you enjoy building backend systems and APIs?"
        field="backend_interest"
        value={form.backend_interest}
      />

      <Slider
        label="How comfortable are you working asynchronously?"
        field="async_comfort"
        value={form.async_comfort}
      />

      <Slider
        label="How important is clear and direct communication?"
        field="communication_value"
        value={form.communication_value}
      />

      <Slider
        label="How much timezone overlap would we realistically have?"
        field="timezone_overlap"
        value={form.timezone_overlap}
      />

      <Slider
        label="How strongly do you prioritize clean, maintainable code?"
        field="code_quality_focus"
        value={form.code_quality_focus}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
      >
        {loading ? "Calculating..." : "Calculate Compatibility"}
      </button>

      {result && (
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-md text-center space-y-2">
          <p className="text-3xl font-bold text-slate-900">
            {result.score}%
          </p>
          <p className="text-slate-600">{result.verdict}</p>
        </div>
      )}
    </section>
  )
}
