import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Wrench, Check, X, ArrowUp, ArrowDown } from 'lucide-react';
import type { Service } from '../types/portfolio';

export const AdminServices: React.FC = () => {
  const { services, addService, updateService, deleteService, toggleServiceStatus, moveServiceOrder } = usePortfolio();

  const [activeFilter, setActiveFilter] = useState<'All' | 'published' | 'draft'>('All');
  const [editingId, setEditingId] = useState<string | null>(null);

  // New Service Form State
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDetailedDescription, setNewDetailedDescription] = useState('');
  const [newTagsStr, setNewTagsStr] = useState('');
  const [newStatus, setNewStatus] = useState<'published' | 'draft'>('published');

  // Edit Service Form State
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDetailedDescription, setEditDetailedDescription] = useState('');
  const [editTagsStr, setEditTagsStr] = useState('');
  const [editStatus, setEditStatus] = useState<'published' | 'draft'>('published');

  const filteredServices = services.filter((s) => {
    if (activeFilter === 'All') return true;
    return s.status === activeFilter;
  });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDescription.trim()) return;

    const tagsArray = newTagsStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addService({
      name: newName.trim(),
      description: newDescription.trim(),
      detailedDescription: newDetailedDescription.trim() || undefined,
      tags: tagsArray.length > 0 ? tagsArray : undefined,
      status: newStatus,
    });

    setNewName('');
    setNewDescription('');
    setNewDetailedDescription('');
    setNewTagsStr('');
    setNewStatus('published');
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setEditName(service.name);
    setEditDescription(service.description);
    setEditDetailedDescription(service.detailedDescription || '');
    setEditTagsStr(service.tags ? service.tags.join(', ') : '');
    setEditStatus(service.status || 'published');
  };

  const saveEdit = (id: string) => {
    const tagsArray = editTagsStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    updateService(id, {
      name: editName.trim(),
      description: editDescription.trim(),
      detailedDescription: editDetailedDescription.trim() || undefined,
      tags: tagsArray.length > 0 ? tagsArray : undefined,
      status: editStatus,
    });

    setEditingId(null);
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
          <Wrench className="w-7 h-7 text-[#B600A8]" /> Services &amp; Offerings Manager
        </h1>
        <p className="text-xs text-gray-400 font-light mt-1">
          Add, edit, reorder, and manage the services shown on your public portfolio section
        </p>
      </div>

      {/* Add Service Form Card */}
      <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#B600A8]" /> Add New Service Offering
        </h2>

        <form onSubmit={handleAddService} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8">
              <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
                Service Title <span className="text-[#B600A8]">*</span>
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Full Stack Development, Generative AI Systems"
                className="w-full px-4 py-2.5 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-xs font-mono transition-all"
                required
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
                Publication Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as 'published' | 'draft')}
                className="w-full px-4 py-2.5 rounded-xl bg-[#181820] border border-white/10 text-white focus:outline-none focus:border-[#B600A8] text-xs transition-all"
              >
                <option value="published">Published (Visible)</option>
                <option value="draft">Draft (Hidden)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
              Short Summary Description <span className="text-[#B600A8]">*</span>
            </label>
            <textarea
              rows={2}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Brief summary of what this service delivers..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-xs transition-all resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-7">
              <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
                Optional Technologies / Skill Tags (Comma Separated)
              </label>
              <input
                type="text"
                value={newTagsStr}
                onChange={(e) => setNewTagsStr(e.target.value)}
                placeholder="React, TypeScript, PyTorch, Node.js"
                className="w-full px-4 py-2.5 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-xs font-mono transition-all"
              />
            </div>

            <div className="sm:col-span-5 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] text-white font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#B600A8]/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Service
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          {(['All', 'published', 'draft'] as const).map((status) => {
            const count =
              status === 'All'
                ? services.length
                : services.filter((s) => s.status === status).length;
            const isActive = activeFilter === status;

            return (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`relative px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="serviceFilterBg"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="z-10 flex items-center gap-1.5">
                  <span className="capitalize">{status}</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-white/10 text-[9px] font-bold">
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-[11px] text-gray-400 font-mono hidden sm:block">
          Total Services: {services.length}
        </span>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredServices.map((service, index) => {
            const isEditingThis = editingId === service.id;
            const formattedIndex = String(index + 1).padStart(2, '0');

            if (isEditingThis) {
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-[#181822] border-2 border-[#B600A8] rounded-3xl p-6 space-y-4 shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs uppercase font-bold text-[#E266DA] tracking-wider">
                      Editing Service #{formattedIndex}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white border border-white/10 text-xs"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => saveEdit(service.id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" /> Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-8">
                      <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/10 text-white text-xs font-mono"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
                        Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as 'published' | 'draft')}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/10 text-white text-xs"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/10 text-white text-xs resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-gray-400 mb-1">
                      Skill Tags (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={editTagsStr}
                      onChange={(e) => setEditTagsStr(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                </motion.div>
              );
            }

            const isPublished = service.status !== 'draft';

            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="admin-card-glow rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group shadow-xl"
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="font-black text-2xl text-white/40 group-hover:text-[#E266DA] font-mono min-w-[36px] pt-1">
                    {formattedIndex}
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-white text-base uppercase tracking-wider group-hover:text-[#E266DA] transition-colors">
                        {service.name}
                      </h3>
                      <button
                        onClick={() => toggleServiceStatus(service.id)}
                        className={`text-[9px] uppercase font-bold px-2.5 py-0.5 rounded-full border cursor-pointer transition-all ${
                          isPublished
                            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'text-amber-400 bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        {isPublished ? 'PUBLISHED' : 'DRAFT'}
                      </button>
                    </div>

                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {service.description}
                    </p>

                    {service.tags && service.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {service.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto justify-end border-white/10">
                  <button
                    onClick={() => moveServiceOrder(service.id, 'up')}
                    disabled={index === 0}
                    className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveServiceOrder(service.id, 'down')}
                    disabled={index === services.length - 1}
                    className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => startEdit(service)}
                    className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
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
