"use client";

import { useMemo, useState } from "react";
import {
  campaigns,
  cdpSignals,
  loyaltyMembers,
  memberCards,
  profileTimeline,
  retailQueue,
  settings,
} from "../components/data";

type NavKey =
  | "Overview"
  | "Loyalty Members"
  | "Store Enrollment"
  | "Campaigns"
  | "Customer 360"
  | "CDP Layer"
  | "Settings";

const navItems: NavKey[] = [
  "Overview",
  "Loyalty Members",
  "Store Enrollment",
  "Campaigns",
  "Customer 360",
  "CDP Layer",
  "Settings",
];

export default function Page() {
  const [active, setActive] = useState<NavKey>("Overview");
  const [query, setQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState("Kadi Tamm");

  const filteredMembers = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return loyaltyMembers;
    return loyaltyMembers.filter((m) =>
      [m.name, m.tier, m.channel, m.issue, m.consent].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const filteredQueue = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return retailQueue;
    return retailQueue.filter((item) =>
      [item.store, item.task, item.customer, item.detail].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const filteredCampaigns = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return campaigns;
    return campaigns.filter((c) =>
      [c.name, c.audience, c.channel, c.status, c.uplift].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const member = loyaltyMembers.find((m) => m.name === selectedMember) ?? loyaltyMembers[0];

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">M</div>
          <div>
            <div className="brand-title">Macta Flow</div>
            <div className="brand-subtitle">Loyalty & Customer Layer</div>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={active === item ? "nav-item nav-item-active" : "nav-item"}
            >
              <span>{item}</span>
              {item === "Store Enrollment" ? <span className="pill">3</span> : null}
            </button>
          ))}
        </nav>

        <div className="focus-card">
          <div className="focus-title">Client story this app solves</div>
          <p>
            Connect store loyalty, online history, refund impact, and proactive messaging without forcing everything into Magento or Directo.
          </p>
          <button onClick={() => setActive("Overview")} className="primary-light">
            Open executive view
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>{active}</h1>
            <p>Prototype demo shaped around the call: retail enrollment, loyalty gaps, and a CDP extension.</p>
          </div>
          <div className="topbar-actions">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search member, store, issue..."
            />
            <button className="secondary">Export concept</button>
            <button className="primary" onClick={() => setActive("Campaigns")}>Launch recovery flow</button>
          </div>
        </header>

        <section className="mobile-nav">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={active === item ? "mobile-chip mobile-chip-active" : "mobile-chip"}
            >
              {item}
            </button>
          ))}
        </section>

        {active === "Overview" && (
          <div className="page-grid">
            <section className="cards-grid">
              {memberCards.map((card) => (
                <div key={card.label} className="stat-card">
                  <div className="muted">{card.label}</div>
                  <div className="stat-row">
                    <div className="stat-value">{card.value}</div>
                    <span className="chip">{card.delta}</span>
                  </div>
                </div>
              ))}
            </section>

            <section className="content-grid two-col-wide">
              <div className="panel">
                <div className="panel-head">
                  <h3>Why loyalty matters here</h3>
                  <span className="muted">Client-facing view</span>
                </div>
                <div className="stack">
                  <div className="note-card">
                    Loyalty is not just points. It is the first usable customer identity layer across store and online.
                  </div>
                  <div className="note-card">
                    The CDP extension turns loyalty from a marketing widget into an operational recovery engine: missed points, refund risk, delayed orders, and store enrollment all become visible.
                  </div>
                  <div className="note-card">
                    This matches the call: current retail enrollment is manual, customer context is fragmented, and Yotpo alone is too limited for in-store workflows.
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <h3>Store enrollment queue</h3>
                  <span className="muted">Immediate actions</span>
                </div>
                <div className="stack">
                  {filteredQueue.map((item) => (
                    <div key={item.store + item.task} className="queue-card">
                      <div className="queue-top">
                        <strong>{item.task}</strong>
                        <span className="status-badge">{item.priority}</span>
                      </div>
                      <div className="muted small">{item.store} · {item.customer}</div>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {active === "Loyalty Members" && (
          <div className="content-grid two-col-wide">
            <div className="panel">
              <div className="panel-head">
                <h3>Member list</h3>
                <span className="muted">Unified loyalty table</span>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Tier</th>
                      <th>Channel</th>
                      <th>LTV</th>
                      <th>Last purchase</th>
                      <th>Issue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((m) => (
                      <tr key={m.name} onClick={() => { setSelectedMember(m.name); setActive("Customer 360"); }}>
                        <td>{m.name}</td>
                        <td><span className="soft-badge">{m.tier}</span></td>
                        <td>{m.channel}</td>
                        <td>{m.lifetimeValue}</td>
                        <td>{m.lastPurchase}</td>
                        <td>{m.issue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>What this solves</h3>
                <span className="muted">From the transcript</span>
              </div>
              <div className="stack">
                <div className="note-card">Store staff can register people directly into loyalty instead of using sheets and exports.</div>
                <div className="note-card">Support can see loyalty status next to refunds and delayed orders.</div>
                <div className="note-card">Managers can identify customers whose points or identity did not sync correctly after store-originated orders.</div>
              </div>
            </div>
          </div>
        )}

        {active === "Store Enrollment" && (
          <div className="content-grid two-col-wide">
            <div className="panel">
              <div className="panel-head">
                <h3>Retail join flow</h3>
                <span className="muted">Designed for store staff</span>
              </div>
              <div className="stack">
                {filteredQueue.map((item) => (
                  <div key={item.task + item.customer} className="task-row">
                    <div>
                      <strong>{item.task}</strong>
                      <div className="muted small">{item.store} · {item.customer}</div>
                    </div>
                    <button className="primary-small">Open task</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Recommended in-store workflow</h3>
                <span className="muted">Prototype logic</span>
              </div>
              <div className="timeline">
                <div className="timeline-item">1. Scan receipt or lookup email / wallet ID</div>
                <div className="timeline-item">2. Match to existing online profile if it exists</div>
                <div className="timeline-item">3. If no profile exists, create lightweight store-first account</div>
                <div className="timeline-item">4. Confirm consent for email and SMS separately</div>
                <div className="timeline-item">5. Award points instantly or queue correction if ERP sync lags</div>
              </div>
            </div>
          </div>
        )}

        {active === "Campaigns" && (
          <div className="content-grid two-col-wide">
            <div className="panel">
              <div className="panel-head">
                <h3>Campaigns and service recovery</h3>
                <span className="muted">Loyalty as action layer</span>
              </div>
              <div className="stack">
                {filteredCampaigns.map((c) => (
                  <div key={c.name} className="queue-card">
                    <div className="queue-top">
                      <strong>{c.name}</strong>
                      <span className="status-badge">{c.status}</span>
                    </div>
                    <div className="muted small">{c.channel}</div>
                    <p>{c.audience}</p>
                    <div className="chip-inline">{c.uplift}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Why this matters for Macta</h3>
                <span className="muted">Client language</span>
              </div>
              <div className="stack">
                <div className="note-card">Loyalty should not only reward buying. It should protect relationships when refunds, delays, or missed points happen.</div>
                <div className="note-card">This makes the loyalty layer relevant to support and operations, not only marketing.</div>
                <div className="note-card">It also gives retail stores a reason to participate because the same flow helps fix customer friction on the spot.</div>
              </div>
            </div>
          </div>
        )}

        {active === "Customer 360" && (
          <div className="content-grid two-col-wide">
            <div className="panel">
              <div className="panel-head">
                <h3>{member.name}</h3>
                <span className="muted">Customer 360 profile</span>
              </div>
              <div className="profile-grid">
                <div className="mini-card">
                  <div className="muted small">Tier</div>
                  <strong>{member.tier}</strong>
                </div>
                <div className="mini-card">
                  <div className="muted small">LTV</div>
                  <strong>{member.lifetimeValue}</strong>
                </div>
                <div className="mini-card">
                  <div className="muted small">Channel</div>
                  <strong>{member.channel}</strong>
                </div>
                <div className="mini-card">
                  <div className="muted small">Consent</div>
                  <strong>{member.consent}</strong>
                </div>
              </div>

              <div className="stack top-gap">
                {profileTimeline.map((item) => (
                  <div key={item} className="timeline-item">{item}</div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Suggested next action</h3>
                <span className="muted">Assistive, not automatic</span>
              </div>
              <div className="stack">
                <div className="note-card">Offer a recovery message because the customer had both a refund event and a delayed shipment.</div>
                <div className="note-card">Correct missing store points if the receipt was fulfilled from a retail location and ERP sync lagged.</div>
                <div className="note-card">Move the profile into the “high CLV with service friction” segment for customer care follow-up.</div>
              </div>
            </div>
          </div>
        )}

        {active === "CDP Layer" && (
          <div className="content-grid two-col-wide">
            <div className="panel">
              <div className="panel-head">
                <h3>CDP extension</h3>
                <span className="muted">Extended version of loyalty</span>
              </div>
              <div className="stack">
                {cdpSignals.map((signal) => (
                  <div key={signal.title} className="queue-card">
                    <strong>{signal.title}</strong>
                    <p>{signal.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Architecture concept</h3>
                <span className="muted">How it fits the stack</span>
              </div>
              <div className="timeline">
                <div className="timeline-item">Magento provides account, order, cart, and campaign events</div>
                <div className="timeline-item">Directo provides receipts, loyalty corrections, and store transaction history</div>
                <div className="timeline-item">Retail app captures signups, wallet IDs, and point corrections at the counter</div>
                <div className="timeline-item">CDP layer merges this into one profile and exposes segments + triggers</div>
                <div className="timeline-item">Messaging tools consume those triggers for email and SMS flows</div>
              </div>
            </div>
          </div>
        )}

        {active === "Settings" && (
          <div className="panel">
            <div className="panel-head">
              <h3>Prototype settings</h3>
              <span className="muted">Demo state</span>
            </div>
            <div className="stack">
              {settings.map((item) => (
                <div key={item} className="task-row">
                  <span>{item}</span>
                  <span className="soft-badge">Configured</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
