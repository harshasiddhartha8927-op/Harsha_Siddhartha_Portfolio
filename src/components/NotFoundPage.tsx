import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08080C] text-[#E2E8F0] font-sans flex flex-col justify-center items-center px-4 relative overflow-hidden admin-bg-grid">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#B600A8]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#6366F1]/15 blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 text-center space-y-6"
      >
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#B600A8]/20 to-[#6366F1]/20 border border-[#B600A8]/40 text-[#E266DA] mb-2">
          <ShieldAlert className="w-12 h-12" />
        </div>

        <div>
          <span className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] via-[#8B5CF6] to-[#06B6D4]">
            404
          </span>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white mt-2">
            Page Not Found
          </h1>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            The page you are looking for doesn't exist or has been moved to another route.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] text-white text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-all shadow-lg shadow-[#B600A8]/25"
          >
            <Home className="w-4 h-4" /> Return to Portfolio
          </Link>

          <Link
            to="/admin/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs uppercase tracking-widest font-semibold transition-all hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" /> Admin Portal
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
