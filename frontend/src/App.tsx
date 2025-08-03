import { useRef, useState } from "react";
import TranscriptInput from "./components/TranscriptInput";
import TrialList from "./components/TrialList";
import { ExtractedResponse } from "../types";
import HeroSection from "./components/HeroSection";

function App() {
  const [results, setResults] = useState<ExtractedResponse | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <HeroSection onTryNow={scrollToInput} />
      <section ref={inputRef} className="px-4 py-10 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <TranscriptInput onResults={setResults} />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {results && (
            <TrialList patient={results.patient} trials={results.trials} />
          )}

          {results && results.trials.length === 0 && (
            <div className="text-center mt-10">
              <p className="text-gray-600 italic">No matching trials found.</p>
              <button
                onClick={() => setResults(null)}
                className="mt-4 text-sm text-blue-600 underline"
              >
                Try a different transcript
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
