'use client';

import { useMemo, useState } from 'react';

const NAV = [
  'Overview',
  'Customers',
  'Segments',
  'Loyalty',
  'Rewards',
  'Campaigns',
  'Journeys',
  'Reviews',
  'Store',
  'Settings',
];

const KPI = [
  { label: 'Active members', value: '48.2k', delta: '+6.4%' },
  { label: 'Monthly redemptions', value: '3,184', delta: '+12.1%' },
  { label: 'Store enrollments', value: '1,126', delta: '+18.7%' },
  { label: 'Triggered journeys', value: '9,402', delta: '+9.8%' },
];

const CUSTOMERS = [
  {
    id: 'C-10482',
    name: 'Kadi Tamm',
    email: 'kadi@example.com',
    tier: 'Gold',
    points: 1480,
    segment: 'VIP skincare',
    clv: '€1,240',
    channel: 'Online + Store',
    lastAction: 'Redeemed free shipping',
    timeline: [
      'Purchased skincare bundle in Tallinn store',
      'Earned 240 points from campaign purchase',
      'Received replenishment email',
      'Redeemed free shipping reward',
    ],
  },
  {
    id: 'C-10511',
    name: 'Laura Mägi',
    email: 'laura@example.com',
    tier: 'Silver',
    points: 620,
    segment: 'K-beauty repeat buyer',
    clv: '€540',
    channel: 'Store-first',
    lastAction: 'Joined in Rocca al Mare',
    timeline: [
      'Joined loyalty in Rocca al Mare',
      'Completed first online purchase',
      'Received welcome points',
      'Entered inactive risk segment after 21 days',
    ],
  },
  {
    id: 'C-10592',
    name: 'Emma Laine',
    email: 'emma@example.com',
    tier: 'Bronze',
    points: 190,
    segment: 'At-risk high value',
    clv: '€830',
    channel: 'Online',
    lastAction: 'Delayed order compensation sent',
    timeline: [
      'Placed two premium orders in 30 days',
      'Experienced delayed shipment',
      'Received apology campaign and bonus points',
      'Opened reactivation email',
    ],
  },
];

const SEGMENTS = [
  { name: 'VIP skincare', rule: 'Spend > €500 and skincare share > 60%', size: '3,820', status: 'Live' },
  { name: 'K-beauty repeat buyer', rule: '3+ K-beauty orders in 90 days', size: '2,145', status: 'Live' },
  { name: 'At-risk high value', rule: 'CLV > €500 and no purchase in 30 days', size: '612', status: 'Priority' },
  { name: 'Store-first members', rule: 'More than 50% purchases in store', size: '7,240', status: 'Live' },
];

const REWARDS = [
  { title: 'Free shipping', cost: '300 pts', type: 'Utility', limit: 'Unlimited', state: 'Active' },
  { title: '€5 beauty credit', cost: '500 pts', type: 'Voucher', limit: 'Monthly cap', state: 'Active' },
  { title: 'Travel-size gift set', cost: '800 pts', type: 'Gift', limit: 'Low stock', state: 'Featured' },
  { title: 'VIP early access', cost: 'Tier benefit', type: 'Access', limit: 'Gold only', state: 'Active' },
];

const CAMPAIGNS = [
  { name: '2x points on skincare weekend', audience: 'VIP skincare', channel: 'Email + In-store', state: 'Scheduled' },
  { name: 'Come back and earn 150 bonus points', audience: 'At-risk high value', channel: 'Email + SMS', state: 'Running' },
  { name: 'K-beauty new arrivals launch', audience: 'K-beauty repeat buyer', channel: 'Email', state: 'Draft' },
];

const JOURNEYS = [
  { name: 'Welcome flow', trigger: 'First enrollment', action: 'Email + bonus points', status: 'Live' },
  { name: 'Delayed order recovery', trigger: 'Order delay > 24h', action: 'SMS + compensation', status: 'Live' },
  { name: 'Inactivity reactivation', trigger: 'No order in 30 days', action: 'Email + reward', status: 'Testing' },
  { name: 'Store enrollment follow-up', trigger: 'Joined in store', action: 'Profile completion email', status: 'Live' },
];

const REVIEWS = [
  { product: 'Hydrating Serum', score: '4.8', volume: '1,204', moderation: '12 pending' },
  { product: 'Volume Mascara', score: '4.5', volume: '842', moderation: '5 pending' },
  { product: 'Repair Mask', score: '4.6', volume: '560', moderation: '3 pending' },
];

