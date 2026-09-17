import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { usePortfolio } from '../context/PortfolioContext';

export const HeroSection: React.FC = () => {
  const { about } = usePortfolio();

  const portraitUrl =
    about.avatarUrl ||
    'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden z-0">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[13vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[17vw] mt-6 sm:mt-4 md:-mt-5 select-none">
            Hi, i&apos;m harsha
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait with Magnet effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="flex justify-center items-end"
          >
            <img
              src={portraitUrl}
              alt={about.name}
              className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] h-auto object-contain pointer-events-none drop-shadow-2xl"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="w-full flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20 mt-auto">
        {/* Left Text */}
        <FadeIn delay={0.35} y={20}>
          <div className="flex flex-col">
            <span className="text-[#D7E2EA]/60 font-medium uppercase text-[10px] sm:text-xs tracking-widest">
              {about.education} &bull; {about.specialization}
            </span>
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.4rem)] max-w-[170px] sm:max-w-[230px] md:max-w-[280px]">
              a computer science &amp; generative ai developer crafting striking projects
            </p>
          </div>
        </FadeIn>

        {/* Right Contact Button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton href="/contact" />
        </FadeIn>
      </div>
    </section>
  );
};
