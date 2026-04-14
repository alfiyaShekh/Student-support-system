import React, { useState } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const STUDENT = {
  name: 'Sakshi Verma',
  rollNo: '2024CS101',
  dept: 'Computer Science & Engineering',
  avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&crop=face',
};

const MENTOR = {
  name: 'Dr. Anjali Mehta',
  dept: 'Department of Computer Science',
  email: 'anjali.mehta@college.edu.in',
  phone: '+91 98765 43210',
  available: true,
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face',
  expertise: 'Academic Guidance, Career Planning',
  nextSlot: 'Tomorrow, 11:00 AM',
};

const NOTICES = [
  { id: 1, title: 'Orientation Programme Tomorrow', date: 'Apr 15, 2026', tag: 'Important', preview: 'All first-year students must attend the orientation in the main auditorium at 9:30 AM sharp.', tagC: '#FEF3C7', tagT: '#92400E' },
  { id: 2, title: 'Exam Form Submission Deadline', date: 'Apr 20, 2026', tag: 'Deadline', preview: 'Last date for submitting mid-semester examination forms is April 20. Visit the ERP portal now.', tagC: '#FEE2E2', tagT: '#991B1B' },
  { id: 3, title: 'Department Introduction Session', date: 'Apr 18, 2026', tag: 'Academic', preview: 'HOD will address all CS first-year students in Room 301. Attendance is mandatory.', tagC: '#EEF2FF', tagT: '#3730A3' },
  { id: 4, title: 'Library Card Registration Open', date: 'Apr 16, 2026', tag: 'Admin', preview: 'Students can now register for their library access card at the Central Library counter.', tagC: '#E2F3EC', tagT: '#166534' },
];

const EVENTS = [
  { id: 1, name: "Fresher's Welcome Night", date: 'Apr 17', time: '5:00 PM', location: 'College Amphitheatre', icon: '🎉', accent: '#2563EB', img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=200&fit=crop' },
  { id: 2, name: 'Department Orientation Talk', date: 'Apr 15', time: '9:30 AM', location: 'Main Auditorium', icon: '🎓', accent: '#2563EB', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=200&fit=crop' },
  { id: 3, name: 'Coding Club Introductory Meet', date: 'Apr 19', time: '3:00 PM', location: 'CS Seminar Hall', icon: '💻', accent: '#2563EB', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=200&fit=crop' },
];

const QUICK_ACTIONS = [
  { id: 1, icon: '👤', title: 'My Mentor', desc: 'View profile & book a session', icBg: '#EEF2FF', ic: '#4338CA' },
  { id: 2, icon: '🆘', title: 'Ask for Help', desc: 'Raise a query or report an issue', icBg: '#FFF7ED', ic: '#C2410C' },
  { id: 3, icon: '📢', title: 'Notices', desc: 'Check latest announcements', icBg: '#F5F3FF', ic: '#6D28D9' },
  { id: 4, icon: '📅', title: 'Events', desc: 'Upcoming college activities', icBg: '#EEF6FF', ic: '#1D4ED8' },
  { id: 5, icon: '📚', title: 'Resources', desc: 'Guides, forms & academic materials', icBg: '#F8FAFC', ic: '#334155' },
];

const PROGRESS_ITEMS = [
  { id: 1, label: 'Profile Completed', done: true },
  { id: 2, label: 'Mentor Assigned', done: true },
  { id: 3, label: 'Orientation Attended', done: false },
  { id: 4, label: 'Library Card Issued', done: false },
  { id: 5, label: 'ERP Portal Activated', done: true },
  { id: 6, label: 'First Query Resolved', done: false },
];

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'mentor', label: 'My Mentor', icon: '👤' },
  { id: 'notices', label: 'Notices', icon: '📢', badge: 2 },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'help', label: 'Help', icon: '🆘' },
  { id: 'profile', label: 'Profile', icon: '🎓' },
];

const CATEGORIES = ['Academic Issue', 'Campus / Hostel', 'Personal Wellbeing', 'Financial / Fee', 'Technical / ERP', 'Other'];

const SIDEBAR_W = 240;
const SIDEBAR_WC = 70;
const TOPBAR_H = 64;

// ─── Shared Styles ───────────────────────────────────────────────────────────
const cardStyle = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: 20,
  boxShadow: '0 6px 20px rgba(15,23,42,0.05)',
};