const STORE_ACTIVITY = [
  { location: 'Rocca al Mare', enrollments: '182', redemptions: '54', staffPrompt: 'Strong onboarding' },
  { location: 'Kristiine', enrollments: '144', redemptions: '61', staffPrompt: 'Reward usage rising' },
  { location: 'Tartu', enrollments: '128', redemptions: '37', staffPrompt: 'Need faster sign-up flow' },
  { location: 'Kadaka', enrollments: '96', redemptions: '29', staffPrompt: 'Drive second purchase' },
];

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Badge({ children, tone = 'default' }) {
  const tones = {
    default: 'bg-slate-100 text-slate-700',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-blue-100 text-blue-700',
    violet: 'bg-violet-100 text-violet-700',
  };
  return <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-medium', tones[tone])}>{children}</span>;
}

function Card({ title, right, children }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function MetricCard({ label, value, delta }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div className="text-[34px] font-semibold leading-none tracking-tight text-slate-900">{value}</div>
        <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{delta}</div>
      </div>
    </div>
  );
}

function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-slate-500">
          <tr className="border-b border-slate-100">
            {headers.map((header) => (
              <th key={header} className="pb-3 font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default function Page() {
  const [active, setActive] = useState('Overview');
  const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0].id);
  const [query, setQuery] = useState('');

  const currentCustomer = CUSTOMERS.find((c) => c.id === selectedCustomer) || CUSTOMERS[0];

  const filteredCustomers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CUSTOMERS;
    return CUSTOMERS.filter((c) =>
      [c.name, c.email, c.tier, c.segment, c.channel].join(' ').toLowerCase().includes(q)
    );
  }, [query]);

  function renderContent() {
    if (active === 'Overview') {
      return (
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {KPI.map((item) => <MetricCard key={item.label} {...item} />)}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
            <Card title="Program performance" right={<span className="text-xs text-slate-500">Last 30 days</span>}>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  ['Points issued', '182k', 'bg-slate-100'],
                  ['Points redeemed', '64k', 'bg-violet-100'],
                  ['Repeat purchase rate', '41%', 'bg-emerald-100'],
                  ['Store-linked profiles', '72%', 'bg-blue-100'],
                ].map(([label, value, tone]) => (
                  <div key={label} className={cn('rounded-[24px] p-4', tone)}>
                    <div className="text-sm font-medium text-slate-700">{label}</div>
                    <div className="mt-6 text-[28px] font-semibold tracking-tight text-slate-900">{value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-slate-900">Unified profile coverage</div>
                    <div className="mt-1 text-sm text-slate-500">Online, store, loyalty and support events mapped into one customer view.</div>
                  </div>
                  <div className="text-lg font-semibold text-slate-900">84%</div>
                </div>
                <div className="mt-4 h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[84%] rounded-full bg-slate-900" />
                </div>
              </div>
            </Card>

            <Card title="Live priorities">
              <div className="space-y-3">
                {[
                  ['At-risk high value segment growing', '612 customers now meet rescue-flow criteria.', 'amber'],
                  ['Store enrollment completion is strong', 'Rocca al Mare leads this week with 182 new profiles.', 'green'],
                  ['Reward stock requires attention', 'Travel-size gift set redemption pressure is rising.', 'blue'],
                  ['Review moderation queue is manageable', '20 total reviews waiting approval across hero products.', 'violet'],
                ].map(([title, text, tone]) => (
                  <div key={title} className="rounded-[24px] border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{title}</div>
                        <div className="mt-1 text-sm text-slate-500">{text}</div>
                      </div>
                      <Badge tone={tone}>{tone === 'amber' ? 'Focus' : 'Live'}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      );
    }

    if (active === 'Customers') {
      return (
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card title="Customer profiles">
            <Table headers={['Customer', 'Tier', 'Points', 'Segment', 'CLV', 'Channel']}>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer.id)}
                  className={cn('cursor-pointer border-b border-slate-100 last:border-0 hover:bg-slate-50', customer.id === selectedCustomer && 'bg-slate-50')}
                >
                  <td className="py-4">
                    <div className="font-medium text-slate-900">{customer.name}</div>
                    <div className="text-xs text-slate-500">{customer.email}</div>
                  </td>
                  <td className="py-4"><Badge tone="violet">{customer.tier}</Badge></td>
                  <td className="py-4">{customer.points}</td>
                  <td className="py-4">{customer.segment}</td>
                  <td className="py-4">{customer.clv}</td>
                  <td className="py-4">{customer.channel}</td>
                </tr>
              ))}
            </Table>
          </Card>

          <Card title="Customer 360">
            <div className="space-y-5">
              <div>
                <div className="text-[22px] font-semibold tracking-tight text-slate-900">{currentCustomer.name}</div>
                <div className="mt-1 text-sm text-slate-500">{currentCustomer.email}</div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-[22px] bg-slate-50 p-4"><div className="text-xs text-slate-500">Tier</div><div className="mt-2"><Badge tone="violet">{currentCustomer.tier}</Badge></div></div>
                <div className="rounded-[22px] bg-slate-50 p-4"><div className="text-xs text-slate-500">Points</div><div className="mt-2 font-semibold text-slate-900">{currentCustomer.points}</div></div>
                <div className="rounded-[22px] bg-slate-50 p-4"><div className="text-xs text-slate-500">Primary segment</div><div className="mt-2 font-medium text-slate-900">{currentCustomer.segment}</div></div>
                <div className="rounded-[22px] bg-slate-50 p-4"><div className="text-xs text-slate-500">CLV</div><div className="mt-2 font-medium text-slate-900">{currentCustomer.clv}</div></div>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Activity timeline</div>
                <div className="mt-3 space-y-3">
                  {currentCustomer.timeline.map((item) => (
                    <div key={item} className="rounded-[20px] border border-slate-200 p-3 text-sm text-slate-700">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    if (active === 'Segments') {
      return (
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card title="Audience segments" right={<button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">New segment</button>}>
            <Table headers={['Segment', 'Rule', 'Size', 'Status']}>
              {SEGMENTS.map((segment) => (
                <tr key={segment.name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="py-4 font-medium text-slate-900">{segment.name}</td>
                  <td className="py-4 text-slate-600">{segment.rule}</td>
                  <td className="py-4">{segment.size}</td>
                  <td className="py-4"><Badge tone={segment.status === 'Priority' ? 'amber' : 'green'}>{segment.status}</Badge></td>
                </tr>
              ))}
            </Table>
          </Card>
          <Card title="Segment builder">
            <div className="space-y-4">
              {[
                'Spend in last 180 days',
                'Product category preference',
                'Online versus store purchase share',
                'Reward redemption rate',
                'Refund or service recovery history',
              ].map((rule) => (
                <div key={rule} className="rounded-[20px] border border-slate-200 p-4 text-sm text-slate-700">{rule}</div>
              ))}
            </div>
          </Card>
        </div>
      );
    }

    if (active === 'Loyalty') {
      return (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card title="Loyalty configuration">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Base earn rate', '1 point per €1'],
                ['Gold tier threshold', '€900 yearly spend'],
                ['Point expiry', '12 months rolling'],
                ['Store earn rule', 'Same as online'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[22px] bg-slate-50 p-4">
                  <div className="text-xs text-slate-500">{label}</div>
                  <div className="mt-2 font-medium text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Loyalty performance">
            <div className="space-y-3">
              {[
                'Gold members drive the highest redemption value per order.',
                'Store enrollments convert well when a first reward is visible immediately.',
                'Delayed-order compensation points are generating strong second-purchase recovery.',
              ].map((item) => (
                <div key={item} className="rounded-[20px] border border-slate-200 p-4 text-sm text-slate-700">{item}</div>
              ))}
            </div>
          </Card>
        </div>
      );
    }

    if (active === 'Rewards') {
      return (
        <Card title="Reward catalog" right={<button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Add reward</button>}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {REWARDS.map((reward) => (
              <div key={reward.title} className="rounded-[28px] border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[15px] font-semibold text-slate-900">{reward.title}</div>
                  <Badge tone={reward.state === 'Featured' ? 'amber' : 'green'}>{reward.state}</Badge>
                </div>
                <div className="mt-4 text-sm text-slate-500">{reward.type}</div>
                <div className="mt-2 text-[24px] font-semibold tracking-tight text-slate-900">{reward.cost}</div>
                <div className="mt-4 rounded-[20px] bg-slate-50 p-3 text-sm text-slate-600">{reward.limit}</div>
              </div>
            ))}
          </div>
        </Card>
      );
    }

    if (active === 'Campaigns') {
      return (
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card title="Campaigns">
            <Table headers={['Campaign', 'Audience', 'Channel', 'State']}>
              {CAMPAIGNS.map((campaign) => (
                <tr key={campaign.name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="py-4 font-medium text-slate-900">{campaign.name}</td>
                  <td className="py-4">{campaign.audience}</td>
                  <td className="py-4">{campaign.channel}</td>
                  <td className="py-4"><Badge tone={campaign.state === 'Running' ? 'green' : campaign.state === 'Scheduled' ? 'blue' : 'amber'}>{campaign.state}</Badge></td>
                </tr>
              ))}
            </Table>
          </Card>
          <Card title="Message studio">
            <div className="space-y-3">
              {['Email header and reward teaser', 'SMS preview with short dynamic variables', 'Store staff prompt for enrolment and benefit explanation'].map((item) => (
                <div key={item} className="rounded-[20px] border border-slate-200 p-4 text-sm text-slate-700">{item}</div>
              ))}
            </div>
          </Card>
        </div>
      );
    }

    if (active === 'Journeys') {
      return (
        <Card title="Automated journeys">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {JOURNEYS.map((journey) => (
              <div key={journey.name} className="rounded-[28px] border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[15px] font-semibold text-slate-900">{journey.name}</div>
                  <Badge tone={journey.status === 'Live' ? 'green' : 'amber'}>{journey.status}</Badge>
                </div>
                <div className="mt-4 text-xs uppercase tracking-wide text-slate-400">Trigger</div>
                <div className="mt-1 text-sm text-slate-700">{journey.trigger}</div>
                <div className="mt-4 text-xs uppercase tracking-wide text-slate-400">Action</div>
                <div className="mt-1 text-sm text-slate-700">{journey.action}</div>
              </div>
            ))}
          </div>
        </Card>
      );
    }

    if (active === 'Reviews') {
      return (
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card title="Review health">
            <Table headers={['Product', 'Score', 'Volume', 'Moderation']}>
              {REVIEWS.map((review) => (
                <tr key={review.product} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="py-4 font-medium text-slate-900">{review.product}</td>
                  <td className="py-4">{review.score}</td>
                  <td className="py-4">{review.volume}</td>
                  <td className="py-4">{review.moderation}</td>
                </tr>
              ))}
            </Table>
          </Card>
          <Card title="Moderation queue">
            <div className="space-y-3">
              {['Approve hero-product reviews faster before campaign launch', 'Route low-score reviews into support recovery flow', 'Use high-rating reviews in campaign creative blocks'].map((item) => (
                <div key={item} className="rounded-[20px] border border-slate-200 p-4 text-sm text-slate-700">{item}</div>
              ))}
            </div>
          </Card>
        </div>
      );
    }

    if (active === 'Store') {
      return (
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card title="Store enrollment and redemption">
            <Table headers={['Location', 'Enrollments', 'Redemptions', 'Store note']}>
              {STORE_ACTIVITY.map((row) => (
                <tr key={row.location} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="py-4 font-medium text-slate-900">{row.location}</td>
                  <td className="py-4">{row.enrollments}</td>
                  <td className="py-4">{row.redemptions}</td>
                  <td className="py-4 text-slate-600">{row.staffPrompt}</td>
                </tr>
              ))}
            </Table>
          </Card>
          <Card title="Store experience">
            <div className="space-y-3">
              {['Fast sign-up flow linked to a wallet pass or phone number', 'Immediate view of points and available rewards at checkout', 'Clear next-best action for store staff after enrollment'].map((item) => (
                <div key={item} className="rounded-[20px] border border-slate-200 p-4 text-sm text-slate-700">{item}</div>
              ))}
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Connected systems">
          <div className="space-y-3">
            {['Magento storefront', 'Directo ERP', 'Email provider', 'SMS provider', 'Store POS / enrollment workflow'].map((item) => (
              <div key={item} className="rounded-[20px] border border-slate-200 p-4 text-sm text-slate-700">{item}</div>
            ))}
          </div>
        </Card>
        <Card title="Rules and governance">
          <div className="space-y-3">
            {['Point expiry and reward liability', 'Tier calculation windows', 'Consent and profile permissions', 'Journey frequency and quiet hours'].map((item) => (
              <div key={item} className="rounded-[20px] border border-slate-200 p-4 text-sm text-slate-700">{item}</div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white xl:block">
          <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">G</div>
            <div>
              <div className="text-[15px] font-semibold text-slate-900">Gemer One</div>
              <div className="text-xs text-slate-500">Loyalty Studio</div>
            </div>
          </div>

          <nav className="space-y-1 p-4 text-sm">
            {NAV.map((item) => {
              const activeItem = item === active;
              return (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors',
                    activeItem
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  <span>{item}</span>
                  {item === 'Journeys' ? (
                    <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', activeItem ? 'bg-white/15 text-white' : 'bg-slate-200 text-slate-700')}>
                      4
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="m-4 rounded-[28px] bg-slate-900 p-4 text-white">
            <div className="text-sm font-semibold">Program snapshot</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Loyalty, messaging, reviews, and unified customer profiles in one product demo.
            </p>
            <button className="mt-4 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-900">Open overview</button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-[32px] font-semibold tracking-tight text-slate-900">{active}</h1>
                <p className="mt-1 text-sm text-slate-500">Unified loyalty, customer data, campaigns, and store engagement.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-72 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="Search customer, segment, campaign..."
                />
                <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Export</button>
                <button className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Create campaign</button>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-3 lg:hidden">
              {NAV.map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={cn(
                    'whitespace-nowrap rounded-2xl px-4 py-2 text-sm',
                    item === active ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
