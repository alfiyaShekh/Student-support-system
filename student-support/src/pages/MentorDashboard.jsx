import React, { useState } from 'react';
import './MentorDashboard.css';

// ─── Static Data ─────────────────────────────────────────────────────────────
const MENTOR = {
  name: 'Dr. Anjali Sharma',
  title: 'Associate Professor – Computer Science',
  initials: 'AS',
};

const STATS = [
  { id: 1, icon: '🎓', label: 'Assigned Students', value: 24, trend: '+2 this month', trendUp: true, accent: '#4F7BE8' },
  { id: 2, icon: '💬', label: 'Pending Queries', value: 7, trend: '3 need urgent reply', trendUp: false, accent: '#F59E0B' },
  { id: 3, icon: '📅', label: 'Upcoming Meetings', value: 3, trend: 'Next: Apr 15', trendUp: true, accent: '#10B981' },
  { id: 4, icon: '📢', label: 'Notices Posted', value: 12, trend: '2 this week', trendUp: true, accent: '#8B5CF6' },
];

const STUDENTS = [
  { id: 1, name: 'Rahul Sharma', roll: '101CS24', dept: 'Computer Science', year: '1st Year', status: 'On Track', ini: 'RS', color: '#4F7BE8' },
  { id: 2, name: 'Priya Patel', roll: '102CS24', dept: 'Computer Science', year: '1st Year', status: 'Needs Attention', ini: 'PP', color: '#10B981' },
  { id: 3, name: 'Aman Verma', roll: '103EC24', dept: 'Electronics', year: '1st Year', status: 'At Risk', ini: 'AV', color: '#F59E0B' },
  { id: 4, name: 'Neha Singh', roll: '104ME24', dept: 'Mechanical Engg.', year: '1st Year', status: 'On Track', ini: 'NS', color: '#8B5CF6' },
  { id: 5, name: 'Rohan Gupta', roll: '105CE24', dept: 'Civil Engg.', year: '1st Year', status: 'On Track', ini: 'RG', color: '#EC4899' },
  { id: 6, name: 'Simran Kaur', roll: '106CS24', dept: 'Computer Science', year: '1st Year', status: 'Needs Attention', ini: 'SK', color: '#06B6D4' },
];

const QUERIES = [
  { id: 1, student: 'Rahul Sharma', ini: 'RS', color: '#4F7BE8', issue: 'Fee payment portal not responding', category: 'Admin', date: 'Apr 12, 2026', status: 'Pending' },
  { id: 2, student: 'Priya Patel', ini: 'PP', color: '#10B981', issue: 'Hostel room allocation conflict', category: 'Hostel', date: 'Apr 11, 2026', status: 'Resolved' },
  { id: 3, student: 'Aman Verma', ini: 'AV', color: '#F59E0B', issue: 'Unable to cope with academic stress', category: 'Academic', date: 'Apr 10, 2026', status: 'Pending' },
  { id: 4, student: 'Simran Kaur', ini: 'SK', color: '#06B6D4', issue: 'Library card has not been issued yet', category: 'Admin', date: 'Apr 09, 2026', status: 'Resolved' },
];

const MEETINGS = [
  { id: 1, student: 'Rahul Sharma', ini: 'RS', color: '#4F7BE8', date: 'Apr 15, 2026', time: '10:00 AM', type: 'One-on-One Check-in' },
  { id: 2, student: 'Priya Patel', ini: 'PP', color: '#10B981', date: 'Apr 16, 2026', time: '11:30 AM', type: 'Academic Review' },
  { id: 3, student: 'Aman Verma', ini: 'AV', color: '#F59E0B', date: 'Apr 17, 2026', time: '02:00 PM', type: 'Counseling Session' },
];

const NOTICES = [
  {
    id: 1,
    title: 'Orientation Programme Schedule Released',
    date: 'Apr 14, 2026',
    preview:
      "The final schedule for this semester's orientation has been announced. All mentors are expected to attend and guide their assigned students.",
  },
  {
    id: 2,
    title: 'Mid-Semester Feedback Form is Now Open',
    date: 'Apr 12, 2026',
    preview:
      'Please ensure all your assigned students complete the mid-semester feedback form on the portal before April 20th.',
  },
  {
    id: 3,
    title: 'Mentor-Mentee Session Guidelines Updated',
    date: 'Apr 10, 2026',
    preview:
      'New guidelines for conducting effective mentor-mentee sessions have been uploaded. Review before your next scheduled meeting.',
  },
];

