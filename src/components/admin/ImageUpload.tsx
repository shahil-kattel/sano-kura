"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  HardDrive,
  Link as LinkIcon,
  RefreshCw,
} from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image Upload (From Computer)",
  helperText = "Upload high-resolution PNG, JPG, JPEG, WEBP or GIF from your local computer",
  required = false,
  className = "",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WEBP, etc.)");
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));

    // Try uploading to server endpoint /api/upload
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          onChange(data.url);
          setIsUploading(false);
          return;
        }
      }
      throw new Error("Upload endpoint returned error, falling back to local reader");
    } catch (err) {
      // Fallback: Read as base64 data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
        setIsUploading(false);
      };
      reader.onerror = () => {
        setErrorMessage("Failed to read file from computer");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
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
      handleFileProcess(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setFileName(null);
    setFileSize(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-red-500" />
            <span>{label}</span>
            {required && <span className="text-red-500">*</span>}
          </span>
        </label>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-slate-400 hover:text-slate-200 transition flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? "Hide Direct URL" : "Or paste image link"}</span>
        </button>
      </div>

      {/* Main Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !value && fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 transition-all p-4 ${
          value
            ? "border-slate-800 bg-slate-950/60"
            : isDragging
            ? "border-red-500 bg-red-500/10 shadow-lg shadow-red-500/10 cursor-pointer"
            : "border-dashed border-slate-700 hover:border-slate-500 bg-slate-950/40 hover:bg-slate-950/70 cursor-pointer"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* If Image is Uploaded & Present */}
        {value ? (
          <div className="space-y-3">
            <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group">
              <img
                src={value}
                alt="Uploaded media preview"
                className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full text-[11px] font-semibold shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Image Loaded from Computer</span>
              </div>

              {/* Top Right Controls */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-md cursor-pointer"
                  title="Upload different image"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
                  <span>Replace</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="bg-red-600/90 hover:bg-red-600 text-white p-1.5 rounded-lg transition shadow-md cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Metadata bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                <span className="truncate max-w-[260px] sm:max-w-md font-mono text-[11px] bg-slate-950/70 px-2.5 py-1 rounded-md border border-slate-800/80 backdrop-blur-xs">
                  {fileName || value.split("/").pop()}
                </span>
                {fileSize && (
                  <span className="text-[11px] text-slate-400 bg-slate-950/70 px-2 py-1 rounded-md border border-slate-800/80 backdrop-blur-xs">
                    {fileSize}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Action below image */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 px-1">
              <span>Looking good! This image will appear across your story and portal cards.</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-red-400 hover:text-red-300 font-semibold cursor-pointer underline underline-offset-4"
              >
                Choose another file from computer
              </button>
            </div>
          </div>
        ) : isUploading ? (
          /* Loading State */
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
            <p className="text-sm font-bold text-white">Saving file from computer...</p>
            <p className="text-xs text-slate-400">Processing image and generating portal preview</p>
          </div>
        ) : (
          /* Empty / Upload Prompt State */
          <div className="py-10 px-4 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shadow-inner group-hover:scale-105 transition">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-white">
                Drag and drop image here, or{" "}
                <span className="text-red-400 underline underline-offset-4 font-extrabold hover:text-red-300">
                  browse computer
                </span>
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">{helperText}</p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700 hover:border-slate-600 transition shadow-sm cursor-pointer"
            >
              <HardDrive className="w-3.5 h-3.5 text-red-400" />
              <span>Select File from Computer</span>
            </button>
          </div>
        )}
      </div>

      {/* Optional fallback input for URL if toggled */}
      {showUrlInput && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5 animate-in fade-in">
          <label className="block text-[11px] font-semibold text-slate-400">
            Direct Image Link (Web / CDN URL)
          </label>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-red-500"
          />
        </div>
      )}

      {/* Error notification */}
      {errorMessage && (
        <div className="p-2.5 bg-red-950/80 border border-red-500/40 text-red-300 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
