import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle, Copy, Check, Sparkles, Loader2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { contact } = usePortfolio();
  const targetEmail = contact.email || 'harshasiddhartha8927@gmail.com';

  const [visitorEmail, setVisitorEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(targetEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    // Client validation
    if (!visitorEmail.trim() || !visitorEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!subject.trim()) {
      setErrorMsg('Please enter a subject.');
      return;
    }

    if (!message.trim()) {
      setErrorMsg('Please enter your message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorEmail: visitorEmail.trim(),
          subject: subject.trim(),
          message: message.trim(),
          honeypot: honeypot.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Message sent successfully!');
        setVisitorEmail('');
        setSubject('');
        setMessage('');
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonGradientStyle: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
    outline: '2px solid white',
    outlineOffset: '-3px',
  };

  return (
    <div className="bg-[#0C0C0C] text-[#D7E2EA] font-kanit min-h-screen w-full relative overflow-x-hidden flex flex-col justify-between selection:bg-[#B600A8] selection:text-white">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B600A8]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6366F1]/10 blur-3xl pointer-events-none"></div>

      {/* Top Header / Navigation */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between relative z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-[#D7E2EA]/20 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#D7E2EA] hover:border-[#D7E2EA] hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 text-[#E266DA]" />
          <span>Return to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/60">
          <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
          <span>Direct Contact</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 relative z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-[#121218]/90 backdrop-blur-xl border border-[#D7E2EA]/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-br from-[#B600A8] via-[#7621B0] to-[#BE4C00] text-white shadow-xl shadow-[#B600A8]/20 border border-white/20 mb-1">
              <Mail className="w-7 h-7" />
            </div>
            <h1 className="hero-heading font-black uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight text-white leading-none">
              Get In Touch
            </h1>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/70 max-w-md mx-auto font-light leading-relaxed">
              Have a project, opportunity, or idea? Send me a message directly and I will get back to you promptly.
            </p>
          </div>

          {/* Email Address Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-[#D7E2EA]/15 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
            <div className="flex items-center gap-3 text-center sm:text-left min-w-0">
              <div className="p-2.5 rounded-xl bg-[#B600A8]/20 border border-[#B600A8]/30 text-[#E266DA] flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D7E2EA]/50 block">
                  Portfolio Email
                </span>
                <a
                  href={`mailto:${targetEmail}`}
                  className="text-sm sm:text-base font-medium text-white hover:text-[#E266DA] transition-colors truncate block"
                >
                  {targetEmail}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-xs uppercase tracking-wider font-semibold text-gray-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#E266DA]" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Alert Messages */}
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-3 shadow-lg shadow-emerald-500/5"
              >
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-400" />
                <div>
                  <span className="font-bold block text-emerald-200 uppercase tracking-wider text-xs">
                    Message Delivered
                  </span>
                  <span>{successMsg}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot hidden input for spam bots */}
            <input
              type="text"
              name="website_honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Visitor Email */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA] font-semibold mb-2">
                Your Email Address <span className="text-[#B600A8]">*</span>
              </label>
              <input
                type="email"
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#0C0C10] border border-[#D7E2EA]/15 text-white placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA] font-semibold mb-2">
                Subject <span className="text-[#B600A8]">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#0C0C10] border border-[#D7E2EA]/15 text-white placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8] text-sm transition-all"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA] font-semibold mb-2">
                Message <span className="text-[#B600A8]">*</span>
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="w-full px-4 py-3.5 rounded-2xl bg-[#0C0C10] border border-[#D7E2EA]/15 text-white placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8] text-sm transition-all resize-none"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                style={buttonGradientStyle}
                className="w-full py-4 rounded-full text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Back Link */}
          <div className="pt-4 border-t border-[#D7E2EA]/10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>← Return to Portfolio</span>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full text-center py-6 text-xs text-[#D7E2EA]/40 font-light border-t border-[#D7E2EA]/10 relative z-20">
        &copy; {new Date().getFullYear()} P. Harsha Siddhartha &mdash; Portfolio Contact Portal.
      </footer>
    </div>
  );
};
