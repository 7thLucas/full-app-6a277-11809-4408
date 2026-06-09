import { useState } from "react";
import { Link } from "react-router";
import {
  Users,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "~/lib/utils";

type CandidateStatus = "completed" | "processing" | "failed";

interface Candidate {
  id: string;
  name: string;
  role: string;
  date: string;
  scores: {
    clarity: number;
    confidence: number;
    structure: number;
    relevance: number;
  } | null;
  overall: number | null;
  status: CandidateStatus;
}

const sampleCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Senior Product Manager",
    date: "Jun 9, 2026",
    scores: { clarity: 85, confidence: 80, structure: 82, relevance: 81 },
    overall: 82,
    status: "completed",
  },
  {
    id: "2",
    name: "Marcus Rivera",
    role: "Software Engineer",
    date: "Jun 8, 2026",
    scores: { clarity: 70, confidence: 65, structure: 68, relevance: 65 },
    overall: 67,
    status: "completed",
  },
  {
    id: "3",
    name: "Priya Nair",
    role: "UX Designer",
    date: "Jun 9, 2026",
    scores: null,
    overall: null,
    status: "processing",
  },
  {
    id: "4",
    name: "James Okafor",
    role: "Data Analyst",
    date: "Jun 7, 2026",
    scores: { clarity: 92, confidence: 90, structure: 91, relevance: 91 },
    overall: 91,
    status: "completed",
  },
  {
    id: "5",
    name: "Lena Fischer",
    role: "Marketing Lead",
    date: "Jun 6, 2026",
    scores: null,
    overall: null,
    status: "failed",
  },
  {
    id: "6",
    name: "David Kim",
    role: "Engineering Manager",
    date: "Jun 5, 2026",
    scores: { clarity: 76, confidence: 73, structure: 79, relevance: 77 },
    overall: 76,
    status: "completed",
  },
];

const statusConfig: Record<
  CandidateStatus,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  completed: {
    label: "Completed",
    icon: CheckCircle,
    color: "#22C55E",
    bg: "#22C55E18",
  },
  processing: {
    label: "Processing",
    icon: Clock,
    color: "#F59E0B",
    bg: "#F59E0B18",
  },
  failed: {
    label: "Failed",
    icon: AlertCircle,
    color: "#EF4444",
    bg: "#EF444418",
  },
};

function ScoreBar({ value, color = "#00C2B2" }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#F0F4F8] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-medium text-[#6B7A99] w-8 text-right">{value}%</span>
    </div>
  );
}

function OverallBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? "#22C55E" : score >= 65 ? "#F59E0B" : "#EF4444";
  return (
    <div
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold"
      style={{ backgroundColor: `${color}18`, color }}
    >
      <TrendingUp className="w-3.5 h-3.5" />
      {score}%
    </div>
  );
}

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<CandidateStatus | "all">("all");

  const filtered = sampleCandidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-[#00C2B2]" />
            <span className="text-xs font-semibold text-[#00C2B2] uppercase tracking-wide">
              Candidates
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1C1C2E]">Candidate Analyses</h1>
          <p className="text-[#6B7A99] mt-1">
            Review and compare interview analysis results across all candidates.
          </p>
        </div>
        <Link
          to="/analyze"
          className="flex items-center gap-2 bg-[#00C2B2] hover:bg-[#00a89a] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <span>New Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0BDD0]" />
          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#E2E8F0] bg-white text-sm text-[#1C1C2E] placeholder-[#B0BDD0] focus:outline-none focus:ring-2 focus:ring-[#00C2B2] focus:border-transparent transition"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#6B7A99]" />
          {(["all", "completed", "processing", "failed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors",
                filterStatus === s
                  ? "bg-[#1A2B4A] text-white"
                  : "bg-white border border-[#E2E8F0] text-[#6B7A99] hover:text-[#1C1C2E] hover:border-[#1A2B4A]"
              )}
            >
              {s === "all" ? "All" : statusConfig[s as CandidateStatus].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F7F9FC]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A99] uppercase tracking-wide">
                  Candidate
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A99] uppercase tracking-wide">
                  Role
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A99] uppercase tracking-wide hidden md:table-cell">
                  Score Breakdown
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A99] uppercase tracking-wide">
                  Overall
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A99] uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A99] uppercase tracking-wide hidden sm:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#B0BDD0] text-sm">
                    No candidates found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((candidate, i) => {
                  const cfg = statusConfig[candidate.status];
                  const Icon = cfg.icon;
                  return (
                    <tr
                      key={candidate.id}
                      className={cn(
                        "border-b border-[#E2E8F0] last:border-0 hover:bg-[#F7F9FC] transition-colors",
                        i % 2 === 0 ? "" : "bg-[#FAFBFC]"
                      )}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1A2B4A] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white">
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-[#1C1C2E]">
                            {candidate.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-[#6B7A99]">{candidate.role}</span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        {candidate.scores ? (
                          <div className="space-y-1 min-w-[160px]">
                            <ScoreBar value={candidate.scores.clarity} />
                            <ScoreBar value={candidate.scores.confidence} />
                            <ScoreBar value={candidate.scores.structure} />
                            <ScoreBar value={candidate.scores.relevance} />
                          </div>
                        ) : (
                          <span className="text-xs text-[#B0BDD0]">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {candidate.overall !== null ? (
                          <OverallBadge score={candidate.overall} />
                        ) : (
                          <span className="text-xs text-[#B0BDD0]">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full"
                          style={{ backgroundColor: cfg.bg }}
                        >
                          <Icon className="w-3 h-3" style={{ color: cfg.color }} />
                          <span
                            className="text-xs font-medium"
                            style={{ color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="text-xs text-[#6B7A99]">{candidate.date}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-[#B0BDD0] mt-3">
        Showing {filtered.length} of {sampleCandidates.length} candidates
      </p>
    </div>
  );
}
