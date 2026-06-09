import type { TranscriptionAnalysisOptions } from "../libs/types";

/**
 * Default options sent with every transcribe job for Interview Insight Plus.
 * These are tuned for candidate interview analysis.
 * Customize speaker roles, scoring rules, and context for your hiring process.
 */
export const defaultAnalysisOptions: TranscriptionAnalysisOptions = {
  context:
    "Job interview between a hiring manager and a candidate. Evaluate the candidate's communication clarity, confidence, structured thinking, and relevance of responses to questions asked.",
  speaker_roles: ["interviewer", "candidate", "other"],
  primary_role: "candidate",
  default_role: "interviewer",
  role_display: {
    interviewer: "Interviewer",
    candidate: "Candidate",
    other: "Other",
  },
  scoring_rules: [
    {
      id: "communication_clarity",
      title: "Communication Clarity",
      rule: "Score 0-{max_score} for how clearly and concisely the candidate expresses ideas. Penalize rambling, vague answers, or poor articulation.",
      params: { max_score: "100" },
    },
    {
      id: "confidence",
      title: "Confidence & Composure",
      rule: "Score 0-{max_score} for the candidate's confidence and poise. Penalize excessive filler words, hesitation, or signs of nervousness that impact communication.",
      params: { max_score: "100" },
    },
    {
      id: "structured_thinking",
      title: "Structured Thinking",
      rule: "Score 0-{max_score} for logical structure in answers. Reward use of frameworks (STAR, etc.), clear sequencing, and coherent narratives.",
      params: { max_score: "100" },
    },
    {
      id: "relevance",
      title: "Relevance & Depth",
      rule: "Score 0-{max_score} for how well the candidate addresses the question with relevant, substantive content. Penalize off-topic or superficial responses.",
      params: { max_score: "100" },
    },
  ],
};