const sectionTitleStyle = {
  fontSize: 15,
  fontWeight: 700,
  color: '#0F172A',
};

const sectionSubStyle = {
  fontSize: 11.5,
  color: '#94A3B8',
  marginTop: 2,
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  const done = PROGRESS_ITEMS.filter((p) => p.done).length;
  const pct = Math.round((done / PROGRESS_ITEMS.length) * 100);
  const w = collapsed ? SIDEBAR_WC : SIDEBAR_W;

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: w,
        height: '100vh',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid #EAF0F6',
        boxShadow: '4px 0 20px rgba(15,23,42,0.04)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        transition: 'width 0.3s ease',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '0 14px',
          height: TOPBAR_H,
          borderBottom: '1px solid #EEF2F7',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 12,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          SB
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
              StudentBridge
            </div>
            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>Student Support Portal</div>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 3, overflow: 'hidden' }}>
        {NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              title={collapsed ? item.label : ''}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 12,
                background: isActive ? '#EFF6FF' : 'transparent',
                color: isActive ? '#2563EB' : '#64748B',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'background 0.15s, color 0.15s',
                position: 'relative',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.color = '#1E293B';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#64748B';
                }
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 8,
                    bottom: 8,
                    width: 3,
                    background: '#2563EB',
                    borderRadius: '0 4px 4px 0',
                  }}
                />
              )}
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
              {!collapsed && item.badge && (
                <span style={{ background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 20 }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: '#F1F5F9',
          color: '#64748B',
          border: 'none',
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 700,
          margin: '0 auto 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {collapsed ? '→' : '←'}
      </button>

      {!collapsed && (
        <div style={{ padding: '0 12px 16px', borderTop: '1px solid #EEF2F7', paddingTop: 12, flexShrink: 0 }}>
          <div style={{ background: '#F8FAFC', borderRadius: 14, padding: 12, border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <img
                src={STUDENT.avatar}
                alt="student"
                style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid #DBEAFE', flexShrink: 0 }}
              />
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {STUDENT.name}
                </div>
                <div style={{ fontSize: 10, color: '#94A3B8' }}>1st Year · CS&E</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748B', marginBottom: 5 }}>
              <span>Onboarding Progress</span>
              <span style={{ fontWeight: 700, color: '#2563EB' }}>{pct}%</span>
            </div>
            <div style={{ width: '100%', height: 5, background: '#E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: '#2563EB', borderRadius: 10, transition: 'width 0.6s ease' }} />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ collapsed }) {
  const [notif, setNotif] = useState(false);
  const left = collapsed ? SIDEBAR_WC : SIDEBAR_W;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left,
        right: 0,
        height: TOPBAR_H,
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #EAF0F6',
        boxShadow: '0 1px 8px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 22px',
        zIndex: 90,
        transition: 'left 0.3s ease',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          padding: '0 14px',
          height: 38,
          width: 280,
        }}
      >
        <span style={{ color: '#94A3B8', fontSize: 14 }}>🔍</span>
        <input placeholder="Search notices, events…" style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: '#475569', width: '100%' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotif(!notif)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              cursor: 'pointer',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            🔔
            <span style={{ position: 'absolute', top: 7, right: 7, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', border: '2px solid #fff' }} />
          </button>

          {notif && (
            <div
              style={{
                position: 'absolute',
                top: 46,
                right: 0,
                width: 290,
                background: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: 16,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                zIndex: 200,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Notifications</span>
                <span style={{ fontSize: 10, background: '#FEE2E2', color: '#991B1B', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>2 New</span>
              </div>

              {[
                { msg: 'Orientation Programme is tomorrow at 9:30 AM.', time: '2h ago', unread: true },
                { msg: 'Dr. Anjali confirmed your meeting for Apr 16.', time: '5h ago', unread: true },
                { msg: 'Library card registration is now open.', time: '1d ago', unread: false },
              ].map((n, i) => (
                <div
                  key={i}
                  style={{
                    padding: '11px 16px',
                    borderBottom: '1px solid #F8FAFC',
                    background: n.unread ? '#F8FBFF' : '#fff',
                    display: 'flex',
                    gap: 10,
                    cursor: 'pointer',
                    fontSize: 12.5,
                    color: '#475569',
                  }}
                >
                  <span style={{ marginTop: 4, width: 6, height: 6, borderRadius: '50%', background: n.unread ? '#2563EB' : '#CBD5E1', flexShrink: 0 }} />
                  <div>
                    <div>{n.msg}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            cursor: 'pointer',
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ⚙️
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 14px 6px 6px',
            borderRadius: 50,
            border: '1px solid #E2E8F0',
            background: '#F8FAFC',
            cursor: 'pointer',
          }}
        >
          <img src={STUDENT.avatar} alt="student" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '2px solid #DBEAFE' }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', lineHeight: 1.2 }}>{STUDENT.name}</div>
            <div style={{ fontSize: 10, color: '#94A3B8' }}>{STUDENT.rollNo}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <div
      style={{
        ...cardStyle,
        background: 'linear-gradient(135deg, #F7FAFF 0%, #F8FBFF 60%, #FFFFFF 100%)',
        border: '1px solid #DCE8F7',
        padding: '34px 38px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 28,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 220,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -50,
          width: 240,
          height: 240,
          background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 540 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: '#EFF6FF',
            color: '#1D4ED8',
            fontSize: 11,
            fontWeight: 600,
            padding: '5px 13px',
            borderRadius: 50,
            marginBottom: 14,
          }}
        >
          <span style={{ width: 6, height: 6, background: '#22C55E', borderRadius: '50%' }} />
          Student dashboard
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', lineHeight: 1.22, letterSpacing: '-0.5px', marginBottom: 10 }}>
          Hello, Sakshi 👋
        </h1>

        <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, marginBottom: 20, maxWidth: 460 }}>
          Let’s make your college journey <strong style={{ color: '#334155' }}>smooth and stress-free</strong>. Your mentor support, notices, events, and help requests are all here in one place.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
          {[
            { icon: '👤', label: 'Mentor Assigned', bg: '#F8FAFC', tc: '#334155', bd: '#E2E8F0' },
            { icon: '📢', label: '2 New Notices', bg: '#FFF7ED', tc: '#92400E', bd: '#FED7AA' },
            { icon: '📅', label: '1 Upcoming Event', bg: '#F0FDF4', tc: '#166534', bd: '#BBF7D0' },
          ].map((c) => (
            <span
              key={c.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: c.bg,
                color: c.tc,
                border: `1px solid ${c.bd}`,
                fontSize: 12,
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: 50,
              }}
            >
              {c.icon} {c.label}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <button
            style={{
              background: '#2563EB',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              padding: '11px 22px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(37,99,235,0.24)',
            }}
          >
            👤 View Mentor
          </button>

          <button
            style={{
              background: '#fff',
              color: '#334155',
              fontWeight: 600,
              fontSize: 13,
              padding: '11px 20px',
              borderRadius: 12,
              border: '1px solid #E2E8F0',
              cursor: 'pointer',
            }}
          >
            🆘 Ask for Help
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <div
          style={{
            width: 320,
            height: 210,
            borderRadius: 22,
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
            boxShadow: '0 14px 32px rgba(15,23,42,0.12)',
            background: '#fff',
            position: 'relative',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&h=500&fit=crop"
            alt="students"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.9)' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,0.18), rgba(15,23,42,0.04))',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: -12,
            left: 14,
            background: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: '8px 13px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.10)',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: 11,
            fontWeight: 600,
            color: '#1E293B',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 7, height: 7, background: '#22C55E', borderRadius: '50%' }} /> Mentor available tomorrow
        </div>
      </div>
    </div>
  );
}

// ─── Quick Actions ────────────────────────────────────────────────────────────
function QuickActions() {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
        Quick Actions
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        {QUICK_ACTIONS.map((a) => (
          <button
            key={a.id}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 18,
              padding: 18,
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 4px 14px rgba(15,23,42,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(15,23,42,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(15,23,42,0.04)';
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                background: a.icBg,
                color: a.ic,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 14,
              }}
            >
              {a.icon}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>{a.title}</div>
            <div style={{ fontSize: 11.5, color: '#64748B', lineHeight: 1.5 }}>{a.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Mentor Card ──────────────────────────────────────────────────────────────
function MentorCard() {
  return (
    <div style={{ ...cardStyle, overflow: 'hidden' }}>
      <div style={{ height: 72, background: 'linear-gradient(135deg, #2563EB, #3B82F6)', position: 'relative' }}>
        <img
          src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&h=100&fit=crop"
          alt="banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.16, mixBlendMode: 'overlay' }}
        />
      </div>

      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ marginTop: -32, marginBottom: 14, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <img
            src={MENTOR.avatar}
            alt={MENTOR.name}
            style={{ width: 64, height: 64, borderRadius: 16, objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}
          />

          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 50,
              background: MENTOR.available ? '#ECFDF5' : '#F8FAFC',
              color: MENTOR.available ? '#166534' : '#64748B',
              border: `1px solid ${MENTOR.available ? '#BBF7D0' : '#E2E8F0'}`,
            }}
          >
            {MENTOR.available ? '🟢 Available' : '🔴 Busy'}
          </span>
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{MENTOR.name}</div>
        <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 2, marginBottom: 14 }}>{MENTOR.dept}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {[
            { icon: '📧', text: MENTOR.email },
            { icon: '📞', text: MENTOR.phone },
            { icon: '🏷️', text: MENTOR.expertise },
            { icon: '📅', text: `Next slot: ${MENTOR.nextSlot}`, green: true },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: r.green ? '#166534' : '#64748B', fontWeight: r.green ? 600 : 400 }}>
              <span>{r.icon}</span>
              {r.text}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: 1, background: '#2563EB', color: '#fff', fontWeight: 700, fontSize: 12.5, padding: '10px 0', borderRadius: 12, border: 'none', cursor: 'pointer' }}>
            💬 Chat
          </button>
          <button
            style={{
              flex: 1,
              background: '#F8FAFC',
              color: '#2563EB',
              fontWeight: 700,
              fontSize: 12.5,
              padding: '10px 0',
              borderRadius: 12,
              border: '1px solid #DBEAFE',
              cursor: 'pointer',
            }}
          >
            📅 Book Meeting
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Events ───────────────────────────────────────────────────────────────────
function EventsSection() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={sectionTitleStyle}>Upcoming Events</div>
        <button style={{ fontSize: 12, color: '#2563EB', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {EVENTS.map((e) => (
          <div
            key={e.id}
            style={{
              ...cardStyle,
              borderRadius: 18,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={(ev) => {
              ev.currentTarget.style.transform = 'translateY(-3px)';
              ev.currentTarget.style.boxShadow = '0 10px 24px rgba(15,23,42,0.08)';
            }}
            onMouseLeave={(ev) => {
              ev.currentTarget.style.transform = 'translateY(0)';
              ev.currentTarget.style.boxShadow = '0 6px 20px rgba(15,23,42,0.05)';
            }}
          >
            <div style={{ position: 'relative', height: 110, overflow: 'hidden' }}>
              <img src={e.img} alt={e.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.88)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.42), rgba(15,23,42,0.08))' }} />
              <div style={{ position: 'absolute', top: 10, left: 10 }}>
                <span style={{ background: 'rgba(255,255,255,0.94)', color: '#1E293B', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 50 }}>
                  {e.icon} {e.date}
                </span>
              </div>
            </div>

            <div style={{ padding: '12px 14px 14px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6, lineHeight: 1.3 }}>{e.name}</div>
              <div style={{ display: 'flex', gap: 14, fontSize: 11.5, color: '#64748B', marginBottom: 10, flexWrap: 'wrap' }}>
                <span>🕐 {e.time}</span>
                <span>📍 {e.location}</span>
              </div>

              <button
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  color: '#2563EB',
                  fontWeight: 700,
                  fontSize: 12,
                  padding: '8px 0',
                  borderRadius: 10,
                  border: '1px solid #DBEAFE',
                  cursor: 'pointer',
                }}
              >
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Notices ──────────────────────────────────────────────────────────────────
function NoticesPanel() {
  return (
    <div style={{ ...cardStyle, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
        <div>
          <div style={sectionTitleStyle}>Notices &amp; Announcements</div>
          <div style={sectionSubStyle}>Latest from your institution</div>
        </div>
        <button style={{ fontSize: 12, color: '#2563EB', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
      </div>

      {NOTICES.map((n) => (
        <div
          key={n.id}
          style={{ padding: '14px 20px', borderBottom: '1px solid #F8FAFC', cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F8FAFC';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 3, minHeight: 48, borderRadius: 4, background: '#DBEAFE', flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, padding: '3px 10px', borderRadius: 50, background: n.tagC, color: n.tagT }}>{n.tag}</span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>{n.date}</span>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>{n.title}</div>
              <div
                style={{
                  fontSize: 12,
                  color: '#64748B',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {n.preview}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Help Form ────────────────────────────────────────────────────────────────
function HelpSection() {
  const [form, setForm] = useState({ title: '', category: '', desc: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ title: '', category: '', desc: '' });
    }, 3000);
  };

  const inputStyle = {
    width: '100%',
    border: '1px solid #E2E8F0',
    borderRadius: 12,
    padding: '10px 14px',
    fontSize: 13,
    color: '#334155',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    background: '#FAFAFA',
  };

  return (
    <div style={{ ...cardStyle, overflow: 'hidden' }}>
      <div
        style={{
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            background: '#FFF7ED',
            border: '1px solid #FED7AA',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}
        >
          🆘
        </div>
        <div>
          <div style={sectionTitleStyle}>Raise a Help Request</div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Describe your issue and we’ll help you promptly.</div>
        </div>
      </div>

      <form onSubmit={submit} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 0', gap: 10 }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>✅</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>Request Submitted!</div>
            <div style={{ fontSize: 13, color: '#64748B', textAlign: 'center' }}>Your mentor or support team will respond within 24 hours.</div>
          </div>
        ) : (
          <>
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Issue Title</label>
              <input type="text" placeholder="e.g. I'm struggling with the fee portal" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} required />
            </div>

            <div>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }} required>
                <option value="">Select a category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Describe Your Issue</label>
              <textarea
                rows={4}
                placeholder="Please describe what you're facing in detail. The more you share, the better we can help."
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                background: '#2563EB',
                color: '#fff',
                fontWeight: 700,
                fontSize: 13.5,
                padding: '13px 0',
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37,99,235,0.22)',
                letterSpacing: '0.01em',
              }}
            >
              Submit Help Request
            </button>
          </>
        )}
      </form>
    </div>
  );
}

// ─── Progress ─────────────────────────────────────────────────────────────────
function ProgressSection() {
  const done = PROGRESS_ITEMS.filter((p) => p.done).length;
  const pct = Math.round((done / PROGRESS_ITEMS.length) * 100);

  return (
    <div style={{ ...cardStyle, padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={sectionTitleStyle}>Onboarding Progress</div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 3 }}>Complete these steps to settle into college life</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#2563EB', lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
            {done}/{PROGRESS_ITEMS.length} done
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: 10, background: '#E2E8F0', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: '#2563EB', borderRadius: 10, transition: 'width 0.7s ease' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {PROGRESS_ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '11px 14px',
              borderRadius: 14,
              background: item.done ? '#F0FDF4' : '#F8FAFC',
              border: `1px solid ${item.done ? '#BBF7D0' : '#E2E8F0'}`,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
                background: item.done ? '#22C55E' : '#E2E8F0',
                color: item.done ? '#fff' : '#94A3B8',
              }}
            >
              {item.done ? '✓' : '○'}
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: item.done ? '#166534' : '#64748B', flex: 1 }}>{item.label}</span>
            {!item.done && <span style={{ fontSize: 11, color: '#F59E0B', fontWeight: 600 }}>Pending</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function StudentDashboard() {
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const sideW = collapsed ? SIDEBAR_WC : SIDEBAR_W;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(37,99,235,0.05), transparent 22%), linear-gradient(180deg, #F8FAFC 0%, #F4F7FB 100%)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />

      <div style={{ flex: 1, marginLeft: sideW, transition: 'margin-left 0.3s ease', minWidth: 0 }}>
        <Topbar collapsed={collapsed} />

        <main style={{ marginTop: TOPBAR_H, padding: '28px 28px 64px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <HeroSection />
          <QuickActions />

          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24, alignItems: 'start' }}>
            <MentorCard />
            <EventsSection />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24, alignItems: 'start' }}>
            <NoticesPanel />
            <HelpSection />
          </div>

          <ProgressSection />
        </main>
      </div>
    </div>
  );
}