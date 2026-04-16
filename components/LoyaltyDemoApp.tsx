"use client";

import { useMemo, useState } from "react";
import {
  campaigns,
  cdpSignals,
  enrollmentQueue,
  journeys,
  members,
  metrics,
  navItems,
  profileTimeline,
  settings,
  type NavKey,
} from "@/lib/data";

export default function LoyaltyDemoApp() {
  const [active, setActive] = useState<NavKey>("Overview");
  const [query, setQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(members[0].id);

  const visibleMembers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((member) =>
      [
        member.id,
        member.name,
        member.tier,
        member.channel,
        member.status,
        member.nextBestAction,
        member.categories.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const visibleQueue = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enrollmentQueue;
    return enrollmentQueue.filter((item) =>
      [item.store, item.task, item.customer, item.detail, item.priority]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const visibleCampaigns = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return campaigns;
    return campaigns.filter((item) =>
      [item.name, item.audience, item.channel, item.status, item.uplift]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const selected = members.find((member) => member.id === selectedMember) ?? members[0];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">M</div>
          <div>
            <div className="brand-title">Macta Flow</div>
            <div className="brand-subtitle">Loyalty Studio</div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">Navigation</div>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`sidebar-nav-item ${active === item ? "sidebar-nav-item-active" : ""}`}
              >
                <span>{item}</span>
                {item === "Enrollment" ? <span className="sidebar-count">3</span> : null}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-focus-card">
          <div className="sidebar-focus-title">Today</div>
          <p>Store join volume is strong, campaign recovery is live, and customer identity coverage is improving.</p>
          <button className="sidebar-focus-button" onClick={() => setActive("Overview")}>Open overview</button>
        </div>
      </aside>

      <main className="workspace">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">Retail loyalty and customer intelligence</p>
            <h1>{active}</h1>
            <p className="subcopy">
              Designed as a product demo for store enrollment, loyalty operations, service recovery, and a connected customer data layer.
            </p>
          </div>
          <div className="header-actions">
            <input
              className="search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search member, store, journey..."
            />
            <button className="ghost-button">Export view</button>
            <button className="primary-button" onClick={() => setActive("Campaigns")}>
              Open live campaigns
            </button>
          </div>
        </header>

        <section className="mobile-nav">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`inline-tab ${active === item ? "inline-tab-active" : ""}`}
            >
              {item}
            </button>
          ))}
        </section>

        {active === "Overview" && (
          <div className="page-stack">
            <section className="metric-grid">
              {metrics.map((card) => (
                <div key={card.label} className="metric-card">
                  <div className="metric-label">{card.label}</div>
                  <div className="metric-row">
                    <div className="metric-value">{card.value}</div>
                    <span className="neutral-chip">{card.delta}</span>
                  </div>
                </div>
              ))}
            </section>

            <section className="content-grid two-col-wide">
              <Card title="Operational focus" right="Executive view">
                <div className="stack-list">
                  <div className="note-card">Loyalty becomes the common identity layer across retail and online.</div>
                  <div className="note-card">Store enrollment gives teams a simple, visible way to capture members at checkout.</div>
                  <div className="note-card">The CDP layer connects purchases, service events, preferences, and consent into one profile that teams can use immediately.</div>
                </div>
              </Card>

              <Card title="Store enrollment queue" right="Immediate actions">
                <div className="stack-list">
                  {visibleQueue.map((item) => (
                    <div key={`${item.store}-${item.customer}`} className="queue-card">
                      <div className="queue-top-row">
                        <strong>{item.task}</strong>
                        <span className={`soft-badge soft-badge-${item.priority.toLowerCase()}`}>{item.priority}</span>
                      </div>
                      <div className="mini-muted">{item.store} · {item.customer}</div>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          </div>
        )}

        {active === "Loyalty" && (
          <div className="content-grid two-col-wide">
            <Card title="Members" right="Unified loyalty table">
              <DataTable
                headers={["Member", "Tier", "Channel", "LTV", "Last purchase", "Status"]}
                rows={visibleMembers.map((member) => (
                  <tr
                    key={member.id}
                    onClick={() => {
                      setSelectedMember(member.id);
                      setActive("Customer 360");
                    }}
                    className={`table-row ${selected.id === member.id ? "table-row-active" : ""}`}
                  >
                    <td>
                      <div className="table-strong">{member.name}</div>
                      <div className="mini-muted">{member.id}</div>
                    </td>
                    <td><span className="soft-badge">{member.tier}</span></td>
                    <td>{member.channel}</td>
                    <td>{member.lifetimeValue}</td>
                    <td>{member.lastPurchase}</td>
                    <td>{member.status}</td>
                  </tr>
                ))}
              />
            </Card>

            <Card title="Loyalty actions" right="Next best uses">
              <div className="stack-list">
                {[
                  "Enroll new members directly in store without spreadsheets or exports",
                  "Attach wallet-ready member identity to every retail signup",
                  "Use loyalty status for service recovery and premium treatment",
                  "Carry points, rewards, and messaging eligibility across channels",
                ].map((item) => (
                  <div key={item} className="action-card">{item}</div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {active === "Enrollment" && (
          <div className="content-grid two-col-wide">
            <Card title="Store join flow" right="Designed for counter teams">
              <div className="stack-list">
                {visibleQueue.map((item) => (
                  <div key={`${item.task}-${item.customer}`} className="task-card">
                    <div className="queue-top-row">
                      <div>
                        <div className="table-strong">{item.customer}</div>
                        <div className="mini-muted">{item.store}</div>
                      </div>
                      <span className={`soft-badge soft-badge-${item.priority.toLowerCase()}`}>{item.priority}</span>
                    </div>
                    <p>{item.task}</p>
                    <div className="mini-muted">{item.detail}</div>
                    <div className="card-actions">
                      <button className="primary-button primary-button-small">Complete</button>
                      <button className="ghost-button ghost-button-small">Open profile</button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Counter experience" right="Simple workflow">
              <div className="stack-list">
                {[
                  "Capture phone or email at checkout",
                  "Create or match existing profile instantly",
                  "Confirm consent and issue digital loyalty card",
                  "Sync points and purchase history into one member record",
                ].map((item) => (
                  <div key={item} className="note-card">{item}</div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {active === "Campaigns" && (
          <div className="content-grid two-col-wide">
            <Card title="Campaign library" right="Live and ready">
              <DataTable
                headers={["Campaign", "Audience", "Channel", "Uplift", "Status"]}
                rows={visibleCampaigns.map((campaign) => (
                  <tr key={campaign.name} className="table-row">
                    <td className="table-strong">{campaign.name}</td>
                    <td>{campaign.audience}</td>
                    <td>{campaign.channel}</td>
                    <td>{campaign.uplift}</td>
                    <td><span className="soft-badge">{campaign.status}</span></td>
                  </tr>
                ))}
              />
            </Card>

            <Card title="Current playbook" right="Demo scenarios">
              <div className="stack-list">
                {[
                  "Service recovery for delayed orders",
                  "VIP access for restocks and launches",
                  "Welcome flow after store enrollment",
                  "Trust rebuild after refund or complaint resolution",
                ].map((item) => (
                  <div key={item} className="action-card">{item}</div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {active === "Customer 360" && (
          <div className="content-grid two-col-wide">
            <Card title={selected.name} right={selected.id}>
              <div className="profile-grid">
                <ProfileStat label="Tier" value={selected.tier} />
                <ProfileStat label="Channel" value={selected.channel} />
                <ProfileStat label="Lifetime value" value={selected.lifetimeValue} />
                <ProfileStat label="Store visits" value={String(selected.visits)} />
                <ProfileStat label="Email consent" value={selected.emailConsent ? "Yes" : "No"} />
                <ProfileStat label="SMS consent" value={selected.smsConsent ? "Yes" : "No"} />
              </div>
              <div className="top-gap">
                <div className="panel-subtitle">Preferred categories</div>
                <div className="chip-row">
                  {selected.categories.map((category) => (
                    <span key={category} className="neutral-chip">{category}</span>
                  ))}
                </div>
              </div>
              <div className="top-gap">
                <div className="panel-subtitle">Next best action</div>
                <div className="note-card">{selected.nextBestAction}</div>
              </div>
            </Card>

            <Card title="Profile timeline" right="Cross-channel view">
              <div className="stack-list">
                {profileTimeline.map((item) => (
                  <div key={item} className="timeline-item">{item}</div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {active === "CDP" && (
          <div className="page-stack">
            <section className="metric-grid">
              {cdpSignals.map((signal) => (
                <div key={signal.title} className="metric-card">
                  <div className="metric-label">{signal.title}</div>
                  <div className="metric-row">
                    <div className="metric-value">{signal.value}</div>
                  </div>
                  <div className="metric-helper">{signal.detail}</div>
                </div>
              ))}
            </section>

            <section className="content-grid two-col-wide">
              <Card title="What the CDP layer holds" right="Customer intelligence">
                <div className="stack-list">
                  {[
                    "Resolved identity across store and online touchpoints",
                    "Consent state for email, SMS, and wallet pass messaging",
                    "Purchase, refund, support, and fulfillment context in one profile",
                    "Segmentation and trigger readiness for campaigns and service journeys",
                  ].map((item) => (
                    <div key={item} className="action-card">{item}</div>
                  ))}
                </div>
              </Card>

              <Card title="Connected sources" right="Prototype stack">
                <div className="stack-list">
                  {[
                    "Magento orders and customer events",
                    "Store enrollment and point accrual events",
                    "Support and refund signals",
                    "Directo customer and transaction enrichment",
                  ].map((item) => (
                    <div key={item} className="note-card">{item}</div>
                  ))}
                </div>
              </Card>
            </section>
          </div>
        )}

        {active === "Journeys" && (
          <div className="content-grid two-col-wide">
            <Card title="Journey catalogue" right="Automation flows">
              <DataTable
                headers={["Journey", "Goal", "Trigger", "Channel"]}
                rows={journeys.map((journey) => (
                  <tr key={journey.name} className="table-row">
                    <td className="table-strong">{journey.name}</td>
                    <td>{journey.goal}</td>
                    <td>{journey.trigger}</td>
                    <td>{journey.channel}</td>
                  </tr>
                ))}
              />
            </Card>

            <Card title="Journey design principles" right="Demo positioning">
              <div className="stack-list">
                {[
                  "Make every service event usable for retention",
                  "Move store sign-ups into active members quickly",
                  "Use identity and consent before pushing volume",
                  "Give teams a shared customer view before automating heavily",
                ].map((item) => (
                  <div key={item} className="action-card">{item}</div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {active === "Settings" && (
          <div className="content-grid two-col-wide">
            <Card title="Connections" right="Ready for rollout">
              <div className="stack-list">
                {settings.map((item) => (
                  <div key={item} className="action-card">{item}</div>
                ))}
              </div>
            </Card>

            <Card title="Controls" right="Recommended defaults">
              <div className="stack-list">
                {[
                  "Store join must capture at least one contact field",
                  "Service recovery journey waits for valid consent",
                  "Profile merge requires review when identities conflict",
                  "Points and rewards remain visible across store and web",
                ].map((item) => (
                  <div key={item} className="note-card">{item}</div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

function Card({
  title,
  right,
  children,
}: {
  title: string;
  right?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel-card">
      <div className="panel-card-head">
        <h3>{title}</h3>
        {right ? <span className="panel-head-meta">{right}</span> : null}
      </div>
      <div>{children}</div>
    </section>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode;
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="profile-stat">
      <div className="mini-muted">{label}</div>
      <div className="table-strong">{value}</div>
    </div>
  );
}
