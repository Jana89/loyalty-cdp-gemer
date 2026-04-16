export type NavKey =
  | "Overview"
  | "Loyalty"
  | "Enrollment"
  | "Campaigns"
  | "Customer 360"
  | "CDP"
  | "Journeys"
  | "Settings";

export const navItems: NavKey[] = [
  "Overview",
  "Loyalty",
  "Enrollment",
  "Campaigns",
  "Customer 360",
  "CDP",
  "Journeys",
  "Settings",
];

export const metrics = [
  { label: "Active members", value: "42.8K", delta: "+8.4%" },
  { label: "Store enrollments", value: "186", delta: "+21 today" },
  { label: "Triggered journeys", value: "14", delta: "+3 live" },
  { label: "Identified profiles", value: "67%", delta: "+11 pts" },
];

export const members = [
  {
    id: "MBR-1048",
    name: "Kadi Tamm",
    tier: "Gold",
    channel: "Store + Online",
    lifetimeValue: "€1,284",
    lastPurchase: "Today · Tallinn Kristiine",
    status: "At risk",
    nextBestAction: "Recover delayed order with points + SMS",
    emailConsent: true,
    smsConsent: true,
    visits: 16,
    categories: ["Skincare", "K-Beauty", "Supplements"],
  },
  {
    id: "MBR-1056",
    name: "Laura Mägi",
    tier: "Silver",
    channel: "Online",
    lifetimeValue: "€486",
    lastPurchase: "Yesterday · Web",
    status: "Growing",
    nextBestAction: "Move into replenishment journey",
    emailConsent: true,
    smsConsent: false,
    visits: 7,
    categories: ["Haircare", "Tools"],
  },
  {
    id: "MBR-1089",
    name: "Emma Laine",
    tier: "Gold",
    channel: "Store + Online",
    lifetimeValue: "€1,948",
    lastPurchase: "2 days ago · Tartu",
    status: "High value",
    nextBestAction: "Invite to VIP access drop",
    emailConsent: true,
    smsConsent: true,
    visits: 21,
    categories: ["Makeup", "Fragrance", "Skincare"],
  },
  {
    id: "MBR-1112",
    name: "Mari Põld",
    tier: "Bronze",
    channel: "Store",
    lifetimeValue: "€162",
    lastPurchase: "Today · Rocca al Mare",
    status: "New",
    nextBestAction: "Welcome series + first points reminder",
    emailConsent: true,
    smsConsent: true,
    visits: 2,
    categories: ["Body", "Haircare"],
  },
];

export const enrollmentQueue = [
  {
    store: "Tallinn Kristiine",
    task: "Complete member profile",
    customer: "Mari Põld",
    detail: "Phone captured in store. Finish email + consent so future points and receipts sync automatically.",
    priority: "High",
  },
  {
    store: "Tartu",
    task: "Resolve duplicate profile",
    customer: "Emma Laine",
    detail: "Store account and web account look like the same person. Merge before next campaign send.",
    priority: "Medium",
  },
  {
    store: "Rocca al Mare",
    task: "Issue digital card",
    customer: "Riin Kask",
    detail: "Customer joined at checkout and wants wallet-ready loyalty pass for in-store scans.",
    priority: "New",
  },
];

export const campaigns = [
  {
    name: "Delayed order recovery",
    audience: "High-value members with delayed shipments",
    channel: "Email + SMS",
    uplift: "+14% save rate",
    status: "Live",
  },
  {
    name: "Back in stock VIP access",
    audience: "Gold and Silver skincare members",
    channel: "Email",
    uplift: "+9% conversion",
    status: "Ready",
  },
  {
    name: "Store join welcome",
    audience: "New retail sign-ups",
    channel: "SMS + Email",
    uplift: "+22% activation",
    status: "Live",
  },
  {
    name: "Refund trust recovery",
    audience: "Members with approved returns",
    channel: "Email",
    uplift: "+7% second purchase",
    status: "Draft",
  },
];

export const cdpSignals = [
  {
    title: "Unified identity coverage",
    value: "67%",
    detail: "Share of customers resolved across store, Magento, and loyalty records.",
  },
  {
    title: "Known consent coverage",
    value: "74%",
    detail: "Profiles with valid communication permissions ready for automation.",
  },
  {
    title: "Profiles with service risk",
    value: "214",
    detail: "Customers connected to delayed orders, recent refunds, or missing points issues.",
  },
  {
    title: "Predicted replenishment window",
    value: "5.8d",
    detail: "Average time until the next likely purchase for active skincare members.",
  },
];

export const profileTimeline = [
  "Joined loyalty in Tallinn Kristiine at checkout",
  "Placed online order for SKIN1004 assortment",
  "Order experienced dispatch delay and support touched account",
  "Store purchase added and points recalculated",
  "Now eligible for service recovery journey",
];

export const journeys = [
  {
    name: "Welcome & activation",
    goal: "Turn new store joins into identified omnichannel members",
    trigger: "Store signup completed",
    channel: "Email + Wallet pass",
  },
  {
    name: "Delay recovery",
    goal: "Protect trust when fulfillment slips",
    trigger: "Order delay exceeds SLA",
    channel: "SMS + Email",
  },
  {
    name: "Return reassurance",
    goal: "Bring refunded customers back",
    trigger: "Refund completed",
    channel: "Email",
  },
  {
    name: "Replenishment",
    goal: "Repeat purchase at the right time",
    trigger: "Predicted next-buy window",
    channel: "Email + App card",
  },
];

export const settings = [
  "Magento customer + order events connected",
  "Store enrollment tablets enabled",
  "Loyalty wallet pass generation enabled",
  "SMS provider connected for service and campaign messages",
  "Directo customer sync available for profile enrichment",
];
