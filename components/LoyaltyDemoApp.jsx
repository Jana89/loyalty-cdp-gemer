'use client';

import { useMemo, useState } from 'react';

const navItems = [
  'Overview',
  'Customers',
  'Segments',
  'Loyalty',
  'Rewards',
  'Campaigns',
  'Journeys',
  'Reviews',
  'Store',
  'Settings'
];

const customerRows = [
  { name: 'Kadi Tamm', channel: 'Online + Store', tier: 'Gold', points: 1480, last: '2h ago', status: 'Active' },
  { name: 'Laura Magi', channel: 'Store first', tier: 'Silver', points: 740, last: '1d ago', status: 'Active' },
  { name: 'Emma Laine', channel: 'Online', tier: 'Gold', points: 2210, last: '3d ago', status: 'At risk' },
  { name: 'Anna Virtanen', channel: 'Store + Online', tier: 'Bronze', points: 180, last: '5d ago', status: 'New' }
];

const segmentRows = [
  { name: 'High value, low recent activity', size: '1,240', trigger: 'No order in 30 days', action: 'Win-back journey' },
  { name: 'Store-first skincare buyers', size: '820', trigger: 'Store-heavy profile', action: 'Retail-exclusive reward' },
  { name: 'Frequent buyers with refunds', size: '144', trigger: 'Refund rate above threshold', action: 'Care journey' }
];

const rewardRows = [
  { name: 'Free Shipping', points: '300', type: 'Perk', availability: 'Always on' },
  { name: 'EUR 5 Voucher', points: '500', type: 'Voucher', availability: 'Always on' },
  { name: 'Skincare Gift', points: '900', type: 'Product reward', availability: 'Campaign limited' }
];

const campaignRows = [
  { name: 'Weekend 2x Points', audience: 'Skincare buyers', channel: 'Email + Store', status: 'Scheduled' },
  { name: 'Missed Points Recovery', audience: 'Recent store signups', channel: 'Email', status: 'Live' },
  { name: 'Summer Glow Bundle', audience: 'High intent beauty shoppers', channel: 'Email + SMS', status: 'Draft' }
];

const journeyRows = [
  { name: 'Welcome Flow', trigger: 'New member joined', action: 'Email + bonus points', status: 'Live' },
  { name: 'Reactivation Flow', trigger: 'No purchase in 45 days', action: 'SMS + reward reminder', status: 'Live' },
  { name: 'Delay Recovery', trigger: 'Delayed order detected', action: 'Apology points', status: 'Draft' }
];

const reviewRows = [
  { product: 'Hydrating Serum', score: '4.8', pending: '12', published: '340' },
  { product: 'Volume Mascara', score: '4.3', pending: '8', published: '211' },
  { product: 'Repair Mask', score: '4.6', pending: '5', published: '188' }
];

const storeRows = [
  { store: 'Tartu', enrollments: '42 today', transfers: '6 open', conversion: '18.2%' },
  { store: 'Kristiine', enrollments: '35 today', transfers: '2 open', conversion: '15.9%' },
  { store: 'Rocca', enrollments: '29 today', transfers: '4 open', conversion: '16.7%' }
];

function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandMark">G</div>
        <div>
          <div className="brandTitle">Gemer Loyalty Studio</div>
          <div className="brandSub">Loyalty, CRM and CDP</div>
        </div>
      </div>
      <nav className="navList">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`navItem ${active === item ? 'active' : ''}`}
          >
            <span>{item}</span>
          </button>
        ))}
      </nav>
      <div className="sidebarCard">
        <div className="sidebarCardTitle">Demo focus</div>
        <p>Show how one product can replace loyalty tooling, power campaigns, and unify customer context.</p>
      </div>
    </aside>
  );
}

function Stat({ label, value, meta }) {
  return (
    <div className="statCard">
      <div className="statLabel">{label}</div>
      <div className="statValue">{value}</div>
      <div className="statMeta">{meta}</div>
    </div>
  );
}

function Panel({ title, right, children }) {
  return (
    <section className="panel">
      <div className="panelHead">
        <h3>{title}</h3>
        {right ? <div>{right}</div> : null}
      </div>
      <div className="panelBody">{children}</div>
    </section>
  );
}

