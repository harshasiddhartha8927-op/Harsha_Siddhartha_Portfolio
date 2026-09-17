import React from 'react';
import { FadeIn } from './FadeIn';
import { usePortfolio } from '../context/PortfolioContext';
import { Code2, Server, Cpu, Globe } from 'lucide-react';
import type { SkillCategory } from '../types/portfolio';

const categoryIcons: Record<SkillCategory, React.ReactNode> = {
  Frontend: <Code2 className="w-6 h-6 text-[#BBCCD7]" />,
  Backend: <Server className="w-6 h-6 text-[#BBCCD7]" />,
  AI: <Cpu className="w-6 h-6 text-[#B600A8]" />,
  Development: <Globe className="w-6 h-6 text-[#BBCCD7]" />,
};

const categoryLabels: Record<SkillCategory, string> = {
  Frontend: 'Frontend Development',
  Backend: 'Backend Development',
  AI: 'Generative AI',
  Development: 'Web & System Development',
};

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();

  const categories: SkillCategory[] = ['Frontend', 'Backend', 'AI', 'Development'];

  return (
    <section
      id="skills"
      className="relative bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 border-t border-[#D7E2EA]/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none mb-16 sm:mb-20 md:mb-24 select-none">
            Skills
          </h2>
        </FadeIn>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((cat, catIdx) => {
            const catSkills = skills.filter((s) => s.category === cat);
            if (catSkills.length === 0) return null;

            return (
              <FadeIn key={cat} delay={catIdx * 0.15} y={30}>
                <div className="rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/20 bg-[#121212] p-6 sm:p-8 hover:border-[#D7E2EA]/40 transition-all duration-300 shadow-xl group">
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-6 border-b border-[#D7E2EA]/10 pb-4">
                    <div className="p-3 rounded-2xl bg-[#1C1C1C] border border-[#D7E2EA]/10 group-hover:scale-110 transition-transform">
                      {categoryIcons[cat]}
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-light">
                        Specialization
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#D7E2EA]">
                        {categoryLabels[cat]}
                      </h3>
                    </div>
                  </div>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {catSkills.map((sk) => (
                      <span
                        key={sk.id}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider bg-[#1C1C1C] text-[#D7E2EA] border border-[#D7E2EA]/15 hover:border-[#B600A8] hover:bg-[#B600A8]/10 transition-all duration-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
                        {sk.name}
                        {sk.level && (
                          <span className="text-[10px] text-[#D7E2EA]/50 font-light border-l border-[#D7E2EA]/20 pl-2">
                            {sk.level}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
