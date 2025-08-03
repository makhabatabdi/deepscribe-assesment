import { useMemo, useState } from "react";
import { TrialListProps } from "../../types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TrialListPDF from "./TrialListPDF";

export default function TrialList({ patient, trials }: TrialListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const statusOptions = [
    "All",
    "Recruiting",
    "Completed",
    "Active, not recruiting",
    "Not yet recruiting",
    "Terminated",
    "Unknown",
  ];
  const filteredTrials = useMemo(() => {
    return trials.filter((trial) => {
      const status =
        trial?.protocolSection?.statusModule?.overallStatus?.trim() ||
        "Unknown";
      if (statusFilter === "All") return true;
      return status.toLowerCase() === statusFilter.toLowerCase();
    });
  }, [trials, statusFilter]);

  const isEmpty = filteredTrials.length === 0;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Extracted Patient Info
      </h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 shadow-inner whitespace-pre-wrap break-words">
        {JSON.stringify(patient, null, 2)}
      </pre>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">
        Matching Clinical Trials
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <div>
          <label
            htmlFor="statusFilter"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {trials.length > 0 && (
          <PDFDownloadLink
            document={
              <TrialListPDF patient={patient} trials={filteredTrials} />
            }
            fileName="clinical-trials.pdf"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            {({ loading }) => (loading ? "Preparing PDF..." : "Save as PDF")}
          </PDFDownloadLink>
        )}
      </div>

      {/* Trials Section */}
      {isEmpty ? (
        <p className="text-gray-600 italic">
          No matching trials found for this filter.
        </p>
      ) : (
        <ul className="space-y-6">
          {filteredTrials.map((trial, index) => {
            const nctId =
              trial?.protocolSection?.identificationModule?.nctId ||
              `trial-${index}`;
            const title =
              trial?.protocolSection?.identificationModule?.briefTitle ||
              "Untitled";
            const status =
              trial?.protocolSection?.statusModule?.overallStatus || "Unknown";

            return (
              <li
                key={nctId}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-1">
                  {title}
                </h3>
                <p className="text-sm text-gray-700 mb-2">Status: {status}</p>
                {nctId && (
                  <a
                    href={`https://clinicaltrials.gov/study/${nctId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View on ClinicalTrials.gov
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
