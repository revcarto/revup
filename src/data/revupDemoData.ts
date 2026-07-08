// Demo data for the RevUp Engine — first test workspace: RevCarto itself.
// Sourced from a mix of real signal (Slack workspace history, connected Gmail)
// and clearly-labeled illustrative figures where live CRM/finance connectors
// (HubSpot, QuickBooks) were not authorized for this demo.

export type Grade = "red" | "yellow" | "green";

export interface ModuleFinding {
  text: string;
  severity: "P0" | "P1" | "P2";
  confidence: "LOW" | "MED" | "HIGH";
  evidence: string;
}

export interface ModuleRecord {
  id: number;
  name: string;
  shortName: string;
  grade: Grade;
  score: number;
  weight: number;
  rationale: string;
  inputs: { label: string; source: string; status: "connected" | "manual" | "missing" }[];
  findings: ModuleFinding[];
}

export const workspace = {
  companyName: "RevCarto",
  domain: "revcarto.com",
  industry: "Revenue Operations Consulting (Agency)",
  employeeCount: 8,
  revenueBand: "$1M – $5M",
  hqLocation: "Philadelphia, PA",
  primaryContact: { name: "Jason Bramble", role: "Founder & CEO", email: "jason@revcarto.com" },
  engagement: {
    startDate: "2026-07-06",
    walkthroughDate: "2026-08-03",
    price: "$4,500",
    paymentStatus: "paid",
    podLead: "RevUp Delivery Pod",
    status: "delivered" as const,
    snapshotDate: "2026-07-06",
  },
  integrations: [
    { provider: "HubSpot (CRM)", status: "connected", note: "Sales Hub, Marketing Hub, Service Hub, Ops Hub" },
    { provider: "Google Workspace / Gmail", status: "connected", note: "metadata-only scope" },
    { provider: "Slack", status: "connected", note: "workspace history + delivery channel" },
    { provider: "Apollo.io", status: "connected", note: "outbound sequences" },
    { provider: "Outreach.io", status: "connected", note: "outbound sequences" },
    { provider: "Asana", status: "connected", note: "delivery boards" },
    { provider: "ClickUp", status: "manual_fallback", note: "no API grant — census only" },
    { provider: "QuickBooks / Stripe", status: "manual_fallback", note: "not authorized for this demo" },
    { provider: "Gusto (Payroll/HR)", status: "manual_fallback", note: "roster via intake only" },
    { provider: "Google/LinkedIn/Meta Ads", status: "not_started", note: "no paid channels currently running" },
  ],
};

