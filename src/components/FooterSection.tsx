import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Mail } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const { about, contact } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 border-t border-[#D7E2EA]/10 flex flex-col justify-between overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16">
        {/* Big CTA */}
        <FadeIn delay={0.1} y={30} className="text-center flex flex-col items-center">
          <span className="text-xs sm:text-sm font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-4">
            Have a project in mind?
          </span>
          <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,8vw,100px)] leading-none mb-8 select-none">
            Let&apos;s Work Together
          </h2>
          <ContactButton href="/contact" />
        </FadeIn>

        {/* Footer Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-[#D7E2EA]/10 items-center text-center md:text-left">
          {/* Left Column */}
          <div>
            <h3 className="font-bold text-lg uppercase tracking-wider text-[#D7E2EA]">
              {about.name}
            </h3>
            <p className="font-light text-sm text-[#D7E2EA]/60 mt-1">
              {about.education} &bull; {about.specialization}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 text-[#D7E2EA]">
            {contact.twitter && (
              <a
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[#D7E2EA]/20 hover:border-[#D7E2EA] hover:scale-110 transition-all duration-200"
                aria-label="X / Twitter"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[#D7E2EA]/20 hover:border-[#D7E2EA] hover:scale-110 transition-all duration-200"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[#D7E2EA]/20 hover:border-[#D7E2EA] hover:scale-110 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            )}
            {contact.email && (
              <Link
                to="/contact"
                className="p-3 rounded-full border border-[#D7E2EA]/20 hover:border-[#D7E2EA] hover:scale-110 transition-all duration-200"
                aria-label="Contact Page"
              >
                <Mail className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Scroll to Top */}
          <div className="flex justify-center md:justify-end items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">
              Back to Top
            </span>
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full border border-[#D7E2EA]/30 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-all duration-300 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-[#D7E2EA]/40 font-light pt-4">
          &copy; {new Date().getFullYear()} {about.name} &mdash; Computer Science &amp; Generative AI Portfolio.
        </div>
      </div>
    </footer>
  );
};
