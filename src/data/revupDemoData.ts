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
  narrative: string[];
  benchmark: string;
  recommendations: string[];
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
    narrative: [
      "RevCarto has real revenue and real delivery history — 75+ HubSpot implementations and 14,000+ contact migrations are not marketing fluff, they show up consistently across engagement references. The company is not pre-revenue or struggling to find work.",
      "What it doesn't have is a single, defensible answer to 'what is our revenue.' Two external documents — an accelerator application and a grant essay — each state a different figure ($3.5M+ vs. $1M+ tracked through HubSpot) without defining terms. That's not a rounding difference; it's two different claims made in two different high-stakes contexts, and nobody appears to have reconciled them before hitting send.",
      "This is exactly the kind of finding RevUp™ is built to surface in a client: the business is working, but the story the business tells about itself isn't internally consistent. Fixing it costs almost nothing — pick a definition, document it, use it everywhere.",
    ],
    benchmark:
      "Benchmark: agencies this size ($1M–$5M, single-founder-led) typically reconcile finance-vs-CRM revenue quarterly at minimum. RevCarto has no evidence of a reconciliation cadence.",
    recommendations: [
      "Pick one definition of 'revenue' (e.g., cash collected vs. contracted ACV) and use it in every external document going forward.",
      "Reconcile the finance ledger against CRM closed-won at least quarterly — the gap itself becomes a tracked metric.",
      "Retire or update the two conflicting external claims (accelerator application, grant essay) once the number is settled.",
    ],
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
    narrative: [
      "RevCarto's actual differentiation is clear once you look at the work: deep, specific HubSpot expertise applied to revenue operations, not generic 'growth marketing.' That's a real wedge in a crowded consulting market.",
      "But the language used to describe it drifts by audience — 'Revenue Operations Agency' on the website, 'HubSpot-powered client engagements' in grant materials, 'RevOps audit provider' elsewhere. None of these are wrong, but none of them is THE positioning statement, which means every new piece of collateral is reinventing the pitch from scratch.",
      "No competitor teardown exists on file, and the win/loss reason field in the CRM is either absent or sparsely populated — so even if positioning were nailed down, there's no evidence trail proving it's working against specific alternatives.",
    ],
    benchmark:
      "Benchmark: boutique RevOps/HubSpot shops competing for $1M–$25M B2B clients typically publish one positioning statement plus a named list of 5–8 tracked competitors. RevCarto has neither in writing.",
    recommendations: [
      "Write one positioning statement and require every new deck, form, and outbound sequence to use it verbatim.",
      "Build a 5-competitor teardown (positioning, pricing, ICP) to sharpen where RevCarto actually wins deals.",
      "Add and enforce a closed-lost reason field in HubSpot so future audits have real win/loss data.",
    ],
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
    narrative: [
      "This is one of the cleanest findings in the whole audit: when you line up actual delivered engagements — Altitude Marketing's SDR build-out, a health-tech HubSpot implementation, a SaaS client's lead-routing fix, an insurance CRM migration — against the stated ICP, they match. That almost never happens on a first audit.",
      "The gap isn't who RevCarto sells to, it's what kind of engagement they sell. The historical mix skews toward one-off implementation projects rather than recurring retainers, and there's no tagging in the CRM that would let anyone answer 'which segment is most profitable on a retainer basis' with data instead of gut feel.",
      "Because the ICP is validated, the fix here is narrow and cheap: start tagging engagement type and segment at intake, and this module goes from Green-with-a-caveat to fully Green within a quarter.",
    ],
    benchmark:
      "Benchmark: agencies with validated ICPs typically segment closed-won by engagement type (project vs. retainer) to guide packaging decisions. RevCarto has the win data but not the tagging.",
    recommendations: [
      "Add an engagement-type field (project vs. retainer) to every deal record going forward.",
      "Rank historical segments by ACV × win rate ÷ cycle length to find the most profitable repeatable pattern.",
      "Use the validated ICP directly in RevUp™'s own GTM Blueprint (see Module 2 / GTM section) rather than re-deriving it.",
    ],
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
    narrative: [
      "Every dollar of pipeline RevCarto has ever closed traces back to referrals and manual outbound. By the founder's own account, no paid acquisition channel — search, LinkedIn, retargeting — has ever been tested, not even at a small budget.",
      "This is the lowest-scoring module on the scorecard, and it earns it: a single-channel business has no visibility into what a second channel would cost, no CAC benchmark to compare against, and no cushion if referral flow slows down for any reason (a bad quarter, a key referrer going quiet, market conditions).",
      "The good news is this is a testable problem, not a strategic mystery — RevCarto doesn't need to reinvent its GTM, it needs to run one controlled experiment with a hard budget cap and see what a second channel actually costs to fill.",
    ],
    benchmark:
      "Benchmark: B2B service businesses at this revenue band typically run 2–3 active channels, even if one dominates. RevCarto runs one.",
    recommendations: [
      "Launch one paid channel test (LinkedIn ABM is the closest fit to the ICP) with a hard CAC cap and a one-quarter kill criterion.",
      "Instrument lead source at intake so CAC-by-channel becomes trackable the moment a second channel exists.",
      "Treat the RevUp™ audit product itself as a top-of-funnel wedge — see the GTM Blueprint for the allocation model.",
    ],
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
    narrative: [
      "This is the highest score on the scorecard, and it's earned. RevCarto's HubSpot architecture reflects real expertise — pipelines, custom objects, and workflow inventory all show the fingerprints of someone who has done this many times. On top of that, an AI ops assistant ('Viktor') is in daily production use via Composio, automating prospecting and outreach actions directly against HubSpot.",
      "The one open item is Kantata — evaluated for delivery project management at some point, never adopted, and still an unresolved line item rather than a closed decision. It's a small thing, but small unresolved tool decisions are exactly what turn into SaaS Spend Recovery findings a year later.",
      "The deeper structural note: this stack is optimized for one skilled operator running it, not for a second person stepping in cold. That's a Systems observation today; it becomes a People & Org risk (see Module 7) the moment RevCarto tries to hire.",
    ],
    benchmark:
      "Benchmark: agencies of this size average 2–3 core systems fully integrated. RevCarto has HubSpot + an AI automation layer genuinely wired together — ahead of the median.",
    recommendations: [
      "Close the Kantata decision explicitly — adopt it with a defined use case, or cancel it before the next renewal.",
      "Document the AI ops layer (see Module 10) so it's operable by someone other than its builder.",
      "Formalize the HubSpot architecture as a reference template RevCarto can also sell to clients, since it's already best-in-class.",
    ],
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
    narrative: [
      "RevCarto's software stack is lean by consulting-agency standards — this isn't a company that bought fifteen tools and uses three. But two overlaps are visible even without the finance ledger: Apollo.io and Outreach.io both do outbound sequencing, and ClickUp sits alongside Asana with no clear division of labor between them.",
      "Because QuickBooks/Stripe weren't authorized for this demo engagement, the dollar figures in the Spend Recovery Sheet are illustrative estimates built from public list pricing, not actual invoices. A live engagement replaces every row with real numbers within the first week (finance access is priority #2 in the access sequence, right after CRM).",
      "Even without exact figures, the direction is unambiguous: consolidating the outbound tools and cutting one of the two PM tools is a decision RevCarto can make this week, before any renewal deadline forces the issue.",
    ],
    benchmark:
      "Benchmark: 20–40% of SaaS spend at companies this size is typically redundant or overlapping (industry norm). RevCarto's overlap looks smaller than that range, but it's real and immediately actionable.",
    recommendations: [
      "Pick Apollo.io or Outreach.io, migrate active sequences, cancel the other before its next renewal.",
      "Decide whether ClickUp or Asana is the system of record for delivery work and retire the other.",
      "Get real finance-ledger access on the next engagement to replace estimates with actuals — see the Spend Recovery Sheet.",
    ],
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
    narrative: [
      "This is the module where an audit is supposed to surface something the client already half-knows but hasn't acted on — and here, the client said it out loud before the audit even started. Across a team of eight, delivery, sales, and strategy all route through one person.",
      "That concentration is exactly why Systems (Module 5) scores so high and People scores so low at the same time: the tooling is excellent because one skilled operator built and runs all of it. There's no confirmed second delivery lead or actively-engaged co-founder covering client work independent of the founder — capacity math for the business is really capacity math for one person.",
      "This single finding is the connective tissue for half the scorecard: it's why Channels can't scale past referrals (no one else to run outbound), why Process lives in one person's head instead of written SOPs, and why the RevUp™ Engine itself doesn't exist yet as software — there's been no bandwidth to build it.",
    ],
    benchmark:
      "Benchmark: an 8-person agency this size typically has at least 2 people who can run a client engagement solo. RevCarto has confirmed capacity for 1.",
    recommendations: [
      "Designate or hire a second delivery lead — this is the single highest-leverage fix on the entire 90-Day Fix List.",
      "Cross-train at least one other team member on the core HubSpot + AI ops workflow so it isn't tribal knowledge.",
      "Reassess pipeline growth targets against real capacity math, not aspiration, until headcount changes.",
    ],
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
    narrative: [
      "Two engagements tell the whole story of this module in contrast. First, a health-tech client was over-scoped — promised as a 6-week solo build — and churned at 4 months when training and adoption didn't keep pace. That's a scoping and handoff failure, not a competence failure.",
      "Second, a SaaS client's lead-routing response time was cut from 48 hours to under 5 minutes through automation RevCarto built — a genuinely excellent fix that tripled that engagement's retainer value. The team clearly knows how to diagnose and solve this exact class of problem for clients.",
      "What's missing is the write-up. Neither the failure mode (the over-scoping pattern) nor the success pattern (the lead-routing fix) exists as a documented, repeatable SOP. Both live in one person's memory, which means every new engagement re-derives lessons the business has already learned once.",
    ],
    benchmark:
      "Benchmark: agencies delivering repeatable engagement types typically document their top 3–5 delivery patterns as SOPs. RevCarto has zero documented, despite having both a documented failure and a documented win to draw from.",
    recommendations: [
      "Write the lead-routing fix up as a repeatable SOP — it's proven, it's valuable, and it's currently locked in one person's head.",
      "Build a standard scoping checklist from the health-tech retro so the over-scope pattern doesn't repeat.",
      "This SOP gap is precisely what RevUp™ itself is designed to close — see the AI Readiness module.",
    ],
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
    narrative: [
      "Every audit runs a 'dashboard truth-test': pick the number leadership actually looks at, and check whether it reconciles with the underlying systems. For RevCarto, that test starts and ends with revenue — and it fails immediately, because there isn't one number. The $3.5M+ and $1M+ figures surfaced in Module 1 were never reconciled against each other.",
      "No dashboard or report was identified during this engagement as the canonical place leadership checks pipeline or revenue health. That's not unusual for an 8-person company running lean — but it does mean every external claim about the business is effectively unverified against a live source of truth.",
      "This module scores lowest on the entire scorecard for a reason: data integrity issues compound. A wrong revenue figure quoted once in a grant application is a paperwork problem; the same unreconciled number feeding future investor conversations, hiring decisions, or pricing strategy becomes a strategic liability.",
    ],
    benchmark:
      "Benchmark: even lean, founder-led companies typically nominate one dashboard as the single source of truth for revenue. RevCarto has not.",
    recommendations: [
      "Reconcile the Module 1 revenue discrepancy first — this single fix resolves the root cause of this module's score.",
      "Nominate one dashboard (HubSpot report, or a simple finance summary) as the canonical revenue-health view and socialize it internally.",
      "Re-run this module's fill-rate and reconciliation checks quarterly once RevPod™ (or an internal equivalent) is in place.",
    ],
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
    narrative: [
      "Most companies RevUp™ audits have 'AI theater' — paid subscriptions with zero measured workflow impact. RevCarto is a genuine exception: its AI ops assistant ('Viktor') is in daily production use for prospecting and outreach, with a real, founder-stated time savings of 10+ hours per week. That's a rare, credible number.",
      "Automation still hits friction in places — reCAPTCHA on manual application forms breaks end-to-end automation, forcing human workarounds. More significantly, the RevUp™ Engine platform itself — the tool that would systematize this exact audit methodology — doesn't exist yet inside RevCarto. This document you're reading is, in a very literal sense, the first artifact of building it.",
      "The AI maturity here is genuinely ahead of the size-adjusted benchmark. The opportunity isn't 'adopt more AI' — it's 'package the AI capability RevCarto already has into something repeatable and sellable,' starting with this platform.",
    ],
    benchmark:
      "Benchmark: size-adjusted AI maturity for an 8-person consultancy is typically 'a couple of point-solution subscriptions, no measured impact.' RevCarto has one production automation with a stated ROI — ahead of benchmark.",
    recommendations: [
      "Document Viktor's automations as a written AI-ops playbook — scope, guardrails, and escalation path — so it isn't a single point of failure.",
      "Prioritize building the RevUp™ Engine MVP (Section J of the build spec) — it directly compounds this module's existing strength.",
      "Audit remaining manual workarounds (like the reCAPTCHA friction) for low-effort automation wins.",
    ],
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