export const modules: ModuleRecord[] = [
  {
    id: 1,
    name: "Company & Revenue Baseline",
    shortName: "Baseline",
    grade: "yellow",
    score: 62,
    weight: 6,
    rationale:
      "Revenue is real and growing, but the company can't state its own top-line number consistently across its own materials — a baseline audit should catch this on day one.",
    inputs: [
      { label: "24-mo revenue by month", source: "QuickBooks/Stripe", status: "manual" },
      { label: "External funding/grant materials", source: "Gmail + Drive", status: "connected" },
      { label: "Pricing / rate card", source: "Upload", status: "manual" },
    ],
    findings: [
      {
        text:
          "Two different revenue figures are cited in two different official external documents: \"$3.5M+ revenue\" (accelerator application) vs. \"managed over $1 million in tracked revenue through HubSpot-powered client engagements\" (grant essay). Neither document defines its terms, so it's unclear if these describe the same metric.",
        severity: "P0",
        confidence: "HIGH",
        evidence: "Gmail — accelerator application thread; grant essay draft",
      },
      {
        text:
          "75+ HubSpot implementations and 14,000+ contact migrations are cited as delivery proof points, but no single ledger ties completed engagements to recognized revenue.",
        severity: "P1",
        confidence: "MED",
        evidence: "Slack — DM history, delivery stats",
      },
    ],
  },
  {
    id: 2,
    name: "Market & Competitive Position",
    shortName: "Market",
    grade: "yellow",
    score: 58,
    weight: 5,
    rationale:
      "The HubSpot-centric positioning is genuinely differentiated, but it isn't written down anywhere consistent — the pitch changes depending on which document you read.",
    inputs: [
      { label: "Stated positioning", source: "Website + intake", status: "connected" },
      { label: "Competitor list (min. 5)", source: "Intake form", status: "missing" },
      { label: "Win/loss reasons", source: "HubSpot closed-lost field", status: "manual" },
    ],
    findings: [
      {
        text:
          "Company describes itself inconsistently across channels — \"Revenue Operations Agency,\" \"HubSpot-powered client engagements,\" and \"RevOps audit\" provider each appear in different materials with no single positioning statement tying them together.",
        severity: "P1",
        confidence: "HIGH",
        evidence: "Site CompaniesSection copy vs. Gmail grant/accelerator materials",
      },
      {
        text: "No formal competitor teardown on file — closest peers (boutique HubSpot/RevOps shops) have not been benchmarked on pricing or packaging.",
        severity: "P2",
        confidence: "MED",
        evidence: "Intake form — field not populated",
      },
    ],
  },
  {
    id: 3,
    name: "ICP & Buyer Intelligence",
    shortName: "ICP",
    grade: "green",
    score: 78,
    weight: 10,
    rationale:
      "Actual closed work maps well to the stated ICP — the RevUp™ product itself targets exactly the profile RevCarto has already delivered for.",
    inputs: [
      { label: "Stated ICP", source: "Intake form", status: "connected" },
      { label: "Closed-won records (24 mo)", source: "HubSpot + Slack history", status: "connected" },
    ],
    findings: [
      {
        text:
          "Delivered engagements (Altitude Marketing — SDR build-out, life sciences/manufacturing/enterprise software ICP; a health-tech HubSpot implementation; a SaaS client lead-routing fix; an insurance CRM migration) sit squarely inside RevUp's own stated \"who it's for\": B2B, $1M–$25M, tool-sprawl companies.",
        severity: "P2",
        confidence: "HIGH",
        evidence: "Slack — client history references",
      },
      {
        text:
          "Sample skews toward one-off implementation projects rather than recurring retainer clients — segment profitability by engagement type is not tracked.",
        severity: "P1",
        confidence: "MED",
        evidence: "Slack — engagement history; no retainer-vs-project tagging found",
      },
    ],
  },
  {
    id: 4,
    name: "Sales Channels & Pipeline",
    shortName: "Channels",
    grade: "red",
    score: 38,
    weight: 15,
    rationale:
      "Pipeline runs on a single channel. That's the single biggest risk on this scorecard — it's a should-fix-first, not a someday-fix.",
    inputs: [
      { label: "Lead source by channel", source: "HubSpot + Apollo + Outreach", status: "connected" },
      { label: "Paid ad spend/performance", source: "Google/Meta/LinkedIn Ads", status: "missing" },
    ],
    findings: [
      {
        text:
          "100% of pipeline is built on referrals and manual outbound — zero paid acquisition channels have ever been tested, by the founder's own account.",
        severity: "P0",
        confidence: "HIGH",
        evidence: "Slack — DM: \"no paid acquisition tested yet, pipeline built solely on referrals/outbound\"",
      },
      {
        text: "CAC is not tracked by channel because there is effectively only one channel to measure.",
        severity: "P1",
        confidence: "HIGH",
        evidence: "Derived from above",
      },
    ],
  },
  {
    id: 5,
    name: "Tech Stack & Systems",
    shortName: "Systems",
    grade: "green",
    score: 81,
    weight: 12,
    rationale:
      "Genuinely strong for an 8-person shop — deep HubSpot fluency, an AI ops layer already in production. The gap is that it's built around one operator, not a repeatable delivery system.",
    inputs: [
      { label: "Tool inventory", source: "Slack + intake", status: "connected" },
      { label: "CRM architecture", source: "HubSpot", status: "connected" },
      { label: "Integration map", source: "Composio + native integrations", status: "connected" },
    ],
    findings: [
      {
        text:
          "AI ops assistant (\"Viktor\") is in daily production use for prospecting, outreach, and HubSpot data actions via Composio (create contact/company/note, send email) — ahead of the median client RevCarto audits.",
        severity: "P2",
        confidence: "HIGH",
        evidence: "Slack — Viktor DM history",
      },
      {
        text: "Kantata (project management) was evaluated for delivery work but never adopted — an open tool decision sitting unresolved.",
        severity: "P2",
        confidence: "MED",
        evidence: "Slack — \"haven't used Kantata specifically\"",
      },
    ],
  },
  {
    id: 6,
    name: "SaaS & Tool Spend",
    shortName: "Spend",
    grade: "yellow",
    score: 65,
    weight: 10,
    rationale:
      "No egregious waste, but there's an obvious overlap sitting in plain sight. See the Spend Recovery Sheet for the line-item breakdown.",
    inputs: [
      { label: "Vendor ledger (12 mo)", source: "QuickBooks", status: "manual" },
      { label: "Seat counts / last login", source: "Tool census", status: "manual" },
    ],
    findings: [
      {
        text: "Apollo.io and Outreach.io are both licensed for outbound sequencing — overlapping capability with no documented reason to run both.",
        severity: "P1",
        confidence: "MED",
        evidence: "Slack — tool mentions, both platforms referenced for outbound",
      },
      {
        text: "ClickUp and Asana are both in use for delivery/PM with no clear split of which lives where.",
        severity: "P2",
        confidence: "MED",
        evidence: "Slack — both tools referenced for delivery work",
      },
    ],
  },
  {
    id: 7,
    name: "People & Org Coverage",
    shortName: "People",
    grade: "red",
    score: 35,
    weight: 10,
    rationale:
      "The founder said it plainly before we ever ran this audit: \"you're building a job, not a company.\" That's a People & Org finding, verbatim.",
    inputs: [
      { label: "Revenue-team roster", source: "Intake / Gusto", status: "manual" },
      { label: "Function coverage map", source: "Intake form", status: "connected" },
    ],
    findings: [
      {
        text:
          "Founder-dependency is a self-identified, explicit risk: nearly all delivery, sales, and strategy routes through one person across a team of eight.",
        severity: "P0",
        confidence: "HIGH",
        evidence: "Slack — \"you're building a job, not a company\"",
      },
      {
        text: "No confirmed second delivery lead or co-founder actively covering client engagements independent of the founder.",
        severity: "P0",
        confidence: "MED",
        evidence: "Slack + Drive — org references",
      },
    ],
  },
  {
    id: 8,
    name: "Process & Workflow",
    shortName: "Process",
    grade: "yellow",
    score: 55,
    weight: 15,
    rationale:
      "The muscle memory is there — RevCarto has fixed this exact category of problem for a client before. It just hasn't fixed it for itself yet.",
    inputs: [
      { label: "Documented SOPs", source: "Upload", status: "missing" },
      { label: "Handoff points", source: "HubSpot workflow history", status: "connected" },
    ],
    findings: [
      {
        text:
          "A past health-tech engagement was over-scoped (promised as a 6-week solo build) and the client churned at 4 months, driven by weak training/adoption follow-through — a scoping and handoff gap, not a skills gap.",
        severity: "P1",
        confidence: "HIGH",
        evidence: "Slack — engagement retro notes",
      },
      {
        text:
          "By contrast, a SaaS client's lead-routing response time was cut from 48 hours to under 5 minutes via automation, which tripled that engagement's retainer value — proof the fix works, but it was never written down as a repeatable SOP for future clients.",
        severity: "P1",
        confidence: "HIGH",
        evidence: "Slack — case study reference",
      },
    ],
  },
  {
    id: 9,
    name: "Data & Reporting Integrity",
    shortName: "Data",
    grade: "red",
    score: 30,
    weight: 12,
    rationale:
      "This is the module that failed the dashboard truth-test hardest — and it failed it on the company's own headline number.",
    inputs: [
      { label: "Field fill-rates", source: "HubSpot", status: "connected" },
      { label: "3 most-used reports", source: "Screenshots / HubSpot report defs", status: "missing" },
    ],
    findings: [
      {
        text:
          "No single source of truth exists for \"RevCarto's revenue\" — the $3.5M+ vs. $1M+ figures from Module 1 were never reconciled, meaning two people could look for the same number today and get two different answers.",
        severity: "P0",
        confidence: "HIGH",
        evidence: "Cross-reference: Module 1 finding",
      },
      {
        text: "No dashboard or report was identified as the canonical place leadership checks pipeline or revenue health.",
        severity: "P1",
        confidence: "MED",
        evidence: "Intake — field not populated",
      },
    ],
  },
  {
    id: 10,
    name: "AI Readiness & Automation",
    shortName: "AI",
    grade: "yellow",
    score: 68,
    weight: 5,
    rationale:
      "RevCarto is ahead of most companies it audits — it just hasn't turned its own automation into a packaged, sellable asset yet. This report is step one of doing that.",
    inputs: [
      { label: "AI tool inventory", source: "Slack + intake", status: "connected" },
      { label: "Automation inventory", source: "HubSpot workflows + Composio", status: "connected" },
    ],
    findings: [
      {
        text:
          "\"Viktor\" (AI ops assistant) is measurably saving 10+ hours/week on prospecting and outreach — a rare example of AI adoption with a real, stated time-savings number instead of AI theater.",
        severity: "P2",
        confidence: "HIGH",
        evidence: "Slack — \"saving 10+ hrs/week\"",
      },
      {
        text:
          "Automation is still blocked by manual workarounds in places (e.g., reCAPTCHA on application forms breaks end-to-end automation) — and the RevUp Engine platform itself, the tool that would systematize this audit process, does not exist yet inside RevCarto.",
        severity: "P1",
        confidence: "HIGH",
        evidence: "Slack — reCAPTCHA friction; Build Prompt (this document) is the response",
      },
    ],
  },
];

