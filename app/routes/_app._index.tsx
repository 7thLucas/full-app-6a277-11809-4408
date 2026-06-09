import { useConfigurables } from "~/modules/configurables";
import { useAuth } from "~/modules/authentication";
import { Link } from "react-router";
import {
  Video,
  Users,
  BarChart2,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Upload,
} from "lucide-react";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#6B7A99] font-medium">{label}</p>
          <p className="text-3xl font-bold text-[#1C1C2E] mt-1">{value}</p>
          <p className="text-xs text-[#6B7A99] mt-1">{sub}</p>
        </div>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </div>
  );
}

function RecentAnalysis({
  name,
  role,
  score,
  status,
  date,
}: {
  name: string;
  role: string;
  score: number | null;
  status: "completed" | "processing" | "failed";
  date: string;
}) {
  const statusConfig = {
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

  const cfg = statusConfig[status];
  const Icon = cfg.icon;

  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#E2E8F0] last:border-0">
      <div className="w-9 h-9 rounded-full bg-[#1A2B4A] flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-white">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1C1C2E] truncate">{name}</p>
        <p className="text-xs text-[#6B7A99]">{role}</p>
      </div>
      <div className="text-right flex-shrink-0">
        {score !== null && (
          <p className="text-sm font-bold text-[#1A2B4A]">{score}%</p>
        )}
        <p className="text-xs text-[#6B7A99]">{date}</p>
      </div>
      <div
        className="flex items-center gap-1 px-2 py-1 rounded-full flex-shrink-0"
        style={{ backgroundColor: cfg.bg }}
      >
        <Icon className="w-3 h-3" style={{ color: cfg.color }} />
        <span className="text-xs font-medium" style={{ color: cfg.color }}>
          {cfg.label}
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { config, loading } = useConfigurables();
  const { user } = useAuth();

  const appName = loading ? "Interview Insight Plus" : (config.appName ?? "Interview Insight Plus");

  return (
    <div className="p-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1C1C2E]">
          Welcome back{user?.username ? `, ${user.username}` : ""}
        </h1>
        <p className="text-[#6B7A99] mt-1">
          Here is your hiring intelligence overview for {appName}.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          label="Total Interviews"
          value="24"
          sub="All time analyses"
          icon={Video}
          color="#1A2B4A"
        />
        <StatCard
          label="Active Candidates"
          value="12"
          sub="In evaluation pipeline"
          icon={Users}
          color="#00C2B2"
        />
        <StatCard
          label="Avg. Communication Score"
          value="74%"
          sub="Across all analyses"
          icon={TrendingUp}
          color="#22C55E"
        />
        <StatCard
          label="Pending Analysis"
          value="3"
          sub="Awaiting processing"
          icon={Clock}
          color="#F59E0B"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Analyses */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
            <h2 className="text-base font-semibold text-[#1C1C2E]">Recent Analyses</h2>
            <Link
              to="/candidates"
              className="text-sm text-[#00C2B2] hover:text-[#00a89a] font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="px-6">
            <RecentAnalysis
              name="Sarah Chen"
              role="Senior Product Manager"
              score={82}
              status="completed"
              date="Today, 2:30 PM"
            />
            <RecentAnalysis
              name="Marcus Rivera"
              role="Software Engineer"
              score={67}
              status="completed"
              date="Yesterday"
            />
            <RecentAnalysis
              name="Priya Nair"
              role="UX Designer"
              score={null}
              status="processing"
              date="Just now"
            />
            <RecentAnalysis
              name="James Okafor"
              role="Data Analyst"
              score={91}
              status="completed"
              date="Jun 7"
            />
            <RecentAnalysis
              name="Lena Fischer"
              role="Marketing Lead"
              score={null}
              status="failed"
              date="Jun 6"
            />
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-[#1A2B4A] rounded-xl p-6 text-white">
            <div className="w-10 h-10 rounded-lg bg-[#00C2B2] flex items-center justify-center mb-4">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-semibold mb-2">Analyze a New Interview</h3>
            <p className="text-sm text-white/60 mb-4">
              Upload a video recording and get AI-powered insights in minutes.
            </p>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 bg-[#00C2B2] hover:bg-[#00a89a] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              Start Analysis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6">
            <h3 className="text-base font-semibold text-[#1C1C2E] mb-3">Score Distribution</h3>
            <div className="space-y-3">
              {[
                { label: "Communication Clarity", score: 78 },
                { label: "Confidence", score: 69 },
                { label: "Structured Thinking", score: 74 },
                { label: "Relevance & Depth", score: 81 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#6B7A99]">{item.label}</span>
                    <span className="font-semibold text-[#1C1C2E]">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-[#F7F9FC] rounded-full overflow-hidden border border-[#E2E8F0]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.score}%`,
                        backgroundColor: "#00C2B2",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
