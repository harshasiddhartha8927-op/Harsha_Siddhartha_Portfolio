import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  FolderPlus,
  Cpu,
  Wrench,
  UserCheck,
  Mail,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  Clock,
  Sparkles,
  Radio,
  Loader2,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, isAuthLoading, logout, about, projects, skills, services } = usePortfolio();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      const targetPath = encodeURIComponent(location.pathname + location.search);
      navigate(`/admin/login?redirect=${targetPath}`, { replace: true });
    }
  }, [isAuthenticated, isAuthLoading, navigate, location.pathname, location.search]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#08080C] flex flex-col items-center justify-center text-white space-y-4 admin-bg-grid">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#B600A8]/20 to-[#6366F1]/20 border border-[#B600A8]/40 shadow-xl shadow-[#B600A8]/20">
          <Loader2 className="w-8 h-8 animate-spin text-[#E266DA]" />
        </div>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold animate-pulse">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navLinks = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: null,
    },
    {
      to: '/admin/projects',
      label: 'Projects',
      icon: <FolderKanban className="w-4 h-4" />,
      badge: projects.length,
    },
    {
      to: '/admin/projects/new',
      label: 'Add Project',
      icon: <FolderPlus className="w-4 h-4" />,
      badge: null,
    },
    {
      to: '/admin/skills',
      label: 'Skills',
      icon: <Cpu className="w-4 h-4" />,
      badge: skills.length,
    },
    {
      to: '/admin/services',
      label: 'Services',
      icon: <Wrench className="w-4 h-4" />,
      badge: services.length,
    },
    {
      to: '/admin/about',
      label: 'About Me',
      icon: <UserCheck className="w-4 h-4" />,
      badge: null,
    },
    {
      to: '/admin/contact',
      label: 'Contact',
      icon: <Mail className="w-4 h-4" />,
      badge: null,
    },
  ];

  // Helper to resolve current route breadcrumb title
  const getBreadcrumbTitle = () => {
    if (location.pathname === '/admin/dashboard') return 'Overview & Analytics';
    if (location.pathname === '/admin/projects') return 'Projects Management';
    if (location.pathname === '/admin/projects/new') return 'New Project Creator';
    if (location.pathname.startsWith('/admin/projects/edit/')) return 'Edit Project Details';
    if (location.pathname === '/admin/skills') return 'Skills & Tech Stack';
    if (location.pathname === '/admin/services') return 'Services & Offerings';
    if (location.pathname === '/admin/about') return 'Profile & Bio Settings';
    if (location.pathname === '/admin/contact') return 'Contact & Social Links';
    return 'Control Panel';
  };

  return (
    <div className="min-h-screen bg-[#08080C] text-[#E2E8F0] font-sans flex flex-col md:flex-row relative admin-bg-grid overflow-x-hidden">
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden bg-[#111116]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#B600A8] to-[#6366F1] text-white shadow-lg shadow-[#B600A8]/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-white uppercase text-xs tracking-wider">Admin Hub</h2>
            <span className="text-[10px] text-gray-400 block">{about.name}</span>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white border border-white/10 cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar & Mobile Sliding Drawer */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 w-64 bg-[#0F0F14]/95 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between flex-shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } h-screen overflow-y-auto`}
      >
        <div>
          {/* Admin Header / Logo */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#B600A8] via-[#8B5CF6] to-[#06B6D4] text-white shadow-lg shadow-[#B600A8]/25">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-white uppercase text-xs tracking-widest">
                  Control Center
                </h2>
                <span className="w-2 h-2 rounded-full bg-emerald-400 led-pulse-green inline-block"></span>
              </div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-0.5 truncate max-w-[140px]">
                {about.name}
              </span>
            </div>
          </div>

          {/* Quick System Badge */}
          <div className="mx-4 my-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Live Portfolio Sync</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold">
              ACTIVE
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.to === '/admin/dashboard'
                  ? location.pathname === '/admin/dashboard'
                  : location.pathname.startsWith(link.to);

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                    isActive
                      ? 'text-white shadow-lg shadow-[#B600A8]/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center gap-3 z-10">
                    <span className={isActive ? 'text-white' : 'text-gray-400'}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </div>

                  {link.badge !== null && (
                    <span
                      className={`z-10 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-gray-400 border border-white/10'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2.5">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider text-gray-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>Public Website</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area with Topbar */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#0F0F14]/60 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Admin Portal
            </span>
            <span className="text-gray-600">/</span>
            <h1 className="text-sm font-bold text-white uppercase tracking-wider">
              {getBreadcrumbTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            {/* Live Clock Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300 font-mono">
              <Clock className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>{currentTime || '10:30:20 AM'}</span>
            </div>

            {/* Profile Avatar Pill */}
            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
              <img
                src={
                  about.avatarUrl ||
                  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85'
                }
                alt={about.name}
                className="w-8 h-8 rounded-full object-cover border border-[#B600A8]/40"
              />
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-none">{about.name}</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