const PROGRESS = [
  { name: 'Rahul Sharma', ini: 'RS', color: '#4F7BE8', profile: 100, orientation: true, mentorLinked: true, resolved: 70, overall: 85 },
  { name: 'Priya Patel', ini: 'PP', color: '#10B981', profile: 80, orientation: true, mentorLinked: true, resolved: 30, overall: 60 },
  { name: 'Aman Verma', ini: 'AV', color: '#F59E0B', profile: 60, orientation: false, mentorLinked: true, resolved: 20, overall: 40 },
  { name: 'Neha Singh', ini: 'NS', color: '#8B5CF6', profile: 100, orientation: true, mentorLinked: true, resolved: 90, overall: 92 },
];

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'students', label: 'Students', icon: '👥' },
  { id: 'queries', label: 'Queries', icon: '💬' },
  { id: 'meetings', label: 'Meetings', icon: '📅' },
  { id: 'notices', label: 'Notices', icon: '📢' },
  { id: 'profile', label: 'My Profile', icon: '👤' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const Av = ({ ini, color, size = 36 }) => (
  <div className="av" style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}>
    {ini}
  </div>
);

const Badge = ({ status }) => {
  const map = {
    'On Track': { cls: 'badge-green' },
    Pending: { cls: 'badge-orange' },
    'Needs Attention': { cls: 'badge-orange' },
    'At Risk': { cls: 'badge-red' },
    Resolved: { cls: 'badge-green' },
  };
  return <span className={`badge ${(map[status] || { cls: 'badge-gray' }).cls}`}>{status}</span>;
};

const CatPill = ({ cat }) => {
  const colors = { Admin: '#EEF2FF', Hostel: '#F0FDF4', Academic: '#FFF7ED' };
  const text = { Admin: '#3730A3', Hostel: '#15803D', Academic: '#C2410C' };

  return (
    <span className="cat-pill" style={{ background: colors[cat] || '#F3F4F6', color: text[cat] || '#374151' }}>
      {cat}
    </span>
  );
};

const ProgressBar = ({ value, color = '#4F7BE8' }) => (
  <div className="prog-track">
    <div className="prog-fill" style={{ width: `${value}%`, background: color }} />
  </div>
);

