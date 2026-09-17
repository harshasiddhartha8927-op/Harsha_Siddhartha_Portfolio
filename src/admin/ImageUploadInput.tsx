import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, ZoomIn } from 'lucide-react';

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  helpText?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Choose file or paste image URL...',
  required = false,
  className = '',
  helpText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {value && (
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 led-pulse-green"></span>
            Asset Attached
          </span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag & Drop Dropzone Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-4 transition-all duration-200 ${
          isDragging
            ? 'border-[#B600A8] bg-[#B600A8]/10'
            : value
            ? 'border-white/15 bg-white/[0.02]'
            : 'border-white/10 hover:border-white/20 bg-white/[0.01]'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* File Picker Trigger */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B600A8]/20 to-[#8B5CF6]/20 border border-[#B600A8]/40 hover:border-[#B600A8]/70 hover:from-[#B600A8]/30 hover:to-[#8B5CF6]/30 text-white font-medium text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-lg shadow-[#B600A8]/10"
          >
            <Upload className="w-4 h-4 text-[#E266DA]" />
            Browse File
          </button>

          {/* URL Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <LinkIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#B600A8] text-xs font-mono transition-all"
              required={required}
            />
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                title="Clear Image"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-[10px] text-gray-500 mt-2 text-center sm:text-left">
          Drag &amp; drop your image here, or paste an external HTTP image link.
        </p>
      </div>

      {helpText && <p className="text-[11px] text-gray-400 font-light">{helpText}</p>}

      {/* Live Image Preview Thumbnail Card */}
      {value && (
        <div className="mt-2 relative inline-block group">
          <div className="p-2 rounded-2xl bg-[#16161D] border border-white/10 inline-flex items-center gap-3.5 shadow-xl">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center shrink-0 group/img cursor-pointer"
                 onClick={() => setZoomModalOpen(true)}>
              {value.startsWith('data:') || value.startsWith('http') || value.startsWith('/') ? (
                <>
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </>
              ) : (
                <ImageIcon className="w-6 h-6 text-gray-600" />
              )}
            </div>

            <div className="pr-4">
              <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">
                Active Source
              </span>
              <span className="text-[11px] text-gray-300 truncate max-w-[220px] block font-mono mt-0.5">
                {value.startsWith('data:') ? 'Local File (Base64)' : value}
              </span>
              <button
                type="button"
                onClick={() => setZoomModalOpen(true)}
                className="text-[10px] text-[#E266DA] hover:underline uppercase tracking-wider font-semibold mt-1 inline-flex items-center gap-1 cursor-pointer"
              >
                <ZoomIn className="w-3 h-3" /> Inspect Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {zoomModalOpen && value && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-[#121218] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="text-xs uppercase tracking-wider font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#B600A8]" /> Asset Inspection: {label}
              </h4>
              <button
                type="button"
                onClick={() => setZoomModalOpen(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black/80 max-h-[70vh] flex items-center justify-center border border-white/5 p-2">
              <img src={value} alt={label} className="max-h-[60vh] max-w-full object-contain rounded-xl" />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setZoomModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-white/10 text-white text-xs uppercase font-medium hover:bg-white/20 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

