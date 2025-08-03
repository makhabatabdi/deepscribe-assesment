# 🧠 Clinical Trial Matcher

This is a full-stack web application that extracts key medical data from doctor-patient transcripts using an AI model and matches patients to relevant clinical trials using [ClinicalTrials.gov](https://clinicaltrials.gov/)'s public API.

---

## ✨ Features

- 🗣️ Input free-form doctor-patient transcript
- 🧠 Extract structured diagnosis, medications, and conditions via LLM (OpenAI API)
- 🔍 Search for matching clinical trials based on the extracted info
- 📄 Export matched trials as PDF
- 🎯 Filter trials by status (e.g., Recruiting, Completed)
- 🖥️ Clean, responsive UI using React + TailwindCSS

---

## 🧩 Tech Stack

| Frontend     | Backend      | Other           |
|--------------|--------------|------------------|
| React + Vite | Express.js   | OpenAI API       |
| TypeScript   | Node.js      | ClinicalTrials.gov API |
| TailwindCSS  | Axios        | PDF Export via `@react-pdf/renderer` |


## 🧪 How It Works

1. User submits a natural-language transcript.
2. Backend calls OpenAI API to extract:
   - Diagnosis
   - Conditions
   - Medications
3. Using that data, the backend queries `clinicaltrials.gov` for relevant trials.
4. Frontend displays and filters results.
5. Optional PDF download.

---
git clone https://github.com/makhabatabdi/deepscribe-assessment.git
cd deepscribe-assessment
cd backend
npm install
OPENAI_API_KEY=your_openai_api_key_here
npm run dev
cd frontend
npm install
npm run dev

Usage
Go to http://localhost:5173
Paste a transcript (e.g., a doctor-patient conversation)
Click "Extract and Match"
View the filtered clinical trials
Click “Save as PDF” to export the list



