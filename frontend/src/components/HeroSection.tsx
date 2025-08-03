import { useRef } from "react";

export default function HeroSection({ onTryNow }: { onTryNow: () => void }) {
  return (
    <section className="relative h-screen bg-gradient-to-br from-[#e1f0ff] to-[#ffffff] flex items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="animate-pill-move absolute w-24 h-24 bg-blue-200 rounded-full opacity-20 top-1/3 left-10 blur-xl" />
        <div className="animate-pill-float absolute w-16 h-16 bg-blue-300 rounded-full opacity-20 top-2/3 right-20 blur-lg" />
        <div className="animate-pill-move2 absolute w-32 h-32 bg-blue-100 rounded-full opacity-20 top-1/4 right-1/4 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-900 mb-6 leading-tight">
          Optimize Clinical Trials
          <br />
          with AI-Powered Matching
        </h1>
        <p className="text-lg sm:text-xl text-blue-800 mb-8 max-w-xl mx-auto">
          Extract patient data from real conversations and instantly match to
          relevant clinical trials.
        </p>
        <button
          onClick={onTryNow}
          className="bg-blue-700 hover:bg-blue-800 text-white text-lg px-6 py-3 rounded-full transition shadow-lg"
        >
          Try Now
        </button>
      </div>
    </section>
  );
}
