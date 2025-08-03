export async function extractPatientData(transcript: string) {
  const res = await fetch("http://localhost:5050/api/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to extract patient data.");
  }

  return data;
}
