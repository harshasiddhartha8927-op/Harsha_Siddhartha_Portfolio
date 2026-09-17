import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, ShieldAlert, Eye, EyeOff, User, Lock, Loader2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, isAuthLoading, about } = usePortfolio();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get('redirect') || '/admin/dashboard';

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      navigate(redirectUrl, { replace: true });
    }
  }, [isAuthenticated, isAuthLoading, navigate, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate(redirectUrl, { replace: true });
      } else {
        setError(result.error || 'Invalid login credentials.');
      }
    } catch {
      setError('An unexpected error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080C] text-[#E2E8F0] font-sans flex flex-col justify-center items-center px-4 relative overflow-hidden admin-bg-grid">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#B600A8]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#6366F1]/15 blur-3xl pointer-events-none"></div>

      {/* Back to Public Site Launcher */}
      <a
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" /> Public Portfolio
      </a>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6"
      >
        {/* Header / Brand Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#B600A8] via-[#8B5CF6] to-[#06B6D4] text-white mb-4 shadow-xl shadow-[#B600A8]/25 border border-white/10">
            <Shield className="w-8 h-8" />
          </div>
          <span className="text-[10px] uppercase font-bold text-[#E266DA] tracking-widest px-2.5 py-0.5 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/40 mb-1">
            Restricted Access
          </span>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Admin Authentication
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-light">
            Private management portal for {about.name || 'P. Harsha Siddhartha'}
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#B600A8]" /> Admin Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-4 pr-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
                required
                disabled={isSubmitting}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#B600A8]" /> Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
                required
                disabled={isSubmitting}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] text-white font-semibold uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-xl shadow-[#B600A8]/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Authenticate &amp; Enter</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
