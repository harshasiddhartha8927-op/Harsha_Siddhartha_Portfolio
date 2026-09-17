import React from 'react';
import { Link } from 'react-router-dom';

interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ href, className = '', ...props }) => {
  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
    outline: '2px solid white',
    outlineOffset: '-3px',
  };

  const combinedClasses = `inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-transform hover:scale-105 active:scale-95 cursor-pointer ${className}`;

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link
          to={href}
          style={buttonStyle}
          className={combinedClasses}
        >
          Contact Me
        </Link>
      );
    }
    return (
      <a
        href={href}
        style={buttonStyle}
        className={combinedClasses}
      >
        Contact Me
      </a>
    );
  }

  return (
    <button
      style={buttonStyle}
      className={combinedClasses}
      {...props}
    >
      Contact Me
    </button>
  );
};
