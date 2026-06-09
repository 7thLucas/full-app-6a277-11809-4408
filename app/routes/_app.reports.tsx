import { BarChart2, Download, TrendingUp, Users, Video, Star } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

function BarGroup({
  label,
  value,
  max = 100,
  color = "#00C2B2",
}: {
  label: string;
  value: number;
  max?: number;
  color?: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-[#6B7A99] font-medium">{label}</span>
        <span className="text-xs font-bold text-[#1C1C2E]">{value}%</span>
      </div>
      <div className="h-6 bg-[#F0F4F8] rounded overflow-hidden border border-[#E2E8F0]">
        <div
          className="h-full rounded flex items-center pl-2 transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        >
          {pct > 15 && (
            <span className="text-xs font-semibold text-white">{value}%</span>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  delta,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  delta: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <p className="text-xs text-[#6B7A99] font-medium">{label}</p>
      </div>
      <p className="text-2xl font-bold text-[#1C1C2E]">{value}</p>
      <p className="text-xs text-[#22C55E] font-medium mt-1">{delta}</p>
    </div>
  );
}

const categoryBreakdown = [
  { label: "Communication Clarity", avg: 78, top: 92, low: 55 },
  { label: "Confidence & Composure", avg: 69, top: 90, low: 42 },
  { label: "Structured Thinking", avg: 74, top: 91, low: 50 },
  { label: "Relevance & Depth", avg: 81, top: 91, low: 65 },
];

const topCandidates = [
  { rank: 1, name: "James Okafor", role: "Data Analyst", score: 91 },
  { rank: 2, name: "Sarah Chen", role: "Senior Product Manager", score: 82 },
  { rank: 3, name: "David Kim", role: "Engineering Manager", score: 76 },
  { rank: 4, name: "Marcus Rivera", role: "Software Engineer", score: 67 },
];

export default function ReportsPage() {
  const { config, loading } = useConfigurables();

  return (
    <div className="p-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 className="w-5 h-5 text-[#00C2B2]" />
            <span className="text-xs font-semibold text-[#00C2B2] uppercase tracking-wide">
              Reports
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1C1C2E]">Hiring Intelligence Report</h1>
          <p className="text-[#6B7A99] mt-1">
            Aggregated analysis across all interview sessions.
          </p>
        </div>
        <button className="flex items-center gap-2 border border-[#E2E8F0] bg-white hover:bg-[#F7F9FC] text-[#1C1C2E] text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricTile
          label="Total Interviews"
          value="24"
          delta="+4 this month"
          icon={Video}
          color="#1A2B4A"
        />
        <MetricTile
          label="Avg. Overall Score"
          value="74%"
          delta="+2% vs last month"
          icon={TrendingUp}
          color="#00C2B2"
        />
        <MetricTile
          label="Candidates Evaluated"
          value="21"
          delta="3 still processing"
          icon={Users}
          color="#6B7A99"
        />
        <MetricTile
          label="Top Score"
          value="91%"
          delta="James Okafor"
          icon={Star}
          color="#F59E0B"
        />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Category averages */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F7F9FC]">
            <h2 className="text-sm font-semibold text-[#1C1C2E]">
              Average Scores by Category
            </h2>
            <p className="text-xs text-[#6B7A99] mt-0.5">
              Across all completed analyses (n=21)
            </p>
          </div>
          <div className="p-6 space-y-4">
            {categoryBreakdown.map((item) => (
              <BarGroup
                key={item.label}
                label={item.label}
                value={item.avg}
                color="#00C2B2"
              />
            ))}
          </div>
        </div>

        {/* Score range breakdown */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F7F9FC]">
            <h2 className="text-sm font-semibold text-[#1C1C2E]">Top vs. Low Scores</h2>
            <p className="text-xs text-[#6B7A99] mt-0.5">Best and lowest score by category</p>
          </div>
          <div className="p-6 space-y-5">
            {categoryBreakdown.map((item) => (
              <div key={item.label}>
                <p className="text-xs font-semibold text-[#1C1C2E] mb-2">{item.label}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#22C55E] w-6">Top</span>
                    <div className="flex-1 h-2 bg-[#F0F4F8] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#22C55E]"
                        style={{ width: `${item.top}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[#22C55E] w-8 text-right">
                      {item.top}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#EF4444] w-6">Low</span>
                    <div className="flex-1 h-2 bg-[#F0F4F8] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#EF4444]"
                        style={{ width: `${item.low}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[#EF4444] w-8 text-right">
                      {item.low}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top candidates */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
        <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F7F9FC]">
          <h2 className="text-sm font-semibold text-[#1C1C2E]">Top Ranked Candidates</h2>
          <p className="text-xs text-[#6B7A99] mt-0.5">Sorted by overall interview score</p>
        </div>
        <div className="divide-y divide-[#E2E8F0]">
          {topCandidates.map((c) => {
            const color =
              c.score >= 80 ? "#22C55E" : c.score >= 65 ? "#F59E0B" : "#EF4444";
            return (
              <div key={c.rank} className="flex items-center gap-4 px-6 py-4">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    backgroundColor: c.rank === 1 ? "#F59E0B" : "#F0F4F8",
                    color: c.rank === 1 ? "#fff" : "#6B7A99",
                  }}
                >
                  #{c.rank}
                </div>
                <div className="w-9 h-9 rounded-full bg-[#1A2B4A] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">
                    {c.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1C1C2E]">{c.name}</p>
                  <p className="text-xs text-[#6B7A99]">{c.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-[#F0F4F8] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${c.score}%`, backgroundColor: color }}
                    />
                  </div>
                  <span
                    className="text-sm font-bold w-10 text-right"
                    style={{ color }}
                  >
                    {c.score}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