export const compositeScore = Math.round(
  modules.reduce((sum, m) => sum + m.score * (m.weight / 100), 0)
);

export const topWins = [...modules].sort((a, b) => b.score - a.score).slice(0, 3);
export const topRisks = [...modules].sort((a, b) => a.score - b.score).slice(0, 3);

export interface SpendLine {
  tool: string;
  category: string;
  estAnnualCost: string;
  seats: string;
  utilization: "High" | "Medium" | "Low" | "Unknown";
  verdict: "Keep" | "Consolidate" | "Renegotiate" | "Cut";
  note: string;
}

export const spendSheet: SpendLine[] = [
  { tool: "HubSpot (Sales/Marketing/Service/Ops Hub)", category: "CRM", estAnnualCost: "est. $12,000–$24,000/yr", seats: "8", utilization: "High", verdict: "Keep", note: "Core system of record — deep team fluency" },
  { tool: "Apollo.io", category: "Outbound", estAnnualCost: "est. $3,000–$6,000/yr", seats: "1–3", utilization: "Unknown", verdict: "Consolidate", note: "Overlaps with Outreach.io — pick one before next renewal" },
  { tool: "Outreach.io", category: "Outbound", estAnnualCost: "est. $6,000–$12,000/yr", seats: "1–3", utilization: "Unknown", verdict: "Consolidate", note: "Overlaps with Apollo.io — typically the pricier of the two" },
  { tool: "Asana", category: "Project Management", estAnnualCost: "est. $1,500–$3,000/yr", seats: "8", utilization: "Medium", verdict: "Keep", note: "Primary delivery board per team signal" },
  { tool: "ClickUp", category: "Project Management", estAnnualCost: "est. $1,000–$2,000/yr", seats: "Unknown", utilization: "Low", verdict: "Cut", note: "Overlaps with Asana; no clear split of use identified" },
  { tool: "Kantata", category: "Project Management", estAnnualCost: "est. $3,000+/yr if licensed", seats: "0 active", utilization: "Low", verdict: "Cut", note: "Evaluated, never adopted — confirm license status before renewal" },
  { tool: "Composio", category: "Integration / AI Ops", estAnnualCost: "est. $600–$1,200/yr", seats: "1", utilization: "High", verdict: "Keep", note: "Powers Viktor's HubSpot actions — high-leverage tool" },
];