function SimpleTable({ columns, rows }) {
  return (
    <div className="tableWrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default function LoyaltyDemoApp() {
  const [active, setActive] = useState('Overview');
  const [query, setQuery] = useState('');

  const filteredCustomers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customerRows;
    return customerRows.filter((c) => Object.values(c).some((v) => String(v).toLowerCase().includes(q)));
  }, [query]);

  function renderContent() {
    if (active === 'Overview') {
      return (
        <div className="contentStack">
          <div className="statsGrid">
            <Stat label="Loyalty members" value="58,240" meta="12.4% growth" />
            <Stat label="Active in last 30 days" value="21,380" meta="36.7% active rate" />
            <Stat label="Points redeemed" value="€48.2k" meta="This month" />
            <Stat label="Unified profiles" value="71,904" meta="Online + retail" />
          </div>
          <div className="twoCol">
            <Panel title="Program health">
              <div className="healthGrid">
                <div className="healthCard"><strong>Gold members</strong><span>8,420</span></div>
                <div className="healthCard"><strong>Store enrollments</strong><span>106 today</span></div>
                <div className="healthCard"><strong>Triggered journeys</strong><span>18 live</span></div>
                <div className="healthCard"><strong>Profiles needing merge review</strong><span>34</span></div>
              </div>
            </Panel>
            <Panel title="Recent activity">
              <div className="activityList">
                <div className="activityItem"><span>Weekend 2x Points campaign scheduled</span><b>5 min ago</b></div>
                <div className="activityItem"><span>34 new store members added</span><b>17 min ago</b></div>
                <div className="activityItem"><span>Delay recovery journey triggered</span><b>26 min ago</b></div>
                <div className="activityItem"><span>Customer 360 merge completed for 82 profiles</span><b>1h ago</b></div>
              </div>
            </Panel>
          </div>
        </div>
      );
    }

    if (active === 'Customers') {
      return (
        <Panel title="Customer profiles" right={<span className="panelMeta">Customer 360</span>}>
          <SimpleTable
            columns={['Customer', 'Channel', 'Tier', 'Points', 'Last activity', 'Status']}
            rows={filteredCustomers.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.channel}</td>
                <td><span className="pill">{row.tier}</span></td>
                <td>{row.points}</td>
                <td>{row.last}</td>
                <td><span className="pill subtle">{row.status}</span></td>
              </tr>
            ))}
          />
        </Panel>
      );
    }

    if (active === 'Segments') {
      return (
        <Panel title="Audience segments" right={<button className="primaryBtn">Create segment</button>}>
          <SimpleTable
            columns={['Segment', 'Size', 'Entry rule', 'Default action']}
            rows={segmentRows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.size}</td>
                <td>{row.trigger}</td>
                <td>{row.action}</td>
              </tr>
            ))}
          />
        </Panel>
      );
    }

    if (active === 'Loyalty') {
      return (
        <div className="twoCol">
          <Panel title="Program structure">
            <div className="cardList">
              <div className="miniCard"><strong>Tier model</strong><span>Bronze, Silver, Gold</span></div>
              <div className="miniCard"><strong>Base earn rule</strong><span>1 point per €1</span></div>
              <div className="miniCard"><strong>Expiry rule</strong><span>365 days since earn</span></div>
            </div>
          </Panel>
          <Panel title="Member progression">
            <div className="cardList">
              <div className="miniCard"><strong>Bronze</strong><span>0 - 499 points</span></div>
              <div className="miniCard"><strong>Silver</strong><span>500 - 1499 points</span></div>
              <div className="miniCard"><strong>Gold</strong><span>1500+ points</span></div>
            </div>
          </Panel>
        </div>
      );
    }

    if (active === 'Rewards') {
      return (
        <Panel title="Reward catalog" right={<button className="primaryBtn">Add reward</button>}>
          <SimpleTable
            columns={['Reward', 'Points needed', 'Type', 'Availability']}
            rows={rewardRows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.points}</td>
                <td>{row.type}</td>
                <td>{row.availability}</td>
              </tr>
            ))}
          />
        </Panel>
      );
    }

    if (active === 'Campaigns') {
      return (
        <Panel title="Campaign planner" right={<button className="primaryBtn">New campaign</button>}>
          <SimpleTable
            columns={['Campaign', 'Audience', 'Channel', 'Status']}
            rows={campaignRows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.audience}</td>
                <td>{row.channel}</td>
                <td><span className="pill subtle">{row.status}</span></td>
              </tr>
            ))}
          />
        </Panel>
      );
    }

    if (active === 'Journeys') {
      return (
        <Panel title="Automated journeys" right={<button className="primaryBtn">Create journey</button>}>
          <SimpleTable
            columns={['Journey', 'Trigger', 'Action', 'Status']}
            rows={journeyRows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.trigger}</td>
                <td>{row.action}</td>
                <td><span className="pill subtle">{row.status}</span></td>
              </tr>
            ))}
          />
        </Panel>
      );
    }

    if (active === 'Reviews') {
      return (
        <Panel title="Reviews and ratings">
          <SimpleTable
            columns={['Product', 'Score', 'Pending', 'Published']}
            rows={reviewRows.map((row) => (
              <tr key={row.product}>
                <td>{row.product}</td>
                <td>{row.score}</td>
                <td>{row.pending}</td>
                <td>{row.published}</td>
              </tr>
            ))}
          />
        </Panel>
      );
    }

    if (active === 'Store') {
      return (
        <Panel title="Store loyalty performance">
          <SimpleTable
            columns={['Store', 'Enrollments', 'Open transfer-linked tasks', 'Conversion']}
            rows={storeRows.map((row) => (
              <tr key={row.store}>
                <td>{row.store}</td>
                <td>{row.enrollments}</td>
                <td>{row.transfers}</td>
                <td>{row.conversion}</td>
              </tr>
            ))}
          />
        </Panel>
      );
    }

    return (
      <div className="twoCol">
        <Panel title="Connected systems">
          <div className="cardList">
            <div className="miniCard"><strong>Magento</strong><span>Connected</span></div>
            <div className="miniCard"><strong>Directo ERP</strong><span>Connected</span></div>
            <div className="miniCard"><strong>Email</strong><span>Ready</span></div>
            <div className="miniCard"><strong>SMS</strong><span>Ready</span></div>
          </div>
        </Panel>
        <Panel title="Core rules">
          <div className="cardList">
            <div className="miniCard"><strong>Member join bonus</strong><span>100 points</span></div>
            <div className="miniCard"><strong>Auto-merge confidence</strong><span>95%</span></div>
            <div className="miniCard"><strong>Delayed-order recovery</strong><span>Enabled</span></div>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div className="appShell">
      <Sidebar active={active} onChange={setActive} />
      <main className="mainArea">
        <header className="topbar">
          <div>
            <h1>{active}</h1>
            <p>Unified loyalty, campaigns, and customer intelligence for retail and e-commerce.</p>
          </div>
          <div className="topbarActions">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search"
              placeholder="Search customers, segments, campaigns..."
            />
            <button className="ghostBtn">Export</button>
            <button className="primaryBtn">Create</button>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}
