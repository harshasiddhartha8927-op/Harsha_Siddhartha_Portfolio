import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Cpu, Check, X } from 'lucide-react';
import type { Skill, SkillCategory } from '../types/portfolio';

const PROFICIENCY_LEVELS = ['Expert', 'Advanced', 'Intermediate', 'Beginner'];

export const AdminSkills: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const [editingId, setEditingId] = useState<string | null>(null);

  // New Skill Form State
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('Frontend');
  const [newSkillLevel, setNewSkillLevel] = useState('Advanced');

  // Edit Skill State
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState<SkillCategory>('Frontend');
  const [editLevel, setEditLevel] = useState('');

  const categories: SkillCategory[] = ['Frontend', 'Backend', 'AI', 'Development'];

  const filteredSkills = skills.filter((s) => {
    if (activeCategory === 'All') return true;
    return s.category === activeCategory;
  });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel,
      featured: true,
    });

    setNewSkillName('');
  };

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditName(skill.name);
    setEditCategory(skill.category);
    setEditLevel(skill.level || 'Advanced');
  };

  const saveEdit = (id: string) => {
    updateSkill(id, {
      name: editName,
      category: editCategory,
      level: editLevel,
    });
    setEditingId(null);
  };

  const getCategoryColorClass = (cat: SkillCategory) => {
    switch (cat) {
      case 'AI':
        return 'text-[#E266DA] bg-[#B600A8]/10 border-[#B600A8]/30';
      case 'Frontend':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'Backend':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Development':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default:
        return 'text-gray-300 bg-white/5 border-white/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
          <Cpu className="w-7 h-7 text-[#B600A8]" /> Technical Skills Manager
        </h1>
        <p className="text-xs text-gray-400 font-light mt-1">
          Add, edit, categorize, and showcase your technology stack on your public portfolio
        </p>
      </div>

      {/* Add Skill Form Card */}
      <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#B600A8]" /> Add New Technical Skill
        </h2>

        <form onSubmit={handleAddSkill} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-4">
            <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. PyTorch, React, Docker"
              className="w-full px-4 py-2.5 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-xs font-mono transition-all"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
              Category
            </label>
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value as SkillCategory)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#181820] border border-white/10 text-white focus:outline-none focus:border-[#B600A8] text-xs transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
              Proficiency Level
            </label>
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#181820] border border-white/10 text-white focus:outline-none focus:border-[#B600A8] text-xs transition-all"
            >
              {PROFICIENCY_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] text-white font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#B600A8]/20 cursor-pointer"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {(['All', ...categories] as const).map((cat) => {
          const count =
            cat === 'All' ? skills.length : skills.filter((s) => s.category === cat).length;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`relative px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="skillFilterBg"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="z-10 flex items-center gap-1.5">
                <span>{cat}</span>
                <span className="px-1.5 py-0.2 rounded-md bg-white/10 text-[9px] font-bold">
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredSkills.map((skill) => {
            const isEditingThis = editingId === skill.id;

            if (isEditingThis) {
              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#181822] border-2 border-[#B600A8] rounded-2xl p-4 space-y-3 shadow-2xl"
                >
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#121218] border border-white/10 text-white text-xs font-mono"
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as SkillCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-[#121218] border border-white/10 text-white text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <select
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#121218] border border-white/10 text-white text-xs"
                  >
                    {PROFICIENCY_LEVELS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white border border-white/10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => saveEdit(skill.id)}
                      className="p-2 rounded-xl bg-[#B600A8] text-white font-bold shadow-lg"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            }

            const colorBadge = getCategoryColorClass(skill.category);

            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="admin-card-glow rounded-2xl p-4 flex items-center justify-between group shadow-lg"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#E266DA] group-hover:scale-110 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider group-hover:text-[#E266DA] transition-colors">
                      {skill.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border ${colorBadge}`}
                      >
                        {skill.category}
                      </span>
                      {skill.level && (
                        <span className="text-[9px] text-gray-400 font-mono">
                          &bull; {skill.level}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEdit(skill)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Edit Skill"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

