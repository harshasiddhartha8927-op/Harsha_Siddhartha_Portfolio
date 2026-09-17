import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Sparkles,
  X,
  AlertTriangle,
  LayoutGrid,
  List,
  Search,
  ExternalLink,
  GitBranch,
  Code2,
  FolderKanban,
} from 'lucide-react';
import type { Project } from '../types/portfolio';

export const AdminProjects: React.FC = () => {
  const {
    projects,
    deleteProject,
    toggleProjectStatus,
    toggleProjectFeatured,
  } = usePortfolio();

  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies?.all?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteProject(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <FolderKanban className="w-7 h-7 text-[#B600A8]" /> Projects Hub
          </h1>
          <p className="text-xs text-gray-400 font-light mt-1">
            Manage, organize, publish, preview, or remove your portfolio showcase items
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] text-white font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#B600A8]/25 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </Link>
      </div>

      {/* Control Bar: Tabs, Search & View Switcher */}
      <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 shadow-xl">
        {/* Filter Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(['all', 'published', 'draft'] as const).map((status) => {
            const count =
              status === 'all'
                ? projects.length
                : projects.filter((p) => p.status === status).length;
            const isActive = filterStatus === status;

            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`relative px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectFilterBg"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="z-10">
                  {status} ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & View Switcher */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, tag..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-xs font-mono transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-gray-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Grid vs List View Toggle */}
          <div className="p-1 rounded-xl bg-[#181820] border border-white/10 flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#B600A8] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#B600A8] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-[#121218]/60 border border-white/10 rounded-3xl p-8">
                <FolderKanban className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white uppercase">No Projects Found</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Try adjusting your filter status or search term.
                </p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="admin-card-glow rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Thumbnail Image Header */}
                    <div className="relative h-48 overflow-hidden bg-black/60 border-b border-white/10">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-black/40"></div>

                      {/* Status Badges Overlay */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <button
                          onClick={() => toggleProjectStatus(project.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer shadow-lg backdrop-blur-md ${
                            project.status === 'published'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-900'
                              : 'bg-amber-950/80 text-amber-400 border border-amber-500/40 hover:bg-amber-900'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              project.status === 'published'
                                ? 'bg-emerald-400 led-pulse-green'
                                : 'bg-amber-400 led-pulse-amber'
                            }`}
                          ></span>
                          {project.status}
                        </button>
                      </div>

                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => toggleProjectFeatured(project.id)}
                          className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
                            project.featured
                              ? 'bg-[#B600A8]/80 text-white border-[#B600A8] shadow-lg shadow-[#B600A8]/30'
                              : 'bg-black/60 text-gray-400 border-white/10 hover:text-white'
                          }`}
                          title={project.featured ? 'Featured on Portfolio' : 'Set as Featured'}
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Category Pill */}
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-gray-300 text-[10px] font-semibold border border-white/10">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-white text-base group-hover:text-[#E266DA] transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {/* Technologies Stack Chips */}
                      {project.technologies?.all && project.technologies.all.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.technologies.all.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/5 text-[9px] font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.all.length > 4 && (
                            <span className="text-[9px] text-gray-500 font-mono self-center">
                              +{project.technologies.all.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => setPreviewProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs font-medium cursor-pointer border border-white/5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#E266DA]" /> Preview
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/projects/edit/${project.id}`}
                        className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white hover:bg-[#B600A8]/30 transition-all border border-white/5"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTargetId(project.id)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all border border-red-500/20 cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Projects List/Table View */}
      {viewMode === 'list' && (
        <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#181822] uppercase text-[10px] tracking-wider text-gray-400 border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">Thumbnail &amp; Name</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Featured</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      No projects found in this view.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={project.thumbnailUrl}
                            alt={project.name}
                            className="w-14 h-10 rounded-xl object-cover bg-gray-900 border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div>
                            <h4 className="font-bold text-white text-sm group-hover:text-[#E266DA] transition-colors">
                              {project.name}
                            </h4>
                            <p className="text-[11px] text-gray-400 font-light truncate max-w-xs">
                              {project.shortDescription}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-gray-400 font-medium">{project.category}</td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleProjectStatus(project.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer ${
                            project.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              project.status === 'published'
                                ? 'bg-emerald-400 led-pulse-green'
                                : 'bg-amber-400 led-pulse-amber'
                            }`}
                          ></span>
                          {project.status}
                        </button>
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleProjectFeatured(project.id)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer ${
                            project.featured
                              ? 'bg-[#B600A8]/20 text-[#E266DA] border border-[#B600A8]/40'
                              : 'bg-white/5 text-gray-500 border border-white/10'
                          }`}
                        >
                          <Sparkles className="w-3 h-3" />
                          {project.featured ? 'Featured' : 'Standard'}
                        </button>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setPreviewProject(project)}
                            title="Preview"
                            className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                          >
                            <Eye className="w-4 h-4 text-[#E266DA]" />
                          </button>
                          <Link
                            to={`/admin/projects/edit/${project.id}`}
                            title="Edit"
                            className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white hover:bg-[#B600A8]/30 transition-colors border border-white/5"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteTargetId(project.id)}
                            title="Delete"
                            className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#16161E] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-6"
            >
              <div className="p-4 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 inline-block mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Delete Project?
                </h3>
                <p className="text-xs text-gray-400 mt-2">
                  Are you sure you want to delete this project? This action will permanently remove it from your public portfolio.
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setDeleteTargetId(null)}
                  className="px-6 py-3 rounded-2xl border border-white/10 text-gray-300 hover:bg-white/10 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-3 rounded-2xl bg-red-600 text-white hover:bg-red-700 text-xs uppercase tracking-wider font-semibold shadow-lg cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Public Portfolio Interactive Preview Modal */}
      <AnimatePresence>
        {previewProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-[#121218] text-[#D7E2EA] rounded-3xl border border-white/10 p-6 sm:p-8 my-8 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 led-pulse-green"></span>
                  <span className="text-xs uppercase tracking-widest text-[#E266DA] font-bold">
                    Portfolio Card &amp; Details Preview
                  </span>
                </div>
                <button
                  onClick={() => setPreviewProject(null)}
                  className="p-2 rounded-full bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                  Category: {previewProject.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                  {previewProject.name}
                </h2>
                <p className="text-xs text-gray-300 mt-2 font-light leading-relaxed">
                  {previewProject.shortDescription}
                </p>
              </div>

              {/* Showcase Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-[240px] bg-black/80 border border-white/10">
                  <img
                    src={previewProject.col2Img || previewProject.thumbnailUrl}
                    alt={previewProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-[240px] bg-black/80 border border-white/10">
                  <img
                    src={previewProject.col1Img1 || previewProject.thumbnailUrl}
                    alt={previewProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Technologies */}
              {previewProject.technologies?.all && previewProject.technologies.all.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-[#B600A8]" /> Technologies &amp; Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {previewProject.technologies.all.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Links Launchers */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {previewProject.links?.github && (
                    <a
                      href={previewProject.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-wider border border-white/10"
                    >
                      <GitBranch className="w-4 h-4 text-gray-300" /> Repository
                    </a>
                  )}
                  {previewProject.links?.live && (
                    <a
                      href={previewProject.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B600A8] hover:bg-[#B600A8]/80 text-white text-xs uppercase tracking-wider shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setPreviewProject(null)}
                  className="px-6 py-2 rounded-xl bg-white/10 text-white text-xs uppercase font-medium hover:bg-white/20 cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

