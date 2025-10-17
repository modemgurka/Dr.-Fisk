"use client";

import { useMemo, useState } from "react";

/** Renderar svar i etikettrad-format */
function AnswerBlock({ answer }: { answer: string }) {
  const lines = useMemo(() => answer.split(/\r?\n/), [answer]);

  function renderLine(line: string, i: number) {
    const m = line.match(/^\*\*(Diagnos|Rekommendation|Varning):\*\*\s*(.*)$/i);
    if (m) {
      const label = m[1];
      const rest = m[2] ?? "";
      return (
        <div key={i} className="flex gap-2 leading-relaxed">
          <span className="shrink-0 rounded-lg bg-sky-100 px-2 py-0.5 text-sky-800 font-semibold">
            {label}:
          </span>
          <p className="m-0">{rest}</p>
        </div>
      );
    }
    if (line.trim() === "") return <div key={i} className="h-2" />;
    return <p key={i} className="m-0">{line}</p>;
  }

  return <div className="space-y-2">{lines.map(renderLine)}</div>;
}

export default function Page() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function askDrFisk(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setAnswer(null);
    const q = question.trim();
    if (!q) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (!res.ok && data?.error) throw new Error(data.error);
      setAnswer(data.answer || "Dr. Fisk tappade hatten – försök igen!");
    } catch (err: any) {
      setError(err?.message || "Något blev tokigt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Sticky toppbanner – smal, centrerad, harmonisk gäddgrön med subtil vågrörelse */}
      <div className="sticky top-0 z-50 w-full flex justify-center bg-transparent">
        <div className="w-full max-w-3xl px-4">
          <div className="relative overflow-hidden rounded-none text-white select-none"
               style={{ background: "linear-gradient(90deg, #1e3a2a 0%, #41673a 50%, #8ea94a 100%)" }}>
            {/* Subtil våg som rör sig höger–vänster (30s) */}
            <div className="absolute inset-0 opacity-[0.16] pointer-events-none">
              <svg className="w-[200%] h-full animate-wave-h text-white/30" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 67L60 63C120 60 240 53 360 50C480 47 600 50 720 60C840 70 960 87 1080 87C1200 87 1320 70 1380 60L1440 50V0H0V67Z" fill="currentColor" />
              </svg>
            </div>
            <div className="relative py-2 text-center">
              <span className="block text-[21px] font-semibold tracking-wide">
                Dr. Fisk 2.0 is back — djupare, klokare och lite smartare.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Luft mellan bannern och innehållet */}
      <div className="h-5" />

      <main className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-white text-slate-900">
        {/* Dekorativ våg i toppen */}
        <div className="relative h-40 bg-gradient-to-r from-sky-100 to-sky-50">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40L60 46.7C120 53 240 67 360 66.7C480 67 600 53 720 43.3C840 33 960 27 1080 36.7C1200 47 1320 73 1380 86.7L1440 100V0H0V40Z" className="fill-white" />
          </svg>
        </div>

        <div className="px-4 -mt-12 pb-10">
          <div className="max-w-2xl mx-auto space-y-5">
            {/* Header-kort med avatar och tagline */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 flex items-center gap-4">
              <div className="relative overflow-hidden rounded-full ring-4 ring-white shadow" style={{ width: 56, height: 56 }}>
                <img
                  src="/icons/dr-fisk.png"
                  alt="Dr. Fisk"
                  width={56}
                  height={56}
                  style={{ width: 56, height: 56, borderRadius: "9999px", objectFit: "cover" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold leading-tight">Dr. Fisk 2.0</h1>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Fråga Dr. Fisk om vad som helst</strong> – inget ämne är för djupt, grunt eller slemmigt.
                  Skriv din fråga nedan så kommer svaret upp snyggt och prydligt.
                </p>
              </div>
            </div>

            {/* Frågeruta */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
              <form onSubmit={askDrFisk} className="flex flex-col gap-3">
                <label className="text-sm font-medium text-slate-700" htmlFor="q">Din fråga</label>
                <textarea
                  id="q"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Skriv din fråga här..."
                  className="w-full min-h-[120px] rounded-xl border border-slate-200 p-3 leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">Tips: var specifik för rakare diagnos.</div>
                  <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    className="inline-flex items-center justify-center rounded-xl bg-sky-600 text-white px-4 py-2 font-medium hover:bg-sky-700 disabled:opacity-50 transition"
                  >
                    {loading ? "Dr. Fisk funderar..." : "Fråga Dr. Fisk"}
                  </button>
                </div>
              </form>
            </div>

            {/* Felmeddelande */}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            {/* Svarsruta – med "simma in"-animation */}
            {answer && (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 swim-in">
                <div className="mb-2 text-sm text-slate-500">Svar från Dr. Fisk:</div>
                <div className="prose max-w-none">
                  <AnswerBlock answer={answer} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CSS-animationer */}
        <style jsx global>{`
          @keyframes swimIn {
            0% { transform: translateX(-12px); opacity: 0; }
            60% { transform: translateX(2px); opacity: 1; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .swim-in { animation: swimIn 420ms ease-out both; }

          @keyframes waveH {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-wave-h { animation: waveH 30s linear infinite; }
        `}</style>
      </main>
    </>
  );
}
