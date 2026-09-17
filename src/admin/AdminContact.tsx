import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Mail, CheckCircle2, GitBranch, Share2, ExternalLink, Globe, MessageSquare } from 'lucide-react';
import type { ContactInfo } from '../types/portfolio';

export const AdminContact: React.FC = () => {
  const { contact, updateContact } = usePortfolio();

  const [formData, setFormData] = useState<ContactInfo>(contact);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
          <Mail className="w-7 h-7 text-[#B600A8]" /> Contact &amp; Social Channels
        </h1>
        <p className="text-xs text-gray-400 font-light mt-1">
          Manage email address and public social media links across your portfolio
        </p>
      </div>

      {/* Save Toast Notification */}
      <AnimatePresence>
        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3 shadow-xl"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            <span className="font-medium">
              Contact links successfully saved! Portfolio footer and buttons updated.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
      >
        <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#B600A8]" /> Connected Outlets
        </h2>

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#E266DA]" /> Contact Email Address
            </label>
            <div className="flex items-center gap-3">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="harshasiddhartha.p@gmail.com"
                className="flex-1 px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm font-mono transition-all"
              />
              {formData.email && (
                <a
                  href={`mailto:${formData.email}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold uppercase text-gray-300 hover:text-white transition-all flex items-center gap-1.5 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Test Mailto
                </a>
              )}
            </div>
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-purple-400" /> GitHub Profile Link
            </label>
            <div className="flex items-center gap-3">
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/your-username"
                className="flex-1 px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm font-mono transition-all"
              />
              {formData.github && (
                <a
                  href={formData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold uppercase text-gray-300 hover:text-white transition-all flex items-center gap-1.5 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Profile
                </a>
              )}
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-sky-400" /> LinkedIn Profile Link
            </label>
            <div className="flex items-center gap-3">
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/your-username"
                className="flex-1 px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm font-mono transition-all"
              />
              {formData.linkedin && (
                <a
                  href={formData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold uppercase text-gray-300 hover:text-white transition-all flex items-center gap-1.5 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Profile
                </a>
              )}
            </div>
          </div>

          {/* Twitter / X */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" /> X / Twitter Profile Link
            </label>
            <div className="flex items-center gap-3">
              <input
                type="url"
                value={formData.twitter || ''}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                placeholder="https://twitter.com/your-handle"
                className="flex-1 px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm font-mono transition-all"
              />
              {formData.twitter && (
                <a
                  href={formData.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold uppercase text-gray-300 hover:text-white transition-all flex items-center gap-1.5 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Profile
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-10 py-3.5 rounded-2xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] text-white font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-[#B600A8]/25 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Contact Links
          </button>
        </div>
      </form>
    </motion.div>
  );
};

