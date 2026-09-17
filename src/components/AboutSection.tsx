import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { usePortfolio } from '../context/PortfolioContext';

export const AboutSection: React.FC = () => {
  const { about } = usePortfolio();

  const moonIcon =
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png';
  const p59Icon =
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png';
  const legoIcon =
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png';
  const group134Icon =
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png';

  const fullAboutText =
    about.bio ||
    "With a strong foundation in Computer Science and Engineering and specialization in Generative AI, i focus on frontend, backend, and intelligent web applications that solve real-world problems. Let's build something incredible together!";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Decorative 3D images in 4 corners */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10"
      >
        <img
          src={moonIcon}
          alt="3D Moon"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl opacity-90 hover:scale-105 transition-transform"
        />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10"
      >
        <img
          src={p59Icon}
          alt="3D Shape"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl opacity-90 hover:scale-105 transition-transform"
        />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10"
      >
        <img
          src={legoIcon}
          alt="3D Lego"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl opacity-90 hover:scale-105 transition-transform"
        />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10"
      >
        <img
          src={group134Icon}
          alt="3D Group"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-xl opacity-90 hover:scale-105 transition-transform"
        />
      </FadeIn>

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center z-20 w-full max-w-4xl text-center my-auto">
        {/* Subtitle Badge */}
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-[#D7E2EA]/20 text-[#D7E2EA] text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-pulse" />
            {about.name} &bull; {about.education} ({about.specialization})
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] mb-10 sm:mb-14 md:mb-16 select-none">
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph */}
        <div className="w-full flex justify-center mb-16 sm:mb-20 md:mb-24">
          <AnimatedText text={fullAboutText} />
        </div>

        {/* Contact Button */}
        <FadeIn delay={0.4} y={30}>
          <ContactButton href="/contact" />
        </FadeIn>
      </div>
    </section>
  );
};
