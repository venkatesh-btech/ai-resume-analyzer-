import { FileSearch2, History, House, Sparkles } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const navigation = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/analyze', label: 'Analyzer', icon: FileSearch2 },
  { to: '/history', label: 'History', icon: History },
];

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="AI Resume Analyzer home">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/20">
              <Sparkles size={20} />
            </span>
            <span className="text-[15px] font-bold tracking-tight text-ink sm:text-base">
              Resume<span className="text-brand-600">AI</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main navigation">
            {navigation.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            ))}
            <Link
              to="/analyze"
              className="ml-1 hidden items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/15 transition hover:bg-brand-700 sm:inline-flex"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>AI Resume Analyzer</span>
          <span>Your resume text is processed for analysis and is not stored.</span>
        </div>
      </footer>
    </div>
  );
}
