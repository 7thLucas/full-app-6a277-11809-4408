import { useState } from "react";
import { useConfigurables } from "~/modules/configurables";
import {
  useTranscribe,
  TranscriptionUpload,
  TranscriptionResult,
} from "@qb/audio-analyzer";
import { Video, Info } from "lucide-react";

export default function AnalyzePage() {
  const { config, loading } = useConfigurables();
  const { submit, ticketId, isSubmitting } = useTranscribe();
  const [candidateName, setCandidateName] = useState("");
  const [candidateRole, setCandidateRole] = useState("");
  const [submittedMeta, setSubmittedMeta] = useState<{
    name: string;
    role: string;
  } | null>(null);

  const heading = loading
    ? "Analyze an Interview"
    : (config.uploadSectionHeading ?? "Analyze an Interview");
  const subheading = loading
    ? "Upload a video recording of your candidate interview. Our AI will transcribe and evaluate it against your hiring criteria."
    : (config.uploadSectionSubheading ??
      "Upload a video recording of your candidate interview. Our AI will transcribe and evaluate it against your hiring criteria.");
  const ctaLabel = loading ? "Analyze Interview" : (config.uploadCtaLabel ?? "Analyze Interview");
  const analysisHeading = loading
    ? "Interview Analysis Results"
    : (config.analysisSectionHeading ?? "Interview Analysis Results");

  function handleUpload(file: File) {
    setSubmittedMeta({ name: candidateName, role: candidateRole });
    submit({ files: file });
  }

  return (
    <div className="p-8 max-w-[1280px] mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Video className="w-5 h-5 text-[#00C2B2]" />
          <span className="text-xs font-semibold text-[#00C2B2] uppercase tracking-wide">
            Analysis
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#1C1C2E]">{heading}</h1>
        <p className="text-[#6B7A99] mt-1 max-w-xl">{subheading}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E2E8F0] bg-[#F7F9FC]">
              <h2 className="text-sm font-semibold text-[#1C1C2E]">Interview Details</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B7A99] uppercase tracking-wide mb-1.5">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Jane Smith"
                  className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-sm text-[#1C1C2E] placeholder-[#B0BDD0] focus:outline-none focus:ring-2 focus:ring-[#00C2B2] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7A99] uppercase tracking-wide mb-1.5">
                  Role Applied For
                </label>
                <input
                  type="text"
                  value={candidateRole}
                  onChange={(e) => setCandidateRole(e.target.value)}
                  placeholder="e.g. Senior Engineer"
                  className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-sm text-[#1C1C2E] placeholder-[#B0BDD0] focus:outline-none focus:ring-2 focus:ring-[#00C2B2] focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="px-5 pb-5">
              <TranscriptionUpload
                isLoading={isSubmitting}
                onUpload={handleUpload}
              />
            </div>

            {/* Info note */}
            <div className="mx-5 mb-5 flex gap-2 p-3 bg-[#F7F9FC] rounded-lg border border-[#E2E8F0]">
              <Info className="w-4 h-4 text-[#6B7A99] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#6B7A99] leading-relaxed">
                Supported formats: MP4, MOV, AVI, WebM, MP3, WAV. Max file size: 20MB.
                Analysis typically takes 2–5 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Results panel */}
        <div className="lg:col-span-2">
          {ticketId ? (
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F7F9FC]">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-[#1C1C2E]">
                      {analysisHeading}
                    </h2>
                    {submittedMeta?.name && (
                      <p className="text-sm text-[#6B7A99] mt-0.5">
                        {submittedMeta.name}
                        {submittedMeta.role && ` — ${submittedMeta.role}`}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#B0BDD0] bg-[#F0F4F8] px-2 py-1 rounded">
                    {ticketId.slice(0, 8)}…
                  </span>
                </div>
              </div>
              <div className="p-6">
                <TranscriptionResult ticketId={ticketId}>
                  <TranscriptionResult.Loading />
                  <TranscriptionResult.Error />
                  <TranscriptionResult.Content>
                    <TranscriptionResult.Header />
                    <TranscriptionResult.Status />
                    <TranscriptionResult.Scores />
                    <TranscriptionResult.Summary />
                    <TranscriptionResult.Strengths />
                    <TranscriptionResult.Issues />
                    <TranscriptionResult.Transcript />
                    <TranscriptionResult.Media />
                    <TranscriptionResult.Logs />
                  </TranscriptionResult.Content>
                </TranscriptionResult>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F7F9FC] border border-[#E2E8F0] flex items-center justify-center mb-4">
                <Video className="w-7 h-7 text-[#B0BDD0]" />
              </div>
              <h3 className="text-base font-semibold text-[#1C1C2E] mb-2">
                No analysis yet
              </h3>
              <p className="text-sm text-[#6B7A99] max-w-sm">
                Upload an interview video on the left to begin. Your structured analysis report
                will appear here once processing is complete.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
