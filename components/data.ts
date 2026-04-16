export const memberCards = [
  { label: "Active members", value: "18,420", delta: "+14%" },
  { label: "Retail enrollments this week", value: "286", delta: "+22%" },
  { label: "Delayed-point fixes", value: "17", delta: "-31%" },
  { label: "Profiles with unified data", value: "61%", delta: "+9 pts" },
];

export const loyaltyMembers = [
  {
    name: "Kadi Tamm",
    tier: "Glow+",
    channel: "Online + store",
    lifetimeValue: "€1,284",
    lastPurchase: "2 days ago",
    issue: "Missed points from in-store purchase",
    consent: "Complete",
  },
  {
    name: "Laura Mägi",
    tier: "Glow",
    channel: "Store-first",
    lifetimeValue: "€548",
    lastPurchase: "Today",
    issue: "No issue",
    consent: "Complete",
  },
  {
    name: "Emma Laine",
    tier: "Glow+",
    channel: "Online-first",
    lifetimeValue: "€1,912",
    lastPurchase: "1 day ago",
    issue: "At-risk after refund",
    consent: "Complete",
  },
  {
    name: "Mari Põld",
    tier: "Base",
    channel: "Store-only",
    lifetimeValue: "€112",
    lastPurchase: "8 days ago",
    issue: "Not linked to online profile",
    consent: "Email only",
  },
];

export const retailQueue = [
  {
    store: "Kristiine",
    task: "Link receipt to loyalty profile",
    customer: "Mari Põld",
    priority: "Medium",
    detail: "Customer gave email in store but profile not linked to wallet ID.",
  },
  {
    store: "Tartu",
    task: "Approve delayed-points correction",
    customer: "Kadi Tamm",
    priority: "High",
    detail: "Order picked from store; loyalty points missing after ERP sync delay.",
  },
  {
    store: "Rocca al Mare",
    task: "Offer join flow at checkout",
    customer: "Walk-in customer",
    priority: "Low",
    detail: "Store script should capture QR signup and connect to existing email when possible.",
  },
];

export const campaigns = [
  {
    name: "Delayed order recovery",
    audience: "High CLV customers with shipment delay",
    channel: "Email + SMS",
    status: "Live",
    uplift: "+11% retention",
  },
  {
    name: "Store-to-online join flow",
    audience: "Retail-only buyers without online profile",
    channel: "In-store QR + email",
    status: "Draft",
    uplift: "Projected +18% profile completion",
  },
  {
    name: "Beauty refill reminder",
    audience: "Repeat skincare buyers",
    channel: "Email",
    status: "Live",
    uplift: "+9% repeat rate",
  },
];

export const profileTimeline = [
  "Store purchase in Kristiine synced from ERP",
  "Refund request created in Magento",
  "Support approved partial goodwill refund",
  "SMS apology sent due to shipment delay",
  "Customer purchased again 6 days later",
];

export const cdpSignals = [
  {
    title: "Identity resolution",
    text: "Merge store email, online account, wallet card, and ERP receipt history into one usable customer profile.",
  },
  {
    title: "Unified customer view",
    text: "Show orders, refunds, loyalty tier, campaign touches, and store interactions in one timeline.",
  },
  {
    title: "Operational triggers",
    text: "Use events like delayed orders, missed points, or repeated refunds to trigger service recovery flows.",
  },
  {
    title: "Segmentation seeds",
    text: "Move beyond raw data into usable segments: store-first, refill buyers, at-risk after refund, high CLV with delay.",
  },
];

export const settings = [
  "Magento: customer events and order history connected",
  "Directo: receipt and loyalty correction feed connected",
  "Email/SMS provider: active",
  "Store QR join flow: prototype mode",
  "Data consent rules: basic demo state",
];
