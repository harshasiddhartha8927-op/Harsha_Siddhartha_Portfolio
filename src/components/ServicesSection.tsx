import React from 'react';
import { FadeIn } from './FadeIn';
import { usePortfolio } from '../context/PortfolioContext';

export const ServicesSection: React.FC = () => {
  const { services } = usePortfolio();

  // Filter published services
  const publishedServices = services.filter((s) => s.status !== 'draft');

  return (
    <section
      id="services"
      className="relative bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-0"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2 className="font-black uppercase text-center text-[#0C0C0C] text-[clamp(3rem,12vw,160px)] leading-none mb-16 sm:mb-20 md:mb-28 select-none">
          Services
        </h2>
      </FadeIn>

      {/* Services List */}
      <div className="max-w-5xl mx-auto border-t border-[#0C0C0C]/15">
        {publishedServices.map((item, i) => {
          // Format index as two digits e.g. 01, 02, 03...
          const formattedIndex = String(i + 1).padStart(2, '0');

          return (
            <FadeIn key={item.id} delay={i * 0.1} y={30}>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12 gap-4 md:gap-8 group hover:bg-[#0C0C0C]/[0.02] transition-colors duration-300 px-2 sm:px-4 rounded-xl">
                {/* Number */}
                <div className="font-black text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] leading-none select-none flex-shrink-0 min-w-[120px] sm:min-w-[180px] md:min-w-[220px]">
                  {formattedIndex}
                </div>

                {/* Name + Description stacked */}
                <div className="flex flex-col justify-center gap-2 max-w-2xl flex-grow">
                  <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)] tracking-tight">
                    {item.name}
                  </h3>
                  <p className="font-light leading-relaxed text-[#0C0C0C]/60 text-[clamp(0.85rem,1.6vw,1.25rem)] max-w-2xl">
                    {item.description}
                  </p>
                  {item.detailedDescription && (
                    <p className="font-light text-xs text-[#0C0C0C]/40 mt-1">
                      {item.detailedDescription}
                    </p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#0C0C0C]/5 text-[#0C0C0C]/70 border border-[#0C0C0C]/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};