const CheckIcon = ({ ok }) => <span className={`check-icon ${ok ? 'check-ok' : 'check-no'}`}>{ok ? '✓' : '✗'}</span>;

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-brand">
        <span className="brand-icon">🎓</span>
        {!collapsed && (
          <div className="brand-copy">
            <span className="brand-text">MentorBridge</span>
            <span className="brand-sub">Mentor Console</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? 'nav-active' : ''}`}
            onClick={() => setActive(item.id)}
            title={collapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
            {item.id === 'queries' && !collapsed && <span className="nav-badge">7</span>}
          </button>
        ))}
      </nav>

      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '→' : '←'}
      </button>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="sf-mentor">
            <Av ini="AS" color="#4F7BE8" size={38} />
            <div>
              <div className="sf-name">Dr. Anjali Sharma</div>
              <div className="sf-role">Student Mentor</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── Topbar ──────────────────────────────────────────────────────────────────
function Topbar({ toggleSidebar }) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Search students, meetings, queries..." />
        </div>
      </div>

      <div className="topbar-right">
        <div className="notif-wrap">
          <button className="icon-btn" onClick={() => setNotifOpen(!notifOpen)}>
            🔔<span className="notif-dot" />
          </button>

          {notifOpen && (
            <div className="notif-panel">
              <div className="notif-header">Notifications</div>
              {[
                'Aman Verma submitted a new support query.',
                'Meeting with Priya Patel at 11:30 AM tomorrow.',
                'Orientation notice updated by admin office.',
              ].map((n, i) => (
                <div className="notif-item" key={i}>
                  <span className="notif-bullet">•</span>
                  <span>{n}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="icon-btn">⚙️</button>

        <div className="topbar-profile">
          <Av ini="AS" color="#4F7BE8" size={36} />
          <div className="tp-info">
            <div className="tp-name">{MENTOR.name}</div>
            <div className="tp-role">Mentor</div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-chip">Mentor Overview</div>
        <div className="hero-greeting">Good morning 👋</div>
        <h1 className="hero-title">Welcome back, Dr. Anjali Sharma</h1>
        <p className="hero-sub">
          Here’s a live overview of your assigned students, support requests, and scheduled mentor sessions for this
          week.
        </p>

        <div className="hero-highlight-row">
          <div className="hero-highlight">
            <strong>7</strong>
            <span>Pending queries</span>
          </div>
          <div className="hero-highlight">
            <strong>3</strong>
            <span>Upcoming meetings</span>
          </div>
          <div className="hero-highlight">
            <strong>85%</strong>
            <span>Student adaptation rate</span>
          </div>
        </div>

        <div className="hero-actions">
          <button className="btn btn-primary">👥 View Students</button>
          <button className="btn btn-outline">📅 Schedule Meeting</button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image-shell">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="Students in a mentoring session"
            className="hero-photo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="hero-image-overlay" />
        </div>

        <div className="hero-badge-float hero-badge-1">
          <span>📌</span> Mentor sessions on track
        </div>
        <div className="hero-badge-float hero-badge-2">
          <span>✅</span> 18 students active this week
        </div>
      </div>
    </section>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────
function StatsCards() {
  return (
    <div className="stats-grid">
      {STATS.map((s) => (
        <div className="stat-card" key={s.id}>
          <div className="stat-icon-wrap" style={{ background: `${s.accent}16` }}>
            <span className="stat-icon">{s.icon}</span>
          </div>
          <div className="stat-body">
            <div className="stat-value" style={{ color: s.accent }}>
              {s.value}
            </div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-trend ${s.trendUp ? 'trend-up' : 'trend-down'}`}>
              {s.trendUp ? '↑' : '↓'} {s.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Students ────────────────────────────────────────────────────────────────
function StudentsSection() {
  return (
    <section className="card-section" id="students">
      <div className="section-head">
        <div>
          <div className="section-title">Assigned Students</div>
          <div className="section-sub">6 of 24 shown · First-year intake overview</div>
        </div>
        <button className="btn btn-outline-sm">View All →</button>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No.</th>
              <th>Department</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map((s) => (
              <tr key={s.id} className="table-row">
                <td>
                  <div className="cell-user">
                    <Av ini={s.ini} color={s.color} size={36} />
                    <div className="cell-user-copy">
                      <span className="cell-name">{s.name}</span>
                      <span className="cell-sub">Mentor group A</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="cell-mono">{s.roll}</span>
                </td>
                <td>{s.dept}</td>
                <td>{s.year}</td>
                <td>
                  <Badge status={s.status} />
                </td>
                <td>
                  <div className="action-row">
                    <button className="tbl-btn tbl-btn-blue">Profile</button>
                    <button className="tbl-btn tbl-btn-green">Message</button>
                    <button className="tbl-btn tbl-btn-purple">Progress</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Queries ─────────────────────────────────────────────────────────────────
function QueriesSection() {
  return (
    <section className="card-section" id="queries">
      <div className="section-head">
        <div>
          <div className="section-title">Student Help Requests</div>
          <div className="section-sub">Recent concerns raised by your mentees</div>
        </div>
        <span className="pending-count">3 Pending</span>
      </div>

      <div className="query-list">
        {QUERIES.map((q) => (
          <div className={`query-card ${q.status === 'Pending' ? 'query-pending' : ''}`} key={q.id}>
            <div className="query-left">
              <Av ini={q.ini} color={q.color} size={40} />
              <div className="query-info">
                <div className="query-name">{q.student}</div>
                <div className="query-issue">{q.issue}</div>
                <div className="query-meta">
                  <CatPill cat={q.category} />
                  <span className="query-date">📅 {q.date}</span>
                </div>
              </div>
            </div>

            <div className="query-right">
              <Badge status={q.status} />
              <div className="qaction-row">
                {q.status === 'Pending' ? (
                  <button className="btn btn-primary-sm">Reply</button>
                ) : (
                  <button className="btn btn-gray-sm">View</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Meetings ────────────────────────────────────────────────────────────────
function MeetingsSection() {
  return (
    <section className="card-section" id="meetings">
      <div className="section-head">
        <div>
          <div className="section-title">Upcoming Meetings</div>
          <div className="section-sub">Scheduled mentor-student sessions</div>
        </div>
        <button className="btn btn-primary-sm">+ New Meeting</button>
      </div>

      <div className="meeting-grid">
        {MEETINGS.map((m) => (
          <div className="meeting-card" key={m.id}>
            <div className="meeting-top">
              <Av ini={m.ini} color={m.color} size={44} />
              <div className="meeting-info">
                <div className="meeting-name">{m.student}</div>
                <div className="meeting-type">{m.type}</div>
              </div>
            </div>

            <div className="meeting-meta">
              <div className="meta-item">
                <span>📅</span> {m.date}
              </div>
              <div className="meta-item">
                <span>🕐</span> {m.time}
              </div>
            </div>

            <div className="meeting-actions">
              <button className="btn btn-primary-sm">Join</button>
              <button className="btn btn-outline-sm">Reschedule</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Notices ─────────────────────────────────────────────────────────────────
function NoticesSection() {
  return (
    <section className="card-section" id="notices">
      <div className="section-head">
        <div>
          <div className="section-title">Notices & Announcements</div>
          <div className="section-sub">Latest communication from institution and administration</div>
        </div>
        <button className="btn btn-primary-sm">+ Add Notice</button>
      </div>

      <div className="notice-list">
        {NOTICES.map((n, i) => (
          <div className="notice-card" key={n.id}>
            <div className="notice-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="notice-body">
              <div className="notice-title">{n.title}</div>
              <div className="notice-preview">{n.preview}</div>
            </div>
            <div className="notice-right">
              <div className="notice-date">{n.date}</div>
              <button className="tbl-btn tbl-btn-blue">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Progress ────────────────────────────────────────────────────────────────
function ProgressSection() {
  return (
    <section className="card-section" id="progress">
      <div className="section-head">
        <div>
          <div className="section-title">Student Adaptation Progress</div>
          <div className="section-sub">Tracking how smoothly first-year students are settling in</div>
        </div>
      </div>

      <div className="progress-grid">
        {PROGRESS.map((p) => (
          <div className="progress-card" key={p.name}>
            <div className="prog-header">
              <Av ini={p.ini} color={p.color} size={42} />
              <div>
                <div className="prog-name">{p.name}</div>
                <div className="prog-overall-label">Overall Progress</div>
                <div className="prog-overall-val" style={{ color: p.color }}>
                  {p.overall}%
                </div>
              </div>
            </div>

            <ProgressBar value={p.overall} color={p.color} />

            <div className="prog-milestones">
              <div className="milestone">
                <CheckIcon ok={p.profile === 100} />
                <span>Profile Completed ({p.profile}%)</span>
              </div>
              <div className="milestone">
                <CheckIcon ok={p.mentorLinked} />
                <span>Mentor Connected</span>
              </div>
              <div className="milestone">
                <CheckIcon ok={p.orientation} />
                <span>Orientation Attended</span>
              </div>
              <div className="milestone">
                <CheckIcon ok={p.resolved >= 70} />
                <span>Issues Resolved ({p.resolved}%)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function MentorDashboard() {
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="md-root">
      <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`md-body ${collapsed ? 'md-body-collapsed' : ''}`}>
        <Topbar toggleSidebar={() => setCollapsed(!collapsed)} />

        <main className="md-main">
          <HeroSection />
          <StatsCards />
          <StudentsSection />

          <div className="two-col">
            <QueriesSection />
            <div className="col-right">
              <MeetingsSection />
              <NoticesSection />
            </div>
          </div>

          <ProgressSection />
        </main>
      </div>
    </div>
  );
}