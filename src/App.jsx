import { useState } from "react";
import {
  LayoutDashboard, Rss, Sparkles, Compass, Clock, Bookmark, Settings as SettingsIcon,
  Search, Bell, Share2, MessageCircle, Image as ImageIcon, ChevronRight, LogOut,
  Moon, Trash2, ArrowRight, Rocket, AlertTriangle, Megaphone, Users, Menu, X,
  FileText, Code2, GraduationCap, Briefcase, CheckCircle2, MapPin, Wifi, BookOpen
} from "lucide-react";

/* ----------------------------- Mock data ----------------------------- */

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "feed", label: "Feed", icon: Rss },
  { key: "missed", label: "What you missed", icon: Sparkles, badge: 6 },
  { key: "opportunities", label: "Opportunities", icon: Compass },
  { key: "deadlines", label: "Deadlines", icon: Clock },
  { key: "saved", label: "Saved", icon: Bookmark },
];

const CATEGORY_STYLES = {
  Hackathon: { pill: "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30", bar: "bg-violet-500", icon: Code2 },
  Internship: { pill: "bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/30", bar: "bg-blue-500", icon: Briefcase },
  Scholarship: { pill: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30", bar: "bg-emerald-500", icon: GraduationCap },
  Competition: { pill: "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/30", bar: "bg-orange-500", icon: Rocket },
  Workshop: { pill: "bg-pink-500/15 text-pink-300 ring-1 ring-pink-500/30", bar: "bg-pink-500", icon: Users },
  Academic: { pill: "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30", bar: "bg-sky-500", icon: FileText },
  Important: { pill: "bg-red-500/15 text-red-300 ring-1 ring-red-500/30", bar: "bg-red-500", icon: AlertTriangle },
};

const URGENCY_STYLES = {
  Urgent: "bg-red-500/15 text-red-300 ring-1 ring-red-500/30",
  Upcoming: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30",
  Later: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30",
};

const OPPORTUNITIES = [
  { id: 1, type: "Hackathon", title: "Google Student Hackathon 2026", org: "Google for Developers", loc: "Online", left: "4 days left", meta: "2,340 applied" },
  { id: 2, type: "Internship", title: "Frontend Intern — Razorpay", org: "Razorpay", loc: "Bengaluru / Remote", left: "12 days left", meta: "12 spots" },
  { id: 3, type: "Scholarship", title: "Merit-cum-Means Scholarship", org: "University Financial Aid Office", loc: "Application only", left: "9 days left", meta: "Covers 75% tuition" },
  { id: 4, type: "Competition", title: "Competitive Programming Contest", org: "ACM Student Chapter", loc: "On-campus", left: "6 days left", meta: "Cash prizes" },
  { id: 5, type: "Workshop", title: "Frontend Development Workshop", org: "Coding Club", loc: "Room 204", left: "2 days left", meta: "60 seats" },
  { id: 6, type: "Internship", title: "Data Science Intern — Zomato", org: "Zomato", loc: "Gurugram", left: "18 days left", meta: "5 spots" },
  { id: 7, type: "Hackathon", title: "Smart India Hackathon — Campus Round", org: "AICTE", loc: "Hybrid", left: "10 days left", meta: "Team of 6" },
  { id: 8, type: "Scholarship", title: "Women in STEM Grant", org: "Tech for Good Foundation", loc: "Application only", left: "14 days left", meta: "₹50,000 grant" },
];

const FEED = [
  {
    id: 1, type: "Hackathon", tag2: "Important", time: "1h ago", banner: true,
    title: "AI Hackathon 2026 — registrations now open",
    body: "Build with generative AI over 36 hours. Open to all years, teams of up to 4. Winners get direct interview slots with sponsor companies.",
    cta: "View details",
  },
  {
    id: 2, type: "Academic", time: "3h ago",
    title: "Design Thinking assignment — submission guidelines",
    body: "Submit your final case-study report as a single PDF via the portal. Late submissions will not be accepted after the grace period.",
    cta: "View details",
  },
  {
    id: 3, type: "Workshop", time: "Yesterday",
    title: "Frontend Development Workshop — React fundamentals",
    body: "A hands-on session by the coding club covering components, state, and hooks. Laptops required. Limited to 60 seats.",
    cta: "Register",
  },
  {
    id: 4, type: "Scholarship", time: "2 days ago",
    title: "Merit-cum-Means Scholarship applications open",
    body: "Eligible students with family income under 6 LPA and CGPA above 7.5 can apply. Requires income certificate and latest transcript.",
    cta: "View details",
  },
];

const DEADLINES = [
  { id: 1, urgency: "Urgent", title: "Design Thinking assignment submission", meta: "Academic · Design Studio course", left: "1 day left", date: "Tomorrow, 11:59 PM" },
  { id: 2, urgency: "Urgent", title: "Semester fee payment", meta: "Academic office", left: "2 days left", date: "Mon, 11 Aug" },
  { id: 3, urgency: "Upcoming", title: "Google Student Hackathon registration", meta: "Hackathon · Google for Developers", left: "4 days left", date: "Wed, 13 Aug" },
  { id: 4, urgency: "Upcoming", title: "Competitive Programming Contest — team entry", meta: "Competition · ACM chapter", left: "6 days left", date: "Fri, 15 Aug" },
  { id: 5, urgency: "Later", title: "Merit-cum-Means Scholarship form", meta: "Scholarship · Financial aid office", left: "9 days left", date: "Mon, 18 Aug" },
  { id: 6, urgency: "Later", title: "Data Science internship application", meta: "Internship · Zomato", left: "18 days left", date: "Wed, 27 Aug" },
];

const IMPORTANT_UPDATES = [
  { id: 1, title: "Semester fee payment deadline moved up", body: "Payment is now due 5 days earlier than originally scheduled. Late payment adds a ₹500 fine.", tag: "Urgent", src: "Academic office", time: "2h ago", icon: AlertTriangle },
  { id: 2, title: "Mid-term exam hall allocation released", body: "Check your seat number and hall before Monday. Allocations changed from last semester's pattern.", tag: "Academic", src: "Exam cell", time: "5h ago", icon: Megaphone },
];

/* ----------------------------- Small bits ----------------------------- */

function Pill({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

function IconBadge({ Icon, className = "" }) {
  return (
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${className}`}>
      <Icon className="h-4 w-4" />
    </div>
  );
}

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-400">{eyebrow}</p>}
      <h1 className="text-2xl font-bold tracking-tight text-neutral-50 sm:text-3xl">{title}</h1>
      {sub && <p className="mt-1.5 text-sm text-neutral-400">{sub}</p>}
    </div>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-950/40 transition hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ----------------------------- Shell ----------------------------- */

function Logo() {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-bold text-white shadow-lg shadow-violet-950/40">
        AB
      </div>
      <div>
        <p className="text-sm font-bold leading-none text-neutral-50">ABTalks</p>
        <p className="mt-1 text-[11px] leading-none text-neutral-500">Student hub</p>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  const content = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <Logo />
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = page === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => { setPage(item.key); setMobileOpen(false); }}
                className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active ? "bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20" : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${active ? "text-violet-400" : "text-neutral-500 group-hover:text-neutral-300"}`} />
                  {item.label}
                </span>
                {item.badge ? (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
        <div className="mt-6 border-t border-neutral-800 pt-2">
          <button
            onClick={() => { setPage("settings"); setMobileOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              page === "settings" ? "bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20" : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
            }`}
          >
            <SettingsIcon className="h-4 w-4 text-neutral-500" />
            Settings
          </button>
        </div>
      </div>

      <button
        onClick={() => { setPage("settings"); setMobileOpen(false); }}
        className="flex items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-neutral-900"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-xs font-bold text-white">
          AR
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-100">Aditi Rao</p>
          <p className="truncate text-xs text-neutral-500">CS · Year 3</p>
        </div>
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden w-60 shrink-0 border-r border-neutral-800 bg-neutral-950 p-4 md:flex">
        {content}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 flex w-64 flex-col border-r border-neutral-800 bg-neutral-950 p-4">
            <button className="absolute right-3 top-3 text-neutral-400" onClick={() => setMobileOpen(false)}>
              <X className="h-5 w-5" />
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}

function TopBar({ setMobileOpen }) {
  return (
    <div className="flex items-center gap-3 border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 backdrop-blur sm:px-6">
      <button className="text-neutral-400 md:hidden" onClick={() => setMobileOpen(true)}>
        <Menu className="h-5 w-5" />
      </button>
      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <input
          placeholder="Search updates, opportunities, deadlines..."
          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 py-2 pl-9 pr-3 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="relative rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-neutral-400 hover:text-neutral-100">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-pink-500" />
        </button>
        <button className="rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-neutral-400 hover:text-neutral-100">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ----------------------------- Cards ----------------------------- */

function OpportunityCard({ item }) {
  const style = CATEGORY_STYLES[item.type] || CATEGORY_STYLES.Academic;
  return (
    <div className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition hover:border-neutral-700">
      <div className={`h-1 w-full ${style.bar}`} />
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <Pill className={style.pill}>{item.type}</Pill>
          <button className="text-neutral-600 transition hover:text-violet-400">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mb-1 text-[15px] font-semibold leading-snug text-neutral-50">{item.title}</h3>
        <p className="text-sm text-neutral-400">{item.org}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
          <MapPin className="h-3 w-3" /> {item.loc}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-3">
          <Pill className="bg-neutral-800 text-amber-300">{item.left}</Pill>
          <span className="text-xs text-neutral-500">{item.meta}</span>
        </div>
      </div>
    </div>
  );
}

function FeedCard({ item }) {
  const style = CATEGORY_STYLES[item.type] || CATEGORY_STYLES.Academic;
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Pill className={style.pill}>{item.type}</Pill>
        {item.tag2 && <Pill className={CATEGORY_STYLES.Important.pill}>{item.tag2}</Pill>}
        <span className="ml-auto text-xs text-neutral-500">{item.time}</span>
      </div>
      <h3 className="mb-1.5 text-base font-semibold text-neutral-50">{item.title}</h3>
      <p className="text-sm leading-relaxed text-neutral-400">{item.body}</p>

      {item.banner && (
        <div className="mt-4 flex h-32 items-center justify-center rounded-lg border border-dashed border-neutral-800 bg-neutral-950 text-neutral-600 sm:h-40">
          <ImageIcon className="mr-2 h-4 w-4" /> Event banner
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-neutral-500">
          <button className="flex items-center gap-1.5 text-xs transition hover:text-violet-400"><Bookmark className="h-4 w-4" /></button>
          <button className="flex items-center gap-1.5 text-xs transition hover:text-violet-400"><Share2 className="h-4 w-4" /></button>
          <button className="flex items-center gap-1.5 text-xs transition hover:text-violet-400"><MessageCircle className="h-4 w-4" /></button>
        </div>
        <button className="rounded-lg border border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:border-violet-500/60 hover:text-violet-300">
          {item.cta}
        </button>
      </div>
    </div>
  );
}

function DeadlineRow({ d }) {
  const barColor = d.urgency === "Urgent" ? "bg-red-500" : d.urgency === "Upcoming" ? "bg-amber-500" : "bg-emerald-500";
  const textColor = d.urgency === "Urgent" ? "text-red-400" : d.urgency === "Upcoming" ? "text-amber-400" : "text-emerald-400";
  return (
    <div className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <div className={`h-10 w-1 shrink-0 rounded-full ${barColor}`} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-neutral-50">{d.title}</p>
        <p className="truncate text-xs text-neutral-500">{d.meta}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className={`text-sm font-semibold ${textColor}`}>{d.left}</p>
        <p className="text-xs text-neutral-500">{d.date}</p>
      </div>
    </div>
  );
}

/* ----------------------------- Pages ----------------------------- */

function DashboardPage({ setPage }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-50 sm:text-3xl">Welcome back, Aditi 👋</h1>
          <p className="mt-1 text-sm text-neutral-400">Here's what needs your attention today.</p>
        </div>
        <div className="flex gap-6">
          {[["6", "Missed"], ["3", "Due soon"], ["12", "Saved"]].map(([n, l]) => (
            <div key={l} className="text-right">
              <p className="text-xl font-bold text-neutral-50">{n}</p>
              <p className="text-xs text-neutral-500">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-pink-500/5 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-base font-semibold text-neutral-50">You missed 6 updates while you were away</p>
            <p className="mt-1 text-sm text-neutral-400">Last visit: 3 days ago</p>
          </div>
          <PrimaryButton onClick={() => setPage("missed")}>
            Review all <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { n: 2, l: "Important updates", Icon: AlertTriangle, c: "text-red-400" },
            { n: 2, l: "Upcoming deadlines", Icon: Clock, c: "text-amber-400" },
            { n: 2, l: "New opportunities", Icon: Rocket, c: "text-emerald-400" },
          ].map(({ n, l, Icon, c }) => (
            <div key={l} className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
              <Icon className={`mb-2 h-4 w-4 ${c}`} />
              <p className="text-xl font-bold text-neutral-50">{n}</p>
              <p className="text-xs text-neutral-500">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-200">Important updates</h2>
              <button onClick={() => setPage("missed")} className="text-xs font-medium text-violet-400 hover:text-violet-300">See all</button>
            </div>
            <div className="space-y-3">
              {IMPORTANT_UPDATES.map((u) => (
                <div key={u.id} className="flex gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
                  <IconBadge Icon={u.icon} className="bg-red-500/10 text-red-400" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-50">{u.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-neutral-400">{u.body}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <Pill className={CATEGORY_STYLES[u.tag === "Urgent" ? "Important" : "Academic"].pill}>{u.tag}</Pill>
                      <span className="text-neutral-500">{u.src} · {u.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-200">Recommended opportunities</h2>
              <button onClick={() => setPage("opportunities")} className="text-xs font-medium text-violet-400 hover:text-violet-300">See all</button>
            </div>
            <div className="space-y-3">
              {OPPORTUNITIES.slice(0, 3).map((o) => {
                const style = CATEGORY_STYLES[o.type];
                const Icon = style.icon;
                return (
                  <div key={o.id} className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
                    <IconBadge Icon={Icon} className={`${style.pill} bg-opacity-20`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-50">{o.title}</p>
                      <p className="mt-0.5 text-xs text-neutral-500">
                        <span className={`mr-1 font-medium ${style.pill.includes("violet") ? "text-violet-300" : ""}`}>{o.type}</span>
                        · {o.left}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-neutral-600" />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-neutral-200">Quick actions</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { l: "Explore opportunities", Icon: Compass, p: "opportunities" },
                { l: "View deadlines", Icon: Clock, p: "deadlines" },
                { l: "Saved items", Icon: Bookmark, p: "saved" },
                { l: "Search", Icon: Search, p: "feed" },
              ].map(({ l, Icon, p }) => (
                <button
                  key={l}
                  onClick={() => setPage(p)}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-center transition hover:border-violet-500/40 hover:bg-neutral-800/60"
                >
                  <Icon className="h-4 w-4 text-violet-400" />
                  <span className="text-xs font-medium text-neutral-300">{l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-200">
              <Clock className="h-4 w-4 text-amber-400" /> Upcoming deadlines
            </h2>
            <div className="space-y-3">
              {[
                { t: "Design Thinking assignment", s: "Due tomorrow, 11:59 PM", c: "bg-red-500" },
                { t: "Hackathon registration closes", s: "In 4 days", c: "bg-amber-500" },
                { t: "Scholarship form submission", s: "In 9 days", c: "bg-emerald-500" },
              ].map((d) => (
                <div key={d.t} className="flex items-start gap-2.5">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${d.c}`} />
                  <div>
                    <p className="text-sm font-medium text-neutral-200">{d.t}</p>
                    <p className="text-xs text-neutral-500">{d.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-200">
              <Users className="h-4 w-4 text-violet-400" /> This week
            </h2>
            <div className="space-y-3">
              {[
                { t: "3 hackathons open for registration", s: "Across campus + national" },
                { t: "2 workshops on frontend dev", s: "Coding club" },
              ].map((d) => (
                <div key={d.t} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  <div>
                    <p className="text-sm font-medium text-neutral-200">{d.t}</p>
                    <p className="text-xs text-neutral-500">{d.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-200">
              <Megaphone className="h-4 w-4 text-pink-400" /> Recent announcements
            </h2>
            <div className="space-y-3">
              {[
                { t: "Library timings extended for exams", s: "1h ago" },
                { t: "Campus Wi-Fi maintenance tonight", s: "6h ago" },
              ].map((d) => (
                <div key={d.t} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                  <div>
                    <p className="text-sm font-medium text-neutral-200">{d.t}</p>
                    <p className="text-xs text-neutral-500">{d.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Academic", "Hackathon", "Internship", "Event", "Club", "Workshop", "Scholarship"];
  const items = filter === "All" ? FEED : FEED.filter((f) => f.type === filter);
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <SectionHeading title="Feed" sub="Everything happening across campus, in one place." />
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              filter === f ? "bg-gradient-to-r from-violet-600 to-pink-500 text-white" : "border border-neutral-800 text-neutral-400 hover:text-neutral-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {items.length ? items.map((item) => <FeedCard key={item.id} item={item} />) : (
          <p className="text-sm text-neutral-500">Nothing here yet for this filter.</p>
        )}
      </div>
    </div>
  );
}

function MissedPage({ setPage }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-pink-500/5 p-5">
        <p className="text-lg font-bold text-neutral-50">While you were away...</p>
        <p className="mt-1 text-sm text-neutral-400">You were gone for 3 days. Here's everything important that happened, grouped so you can catch up fast.</p>
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
            <AlertTriangle className="h-4 w-4 text-red-400" /> Important
          </h2>
          <span className="text-xs text-neutral-500">2 updates</span>
        </div>
        <div className="space-y-3">
          {IMPORTANT_UPDATES.map((u) => (
            <div key={u.id} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
              <p className="text-sm font-semibold text-neutral-50">{u.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-400">{u.body}</p>
              <div className="mt-2.5 flex items-center gap-2 text-xs">
                <Pill className={CATEGORY_STYLES[u.tag === "Urgent" ? "Important" : "Academic"].pill}>{u.tag}</Pill>
                <span className="text-neutral-500">Posted {u.time} · {u.src}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
            <Clock className="h-4 w-4 text-amber-400" /> Upcoming deadlines
          </h2>
          <span className="text-xs text-neutral-500">2 items</span>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-sm font-semibold text-neutral-50">Design Thinking assignment submission</p>
            <p className="mt-1 text-sm text-neutral-400">Final report due tomorrow at 11:59 PM. Upload as a single PDF via the student portal.</p>
            <div className="mt-2.5 flex items-center gap-2 text-xs">
              <Pill className="bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30">1 day left</Pill>
              <span className="text-neutral-500">Posted 3 days ago</span>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-sm font-semibold text-neutral-50">Google Student Hackathon registration</p>
            <p className="mt-1 text-sm text-neutral-400">Team registration and idea submission both close together. Confirm your team of 4 before applying.</p>
            <div className="mt-2.5 flex items-center gap-2 text-xs">
              <Pill className="bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30">4 days left</Pill>
              <span className="text-neutral-500">Posted 1 day ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
            <Rocket className="h-4 w-4 text-emerald-400" /> Opportunities
          </h2>
          <span className="text-xs text-neutral-500">2 new</span>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-sm font-semibold text-neutral-50">Summer Internship — Frontend, Razorpay</p>
            <p className="mt-1 text-sm text-neutral-400">12 openings for pre-final year students. Stipend disclosed, remote-friendly for the first month.</p>
            <div className="mt-2.5 flex items-center gap-2 text-xs">
              <Pill className={CATEGORY_STYLES.Internship.pill}>Internship</Pill>
              <span className="text-neutral-500">Posted yesterday</span>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-sm font-semibold text-neutral-50">Merit-cum-Means Scholarship 2026</p>
            <p className="mt-1 text-sm text-neutral-400">Covers up to 75% of tuition. Requires income certificate and CGPA above 7.5.</p>
            <div className="mt-2.5 flex items-center gap-2 text-xs">
              <Pill className={CATEGORY_STYLES.Scholarship.pill}>Scholarship</Pill>
              <span className="text-neutral-500">Posted 2 days ago</span>
            </div>
          </div>
        </div>
      </div>

      <PrimaryButton className="w-full justify-center py-3" onClick={() => setPage("dashboard")}>
        <CheckCircle2 className="h-4 w-4" /> Mark all as reviewed
      </PrimaryButton>
    </div>
  );
}

function OpportunitiesPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Hackathons", "Internships", "Scholarships", "Competitions", "Workshops"];
  const singular = { Hackathons: "Hackathon", Internships: "Internship", Scholarships: "Scholarship", Competitions: "Competition", Workshops: "Workshop" };
  const items = filter === "All" ? OPPORTUNITIES : OPPORTUNITIES.filter((o) => o.type === singular[filter]);
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <SectionHeading title="Opportunities" sub="Discover hackathons, internships, scholarships, competitions and workshops picked for you." />
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            placeholder="Search opportunities..."
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 py-2.5 pl-9 pr-3 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40"
          />
        </div>
      </div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              filter === f ? "bg-gradient-to-r from-violet-600 to-pink-500 text-white" : "border border-neutral-800 text-neutral-400 hover:text-neutral-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => <OpportunityCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

function DeadlinesPage() {
  const groups = ["Urgent", "Upcoming", "Later"];
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <SectionHeading title="Deadlines" sub="Everything due, sorted by urgency." />
      <div className="space-y-8">
        {groups.map((g) => (
          <div key={g}>
            <Pill className={`mb-3 ${URGENCY_STYLES[g]}`}>{g}</Pill>
            <div className="space-y-3">
              {DEADLINES.filter((d) => d.urgency === g).map((d) => <DeadlineRow key={d.id} d={d} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavedPage() {
  const saved = OPPORTUNITIES.slice(0, 4);
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <SectionHeading title="Saved" sub="Opportunities and updates you've bookmarked for later." />
      {saved.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((item) => <OpportunityCard key={item.id} item={item} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 py-16 text-center">
          <Bookmark className="mb-3 h-6 w-6 text-neutral-600" />
          <p className="text-sm font-medium text-neutral-300">Nothing saved yet</p>
          <p className="mt-1 text-xs text-neutral-500">Tap the bookmark icon on any card to save it here.</p>
        </div>
      )}
    </div>
  );
}

function ToggleRow({ label, sub, defaultOn = true }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between border-b border-neutral-800 py-3.5 last:border-0">
      <div>
        <p className="text-sm font-medium text-neutral-200">{label}</p>
        {sub && <p className="text-xs text-neutral-500">{sub}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-gradient-to-r from-violet-600 to-pink-500" : "bg-neutral-800"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <SectionHeading title="Settings" sub="Manage your profile, notifications, and account." />
      <div className="max-w-2xl space-y-6">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
          <h2 className="mb-4 text-sm font-semibold text-neutral-200">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-lg font-bold text-white">AR</div>
            <div>
              <p className="text-sm font-semibold text-neutral-50">Aditi Rao</p>
              <p className="text-xs text-neutral-500">CS · Year 3 · aditi.rao@college.edu</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
          <h2 className="mb-1 text-sm font-semibold text-neutral-200">Notifications</h2>
          <div className="mt-2">
            <ToggleRow label="Email notifications" sub="Get a digest for important updates" defaultOn />
            <ToggleRow label="Push notifications" sub="Real-time alerts on your device" defaultOn />
            <ToggleRow label="Deadline reminders" sub="Nudge me 24 hours before something is due" defaultOn />
            <ToggleRow label="Opportunity recommendations" sub="Based on your year and interests" />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
          <h2 className="mb-4 text-sm font-semibold text-neutral-200">Appearance</h2>
          <div className="flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-violet-500/40 bg-violet-500/10 py-2.5 text-sm font-medium text-violet-300">
              <Moon className="h-4 w-4" /> Dark
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-800 py-2.5 text-sm font-medium text-neutral-500">
              Light
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
          <h2 className="mb-4 text-sm font-semibold text-neutral-200">Account</h2>
          <button className="flex w-full items-center gap-3 rounded-lg py-2.5 text-sm font-medium text-neutral-300 hover:text-neutral-100">
            <LogOut className="h-4 w-4" /> Log out
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg py-2.5 text-sm font-medium text-red-400 hover:text-red-300">
            <Trash2 className="h-4 w-4" /> Delete account
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- App ----------------------------- */

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const pages = {
    dashboard: <DashboardPage setPage={setPage} />,
    feed: <FeedPage />,
    missed: <MissedPage setPage={setPage} />,
    opportunities: <OpportunitiesPage />,
    deadlines: <DeadlinesPage />,
    saved: <SavedPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-neutral-100">
      <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar setMobileOpen={setMobileOpen} />
        <div className="flex-1 overflow-y-auto">{pages[page]}</div>
      </div>
    </div>
  );
}
