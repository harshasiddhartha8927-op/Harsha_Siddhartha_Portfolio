import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Sparkles,
  Image as ImageIcon,
  Link as LinkIcon,
  Code2,
  AlertCircle,
  X,
  Eye,
  BookOpen,
  Trash2,
} from 'lucide-react';
import type { Project, ProjectStatus } from '../types/portfolio';
import { ImageUploadInput } from './ImageUploadInput';

const SUGGESTED_TECHS = [
  'React',
  'TypeScript',
  'Python',
  'PyTorch',
  'Tailwind CSS',
  'FastAPI',
  'Node.js',
  'Next.js',
  'OpenCV',
  'Docker',
  'PostgreSQL',
  'Framer Motion',
];

export const AdminProjectForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { projects, addProject, updateProject } = usePortfolio();
  const navigate = useNavigate();

  const isEditing = Boolean(id);
  const existingProject = isEditing ? projects.find((p) => p.id === id) : undefined;

  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    category: 'Generative AI & Web Dev',
    shortDescription: '',
    detailedDescription: '',
    status: 'published' as ProjectStatus,
    featured: true,
    technologies: {
      all: [],
      frontend: [],
      backend: [],
      ai: [],
    },
    story: {
      problem: '',
      solution: '',
      features: [],
      role: '',
      challenges: '',
      learned: '',
      futureImprovements: '',
    },
    links: {
      github: '',
      live: '',
      demo: '',
    },
    thumbnailUrl:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    videoUrl: '',
  });

  const [techList, setTechList] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');

  const [featureItems, setFeatureItems] = useState<string[]>([]);
  const [newFeatureInput, setNewFeatureInput] = useState('');

  const [error, setError] = useState('');
  const [showLivePreview, setShowLivePreview] = useState(false);

  useEffect(() => {
    if (isEditing && existingProject) {
      setFormData(existingProject);
      setTechList(existingProject.technologies?.all || []);
      setFeatureItems(existingProject.story?.features || []);
    }
  }, [isEditing, existingProject]);

  // Handle adding tech tag
  const handleAddTech = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !techList.includes(trimmed)) {
      setTechList([...techList, trimmed]);
      setTechInput('');
    }
  };

  const handleTechInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTech(techInput);
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setTechList(techList.filter((t) => t !== techToRemove));
  };

  // Handle adding key feature
  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setFeatureItems([...featureItems, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatureItems(featureItems.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.shortDescription) {
      setError('Please fill in all required fields (Name, Category, Short Description).');
      return;
    }

    const finalProjectData: Omit<Project, 'id' | 'createdAt'> = {
      name: formData.name || '',
      category: formData.category || 'Generative AI & Web Dev',
      shortDescription: formData.shortDescription || '',
      detailedDescription: formData.detailedDescription || '',
      status: (formData.status as ProjectStatus) || 'published',
      featured: Boolean(formData.featured),
      technologies: {
        all: techList,
        frontend: formData.technologies?.frontend || [],
        backend: formData.technologies?.backend || [],
        ai: formData.technologies?.ai || [],
      },
      story: {
        problem: formData.story?.problem || '',
        solution: formData.story?.solution || '',
        features: featureItems,
        role: formData.story?.role || '',
        challenges: formData.story?.challenges || '',
        learned: formData.story?.learned || '',
        futureImprovements: formData.story?.futureImprovements || '',
      },
      links: {
        github: formData.links?.github || '',
        live: formData.links?.live || '',
        demo: formData.links?.demo || '',
      },
      thumbnailUrl: formData.thumbnailUrl || '',
      col1Img1: formData.col1Img1 || formData.thumbnailUrl || '',
      col1Img2: formData.col1Img2 || formData.thumbnailUrl || '',
      col2Img: formData.col2Img || formData.thumbnailUrl || '',
      videoUrl: formData.videoUrl || '',
    };

    if (isEditing && id) {
      updateProject(id, finalProjectData);
    } else {
      addProject(finalProjectData);
    }

    navigate('/admin/projects');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/admin/projects')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#E266DA]" />
            {showLivePreview ? 'Hide Card Preview' : 'Live Card Preview'}
          </button>

          <span className="px-3 py-1 rounded-full bg-[#B600A8]/20 text-[#E266DA] border border-[#B600A8]/40 text-[10px] font-bold uppercase tracking-widest">
            {isEditing ? 'Edit Mode' : 'New Creator'}
          </span>
        </div>
      </div>

      {/* Collapsible Live Preview Card Box */}
      <AnimatePresence>
        {showLivePreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#12121A] border border-[#B600A8]/40 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 led-pulse-green"></span>
                  Public Portfolio Live Card Simulation
                </span>
                <span className="text-[10px] text-gray-500 font-mono">Real-time update</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0A0A0C] border border-white/10 flex flex-col md:flex-row gap-5 items-center">
                <img
                  src={
                    formData.thumbnailUrl ||
                    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85'
                  }
                  alt="Preview"
                  className="w-full md:w-44 h-32 rounded-xl object-cover border border-white/10"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#E266DA] uppercase tracking-wider font-bold">
                      {formData.category || 'Category Placeholder'}
                    </span>
                    {formData.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-[#B600A8]/30 text-white text-[9px] font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase">
                    {formData.name || 'Project Name Preview'}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {formData.shortDescription || 'Short description preview will appear here.'}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {techList.slice(0, 5).map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-white/5 rounded text-[9px] font-mono text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: Basic Information */}
        <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B600A8]" /> Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Project Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Traffic Violation Intelligence"
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Category <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Generative AI & Web Dev"
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
              Short Description <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief 1-sentence summary displayed on portfolio cards"
              className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
              Detailed Overview
            </label>
            <textarea
              rows={4}
              value={formData.detailedDescription}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              placeholder="Detailed explanation of architecture, technical scope, and implementation details..."
              className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm leading-relaxed transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Publish Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white focus:outline-none focus:border-[#B600A8] text-sm transition-all"
              >
                <option value="published">Published (Publicly Visible)</option>
                <option value="draft">Draft (Private in Admin)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Featured Toggle
              </label>
              <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#181820] border border-white/10 cursor-pointer hover:border-[#B600A8]/40 transition-all">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#B600A8] cursor-pointer"
                />
                <span className="text-xs uppercase font-semibold text-white">
                  Feature on Portfolio Home Page
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: Interactive Technologies Tag Input */}
        <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#B600A8]" /> Technologies &amp; Tech Stack
          </h2>

          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
              Add Technologies (Press Enter or Comma to add)
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechInputKeyDown}
                placeholder="Type tech name (e.g. PyTorch) & press Enter..."
                className="flex-1 px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm font-mono transition-all"
              />
              <button
                type="button"
                onClick={() => handleAddTech(techInput)}
                className="px-5 py-3 rounded-xl bg-[#B600A8] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#B600A8]/80 transition-all cursor-pointer shadow-lg"
              >
                Add Chip
              </button>
            </div>

            {/* Active Tech Tag Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {techList.length === 0 ? (
                <span className="text-xs text-gray-500 italic">No technology tags added yet.</span>
              ) : (
                techList.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#B600A8]/20 to-[#8B5CF6]/20 border border-[#B600A8]/40 text-white text-xs font-mono font-medium shadow-md"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="p-0.5 rounded-full hover:bg-white/20 text-gray-300 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Suggested Quick Tech Chips */}
            <div className="pt-3 border-t border-white/5">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold block mb-2">
                Quick Add Suggestions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_TECHS.map((sug) => {
                  const isAdded = techList.includes(sug);
                  return (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => (isAdded ? handleRemoveTech(sug) : handleAddTech(sug))}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {isAdded ? `✓ ${sug}` : `+ ${sug}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Project Story & Dynamic Key Features Builder */}
        <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#B600A8]" /> Project Story &amp; Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Problem Statement
              </label>
              <textarea
                rows={3}
                value={formData.story?.problem}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    story: { ...formData.story, problem: e.target.value },
                  })
                }
                placeholder="What core problem or challenge does this project solve?"
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Solution &amp; Architecture
              </label>
              <textarea
                rows={3}
                value={formData.story?.solution}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    story: { ...formData.story, solution: e.target.value },
                  })
                }
                placeholder="How was the solution engineered and implemented?"
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
              />
            </div>
          </div>

          {/* Dynamic Key Features List Builder */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
              Key Features List
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={newFeatureInput}
                onChange={(e) => setNewFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="Add a feature point (e.g. Real-time license plate OCR)..."
                className="flex-1 px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer border border-white/10"
              >
                Add Item
              </button>
            </div>

            <div className="space-y-2 pt-2">
              {featureItems.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#181822] border border-white/5 text-xs text-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#B600A8]/20 text-[#E266DA] font-mono text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{feat}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-1 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                My Role
              </label>
              <input
                type="text"
                value={formData.story?.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    story: { ...formData.story, role: e.target.value },
                  })
                }
                placeholder="e.g. Lead Generative AI & Full-Stack Engineer"
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Challenges Overcome
              </label>
              <input
                type="text"
                value={formData.story?.challenges}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    story: { ...formData.story, challenges: e.target.value },
                  })
                }
                placeholder="Key technical hurdles mastered during development..."
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Project Links */}
        <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-[#B600A8]" /> Project Links &amp; URLs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                GitHub Repository
              </label>
              <input
                type="url"
                value={formData.links?.github}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    links: { ...formData.links, github: e.target.value },
                  })
                }
                placeholder="https://github.com/your-username/repo"
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm font-mono transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Live Deployment URL
              </label>
              <input
                type="text"
                value={formData.links?.live}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    links: { ...formData.links, live: e.target.value },
                  })
                }
                placeholder="https://myproject.com or #contact"
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm font-mono transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                Video Demo Link
              </label>
              <input
                type="url"
                value={formData.links?.demo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    links: { ...formData.links, demo: e.target.value },
                  })
                }
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-sm font-mono transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Media & Images with Dropzone */}
        <div className="bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#B600A8]" /> Project Showcase Media
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ImageUploadInput
              label="Thumbnail Card Image"
              value={formData.thumbnailUrl || ''}
              onChange={(url) => setFormData({ ...formData, thumbnailUrl: url })}
              helpText="Primary card thumbnail displayed on the projects list grid."
            />

            <ImageUploadInput
              label="Gallery Tall Featured Image (Col 2)"
              value={formData.col2Img || ''}
              onChange={(url) => setFormData({ ...formData, col2Img: url })}
              helpText="Tall featured showcase image for the right side of the project modal."
            />

            <ImageUploadInput
              label="Gallery Top Screenshot (Col 1 Img 1)"
              value={formData.col1Img1 || ''}
              onChange={(url) => setFormData({ ...formData, col1Img1: url })}
              helpText="First detailed screenshot for the project modal."
            />

            <ImageUploadInput
              label="Gallery Bottom Screenshot (Col 1 Img 2)"
              value={formData.col1Img2 || ''}
              onChange={(url) => setFormData({ ...formData, col1Img2: url })}
              helpText="Second detailed screenshot for the project modal."
            />
          </div>
        </div>

        {/* Submit Action Bar */}
        <div className="flex justify-end items-center gap-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-8 py-3.5 rounded-2xl border border-white/10 text-gray-300 hover:bg-white/10 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-10 py-3.5 rounded-2xl bg-gradient-to-r from-[#B600A8] to-[#8B5CF6] text-white font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-[#B600A8]/25 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Project
          </button>
        </div>
      </form>
    </motion.div>
  );
};

