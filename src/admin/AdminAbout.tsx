import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, UserCheck, CheckCircle2, Sparkles, GraduationCap, Award } from 'lucide-react';
import type { AboutInfo } from '../types/portfolio';
import { ImageUploadInput } from './ImageUploadInput';

export const AdminAbout: React.FC = () => {
  const { about, updateAbout } = usePortfolio();

  const [formData, setFormData] = useState<AboutInfo>(about);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const bioWordCount = formData.bio ? formData.bio.trim().split(/\s+/).filter(Boolean).length : 0;
  const bioCharCount = formData.bio ? formData.bio.length : 0;

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
          <UserCheck className="w-7 h-7 text-[#B600A8]" /> Profile &amp; Bio Settings
        </h1>
        <p className="text-xs text-gray-400 font-light mt-1">
          Update personal details, degree, specialization, avatar portrait, and scroll reveal introduction
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
              Profile information successfully updated! Public portfolio updated live.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-8 bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
        >
          <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B600A8]" /> Personal Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Portfolio Title / Role
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. AI Specialist & Full-Stack Developer"
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Education / Degree <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="B.Tech — Computer Science and Engineering"
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Specialization <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="Generative AI"
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
                required
              />
            </div>
          </div>

          <ImageUploadInput
            label="Profile Avatar / Portrait Image"
            value={formData.avatarUrl || ''}
            onChange={(url) => setFormData({ ...formData, avatarUrl: url })}
            helpText="Select your transparent PNG or high-res portrait photo."
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
                About Bio (Scroll Reveal Animated Paragraph)
              </label>
              <span className="text-[10px] text-gray-400 font-mono">
                {bioWordCount} words &bull; {bioCharCount} chars
              </span>
            </div>
            <textarea
              rows={5}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="With passion for innovation and engineering, I specialize in Generative AI..."
              className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm leading-relaxed transition-all"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-10 py-3.5 rounded-2xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] text-white font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-[#B600A8]/25 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>

        {/* Live Public Profile Simulation Card */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-gray-400 block">
            Live Card Preview
          </span>

          <div className="admin-card-glow rounded-3xl p-6 text-center space-y-4 shadow-xl">
            <div className="relative inline-block mx-auto">
              <img
                src={
                  formData.avatarUrl ||
                  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85'
                }
                alt={formData.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-[#B600A8]/60 mx-auto shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#121218] led-pulse-green"></span>
            </div>

            <div>
              <h3 className="font-bold text-white text-lg uppercase">{formData.name}</h3>
              <p className="text-xs text-[#E266DA] font-medium mt-0.5">{formData.title}</p>
            </div>

            <div className="space-y-2 pt-2 text-left border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <GraduationCap className="w-4 h-4 text-[#B600A8] shrink-0" />
                <span className="truncate">{formData.education}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{formData.specialization}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 italic line-clamp-3 text-left pt-2 border-t border-white/5">
              "{formData.bio}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

