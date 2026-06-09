/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TScoringCategory = {
  id: string;
  title: string;
  rule: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  tagline: string;
  heroHeading: string;
  heroSubheading: string;
  uploadSectionHeading: string;
  uploadSectionSubheading: string;
  uploadCtaLabel: string;
  analysisSectionHeading: string;
  interviewContext: string;
  primaryRoleLabel: string;
  secondaryRoleLabel: string;
  scoringCategories: TScoringCategory[];
  footerText: string;
  showSidebar: boolean;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "Interview Insight Plus",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#1A2B4A",
    secondary: "#6B7A99",
    accent: "#00C2B2",
  },
  tagline: "AI-powered interview intelligence for smarter hiring decisions.",
  heroHeading: "Turn Interview Videos Into Hiring Intelligence",
  heroSubheading:
    "Upload candidate interview recordings and get structured insights on communication patterns, clarity, and fit — automatically.",
  uploadSectionHeading: "Analyze an Interview",
  uploadSectionSubheading:
    "Upload a video recording of your candidate interview. Our AI will transcribe and evaluate it against your hiring criteria.",
  uploadCtaLabel: "Analyze Interview",
  analysisSectionHeading: "Interview Analysis Results",
  interviewContext:
    "Job interview between a hiring manager and a candidate. Evaluate the candidate's communication clarity, confidence, structured thinking, and relevance of responses to questions asked.",
  primaryRoleLabel: "Interviewer",
  secondaryRoleLabel: "Candidate",
  scoringCategories: [
    {
      id: "communication_clarity",
      title: "Communication Clarity",
      rule:
        "Score 0-{max_score} for how clearly and concisely the candidate expresses ideas. Penalize rambling, vague answers, or poor articulation.",
    },
    {
      id: "confidence",
      title: "Confidence & Composure",
      rule:
        "Score 0-{max_score} for the candidate's confidence and poise. Penalize excessive filler words, hesitation, or signs of nervousness that impact communication.",
    },
    {
      id: "structured_thinking",
      title: "Structured Thinking",
      rule:
        "Score 0-{max_score} for logical structure in answers. Reward use of frameworks (STAR, etc.), clear sequencing, and coherent narratives.",
    },
    {
      id: "relevance",
      title: "Relevance & Depth",
      rule:
        "Score 0-{max_score} for how well the candidate addresses the question with relevant, substantive content. Penalize off-topic or superficial responses.",
    },
  ],
  footerText: "Interview Insight Plus — Structured hiring intelligence for modern HR teams.",
  showSidebar: true,
};