export const spendRecoveryNote =
  "Figures above are illustrative estimates based on public list pricing for this tool category — QuickBooks/Stripe were not authorized for this demo, so this is not RevCarto's actual invoiced spend. A live engagement replaces every row with real numbers from the vendor ledger. Even directionally, consolidating Apollo/Outreach and cutting the two unused PM seats is a same-week win.";

export interface FixItem {
  title: string;
  severity: "P0" | "P1" | "P2";
  owner: string;
  effort: "Low" | "Medium" | "High";
  sprint: 1 | 2 | 3;
  module: string;
}

export const fixList: FixItem[] = [
  { title: "Reconcile revenue reporting to one number, defined once, used everywhere", severity: "P0", owner: "Jason", effort: "Low", sprint: 1, module: "Baseline / Data" },
  { title: "Decide Apollo vs. Outreach — consolidate outbound tooling before next renewal", severity: "P0", owner: "Jason", effort: "Low", sprint: 1, module: "Spend" },
  { title: "Write down the lead-routing SOP that already works (48hr → <5min) so it's repeatable per client", severity: "P1", owner: "Jason", effort: "Medium", sprint: 1, module: "Process" },
  { title: "Test one paid acquisition channel (LinkedIn or Google Search) with a defined CAC cap", severity: "P0", owner: "Jason", effort: "Medium", sprint: 2, module: "Channels" },
  { title: "Build a standard scoping checklist to prevent repeat of the health-tech-style over-scope", severity: "P1", owner: "Jason", effort: "Medium", sprint: 2, module: "Process" },
  { title: "Document Viktor's automations into a written AI-ops playbook (scope, guardrails, escalation)", severity: "P2", owner: "Jason", effort: "Low", sprint: 2, module: "AI" },
  { title: "Designate or hire a second delivery lead to remove the founder single point of failure", severity: "P0", owner: "Jason", effort: "High", sprint: 3, module: "People" },
  { title: "Build the RevUp Engine MVP so delivery scales beyond one operator's manual hours", severity: "P1", owner: "Jason + build partner", effort: "High", sprint: 3, module: "AI / Systems" },
  { title: "Establish a quarterly scorecard re-run to track the composite score delta over time", severity: "P2", owner: "Jason", effort: "Low", sprint: 3, module: "Baseline" },
];

