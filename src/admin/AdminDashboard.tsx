import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  CheckCircle,
  FileText,
  Sparkles,
  Cpu,
  Wrench,
  Plus,
  ArrowRight,
  Search,
  UserCheck,
  Mail,
  Edit2,
  TrendingUp,
  Activity,
  Zap,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { projects, skills, services, about } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.status === 'published').length;
  const draftProjects = projects.filter((p) => p.status === 'draft').length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  const totalSkills = skills.length;

  const publishedPercent = totalProjects > 0 ? Math.round((publishedProjects / totalProjects) * 100) : 0;

  const filteredRecentProjects = projects
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Executive Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#12121A] via-[#1A1024] to-[#12121A] border border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-[#B600A8]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 rounded-full bg-[#6366F1]/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={
                  about.avatarUrl ||
                  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85'
                }
                alt={about.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#B600A8]/60 shadow-xl shadow-[#B600A8]/20"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#12121A] led-pulse-green"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#B600A8]/20 text-[#E266DA] border border-[#B600A8]/40 text-[10px] font-bold uppercase tracking-widest">
                  Executive Dashboard
                </span>
                <span className="text-[11px] text-emerald-400 font-mono font-medium flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" /> System Optimal
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1.5">
                Welcome back, {about.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
                {about.education} &bull; <span className="text-gray-300 font-medium">{about.specialization}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] text-white font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#B600A8]/25 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add New Project
            </Link>
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:bg-white/10 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Live Portfolio <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics & Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1 */}
        <div className="admin-card-glow rounded-3xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Projects</span>
            <div className="p-2 rounded-xl bg-[#B600A8]/20 text-[#E266DA] border border-[#B600A8]/30">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-white tracking-tight">{totalProjects}</span>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> Live
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-[#B600A8] h-full rounded-full w-full"></div>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="admin-card-glow rounded-3xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold">Published</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-white tracking-tight">{publishedProjects}</span>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                {publishedPercent}% ratio
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 mt-3 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${publishedPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="admin-card-glow rounded-3xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold">Drafts</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-white tracking-tight">{draftProjects}</span>
              <span className="text-[10px] text-amber-400 font-mono font-semibold">Private</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 mt-3 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${totalProjects > 0 ? (draftProjects / totalProjects) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="admin-card-glow rounded-3xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold">Featured Showcase</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-white tracking-tight">{featuredProjects}</span>
              <span className="text-[10px] text-purple-400 font-mono font-semibold">Hero list</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 mt-3 overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${totalProjects > 0 ? (featuredProjects / totalProjects) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="admin-card-glow rounded-3xl p-5 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Skills</span>
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-white tracking-tight">{totalSkills}</span>
              <span className="text-[10px] text-sky-400 font-mono font-semibold">Categorized</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-sky-400 h-full rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Hub Grid */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#B600A8]" /> Management Shortcuts
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/projects/new"
            className="p-4 rounded-2xl bg-[#14141A] border border-white/5 hover:border-[#B600A8]/40 hover:bg-white/[0.04] transition-all group flex items-center gap-3 cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-[#B600A8]/10 text-[#E266DA] group-hover:scale-110 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase group-hover:text-[#E266DA] transition-colors">
                Add Project
              </h4>
              <p className="text-[10px] text-gray-400">Create showcase item</p>
            </div>
          </Link>

          <Link
            to="/admin/skills"
            className="p-4 rounded-2xl bg-[#14141A] border border-white/5 hover:border-sky-500/40 hover:bg-white/[0.04] transition-all group flex items-center gap-3 cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase group-hover:text-sky-400 transition-colors">
                Manage Skills
              </h4>
              <p className="text-[10px] text-gray-400">Add or edit tech stack</p>
            </div>
          </Link>

          <Link
            to="/admin/about"
            className="p-4 rounded-2xl bg-[#14141A] border border-white/5 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all group flex items-center gap-3 cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase group-hover:text-emerald-400 transition-colors">
                Edit Profile
              </h4>
              <p className="text-[10px] text-gray-400">Update bio & avatar</p>
            </div>
          </Link>

          <Link
            to="/admin/services"
            className="p-4 rounded-2xl bg-[#14141A] border border-white/5 hover:border-[#B600A8]/40 hover:bg-white/[0.04] transition-all group flex items-center gap-3 cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-[#B600A8]/10 text-[#E266DA] group-hover:scale-110 transition-transform">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase group-hover:text-[#E266DA] transition-colors">
                Manage Services
              </h4>
              <p className="text-[10px] text-gray-400">Edit offerings ({services.length})</p>
            </div>
          </Link>

          <Link
            to="/admin/contact"
            className="p-4 rounded-2xl bg-[#14141A] border border-white/5 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all group flex items-center gap-3 cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase group-hover:text-purple-400 transition-colors">
                Contact Links
              </h4>
              <p className="text-[10px] text-gray-400">Social profiles & email</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Projects Table & Search */}
      <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-[#B600A8]" /> Recent Projects Overview
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Quick access to recently updated portfolio projects
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Quick Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-xs transition-all"
              />
            </div>

            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-1.5 text-xs text-[#E266DA] hover:underline uppercase tracking-wider font-semibold whitespace-nowrap"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/20">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#181822] uppercase text-[10px] tracking-wider text-gray-400 border-b border-white/10">
              <tr>
                <th className="py-3.5 px-5">Project Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRecentProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No matching projects found.
                  </td>
                </tr>
              ) : (
                filteredRecentProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={project.thumbnailUrl}
                          alt={project.name}
                          className="w-12 h-9 rounded-lg object-cover bg-gray-900 border border-white/10 group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <span className="font-bold text-white text-xs block group-hover:text-[#E266DA] transition-colors">
                            {project.name}
                          </span>
                          <span className="text-[10px] text-gray-400 block truncate max-w-xs font-light">
                            {project.shortDescription}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-400 font-medium">{project.category}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
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
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {project.featured ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#B600A8]/20 text-[#E266DA] border border-[#B600A8]/40 text-[10px] font-bold uppercase">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      ) : (
                        <span className="text-gray-500 text-[11px]">Standard</span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Link
                        to={`/admin/projects/edit/${project.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#B600A8]/20 hover:text-white text-gray-300 transition-all text-xs font-medium border border-white/10"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

