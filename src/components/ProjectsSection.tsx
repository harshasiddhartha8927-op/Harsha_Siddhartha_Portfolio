import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import type { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  progress: any;
  onOpenDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  progress,
  onOpenDetails,
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  const scale = useTransform(
    progress,
    [index / totalCards, 1],
    [1, targetScale]
  );

  return (
    <div className="h-[85vh] flex items-center justify-center sticky top-20 md:top-28 mb-10 sm:mb-16">
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Top Row Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span className="font-black text-[#D7E2EA] text-3xl sm:text-4xl md:text-5xl leading-none select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[#D7E2EA]/70 font-light uppercase tracking-wider text-xs sm:text-sm">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest bg-[#B600A8]/20 text-[#B600A8] border border-[#B600A8]/30">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
              <h3 className="text-[#D7E2EA] font-medium uppercase text-base sm:text-xl md:text-2xl tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenDetails(project)}
              className="inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm px-5 py-2.5 hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
            >
              Details
            </button>
            {project.links?.live && (
              <LiveProjectButton href={project.links.live} />
            )}
          </div>
        </div>

        {/* Bottom Row: 2-Column Image Grid */}
        <div
          onClick={() => onOpenDetails(project)}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch cursor-pointer group"
        >
          {/* Left Column (40% width) - 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6 justify-between">
            <div className="w-full h-[clamp(130px,16vw,230px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616]">
              <img
                src={project.col1Img1 || project.thumbnailUrl}
                alt={`${project.name} preview 1`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="w-full h-[clamp(160px,22vw,340px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616]">
              <img
                src={project.col1Img2 || project.thumbnailUrl}
                alt={`${project.name} preview 2`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width) - 1 tall image */}
          <div className="md:col-span-7 h-[260px] sm:h-[340px] md:h-full min-h-[300px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616]">
            <img
              src={project.col2Img || project.thumbnailUrl}
              alt={`${project.name} main showcase`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const publishedProjects = projects.filter((p) => p.status === 'published');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none mb-16 sm:mb-20 md:mb-28 select-none">
          Project
        </h2>
      </FadeIn>

      {/* Sticky Stacking Cards */}
      <div className="relative">
        {publishedProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={publishedProjects.length}
            progress={scrollYProgress}
            onOpenDetails={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[#141414] text-[#D7E2EA] rounded-[30px] border border-[#D7E2EA]/20 p-6 sm:p-10 my-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#222222] text-[#D7E2EA] hover:bg-[#333333] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col gap-2 mb-6 border-b border-[#D7E2EA]/10 pb-6 pr-10">
                <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-[#D7E2EA]">
                  {selectedProject.name}
                </h3>
                <p className="text-sm sm:text-base text-[#D7E2EA]/70 font-light">
                  {selectedProject.shortDescription}
                </p>
              </div>

              {/* Main Image */}
              <div className="w-full h-[250px] sm:h-[360px] rounded-2xl overflow-hidden mb-8 bg-[#1E1E1E]">
                <img
                  src={selectedProject.col2Img || selectedProject.thumbnailUrl}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Technologies */}
              {selectedProject.technologies?.all && (
                <div className="mb-8">
                  <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-bold mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.all.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#222222] border border-[#D7E2EA]/15 text-[#D7E2EA]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              {selectedProject.detailedDescription && (
                <div className="mb-8">
                  <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-bold mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-[#D7E2EA]/80 font-light">
                    {selectedProject.detailedDescription}
                  </p>
                </div>
              )}

              {/* Story Sections */}
              {selectedProject.story && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-b border-[#D7E2EA]/10 py-6">
                  {selectedProject.story.problem && (
                    <div>
                      <h5 className="text-xs uppercase tracking-wider text-[#B600A8] font-bold mb-1">
                        Problem Statement
                      </h5>
                      <p className="text-xs sm:text-sm text-[#D7E2EA]/70">
                        {selectedProject.story.problem}
                      </p>
                    </div>
                  )}
                  {selectedProject.story.solution && (
                    <div>
                      <h5 className="text-xs uppercase tracking-wider text-[#B600A8] font-bold mb-1">
                        Solution &amp; Approach
                      </h5>
                      <p className="text-xs sm:text-sm text-[#D7E2EA]/70">
                        {selectedProject.story.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                {selectedProject.links?.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#222222] border border-[#D7E2EA]/30 text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-[#333333] transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub Repository
                  </a>
                )}
                {selectedProject.links?.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B600A8] text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-[#B600A8]/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> View Live Project
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