export const gtmBlueprint = {
  validatedICP:
    "B2B companies, $1M–$25M revenue, sales team of 2–25, HubSpot-dependent or tool-sprawl, especially post-tool-purchase or pre-RevOps-hire — which is, not coincidentally, exactly who RevUp™ itself is built for.",
  channelPriority: [
    { channel: "Referral & warm outbound", allocation: "60%", note: "Proven engine — keep as primary, don't starve it while testing new channels" },
    { channel: "RevUp™ audit as top-of-funnel wedge", allocation: "25%", note: "Low-cost, high-trust: the $4,500 audit sells the retainer, per the offer sheet's own bridge model" },
    { channel: "One paid test — LinkedIn ABM", allocation: "15%", note: "First paid channel ever tested — hard CAC cap, kill if it doesn't clear referral CAC in one quarter" },
  ],
  messagingPillars: [
    "Visibility before spend — see the leak before you plug it",
    "Fixed-fee, no-scope-creep trust signal — the opposite of the over-scoping failure mode found in Module 8",
    "Proof lives in your own data — every claim links to the client's own systems, not a template",
  ],
  targets: [
    { period: "Q1", target: "4 RevUp™ audits/mo at $4,500 = ~$18K/mo new-logo revenue; convert 40% to RevPod™ retainers" },
    { period: "Q2", target: "Scale to 6 audits/mo once a second Pod Lead is onboarded (removes the People & Org P0)" },
  ],
  scoreboard: [
    "# of RevUp™ audits sold / week",
    "% of kickoffs held within 5 business days of close",
    "Avg. days from kickoff to walkthrough",
    "Audit → RevPod™ conversion rate",
    "Composite Revenue Health Score delta across active retainer clients",
  ],
};
