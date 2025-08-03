import { useRef, useState, FormEvent } from "react";
import { extractPatientData } from "../../lib/api";
import { TranscriptInputProps } from "../../types";

// Sample transcript for users to try
const sampleTranscript = `Doctor: Good morning. What brings you in today?
Patient: I've been feeling shortness of breath and fatigue for about two weeks.
Doctor: Do you have any prior history of heart or lung issues?
Patient: I was diagnosed with hypertension last year, but no other major problems.
Doctor: Any chest pain?
Patient: Mild discomfort occasionally, especially when climbing stairs.
Doctor: Got it. We’ll run some tests. You’re 58 and male, correct?
Patient: Yes, that’s right.`;

export default function TranscriptInput({ onResults }: TranscriptInputProps) {
  const [transcript, setTranscript] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = transcript.trim();
    if (!input) {
      setError("Please enter a transcript before submitting.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await extractPatientData(input);
      onResults(data);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to extract patient data.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTranscript("");
    setError("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 shadow-md space-y-4 border border-gray-200"
      >
        <label
          htmlFor="transcript"
          className="block text-lg font-medium text-gray-800"
        >
          Patient-Doctor Transcript
        </label>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setTranscript(sampleTranscript)}
            className="text-xs text-blue-600 underline hover:text-blue-800"
          >
            Try a sample transcript
          </button>
        </div>

        <textarea
          id="transcript"
          className="w-full h-48 resize-none border border-gray-300 p-4 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder={`e.g.\nDoctor: What brings you in?\nPatient: I've had chest pain for 3 days...`}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm -mt-2">{error}</p>}

        <div className="flex gap-4 items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Find Clinical Trials"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={loading || !transcript}
            className="text-sm text-gray-600 underline hover:text-gray-900 disabled:opacity-30"
          >
            Clear
          </button>

          {loading && (
            <div className="ml-auto">
              <span className="text-sm text-gray-500 animate-pulse">
                Analyzing transcript...
              </span>
            </div>
          )}
        </div>
      </form>

      <div ref={resultRef} className="pt-4" />
    </>
  );
}
