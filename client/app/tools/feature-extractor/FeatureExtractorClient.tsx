'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { isAxiosError } from 'axios';
import { Upload, ImageIcon, Loader2, CheckCircle, XCircle, Download } from 'lucide-react';
import { apiClient } from '@/lib/api';
import type { FeatureExtractionResult } from '@/lib/types';

function extractErrorMessage(err: unknown): string | undefined {
  if (isAxiosError<{ error?: string }>(err)) {
    return err.response?.data?.error;
  }
  return undefined;
}

const METHODS = [
  { value: 'SIFT', label: 'SIFT', description: 'Scale-Invariant Feature Transform — robust to scaling' },
  { value: 'ORB', label: 'ORB', description: 'Oriented FAST — faster, good for real-time' },
  { value: 'AKAZE', label: 'AKAZE', description: 'Accelerated-KAZE — fast and accurate' },
  { value: 'BRISK', label: 'BRISK', description: 'Binary Robust Invariant — efficient binary descriptor' },
];

export default function FeatureExtractorClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [method, setMethod] = useState<string>('SIFT');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FeatureExtractionResult | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Revoke the previous blob URL whenever it's replaced or the component unmounts,
  // so selecting several files in a row doesn't leak object URLs.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const acceptFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 16 * 1024 * 1024) {
      setError('File size must be less than 16MB');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError('');
    setResult(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => acceptFile(e.target.files?.[0]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) acceptFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleProcess = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await apiClient.extractFeatures(selectedFile, method);
      setResult(data);
    } catch (err) {
      const message = extractErrorMessage(err);
      setError(message || 'Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setResult(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* Left column: input */}
      <div className="space-y-6">
        <div className="border border-slate/25 p-6">
          <h2 className="eyebrow mb-4">01 — UPLOAD IMAGE</h2>

          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
              }}
              className="cursor-pointer border-2 border-dashed border-slate/40 p-12 text-center transition-colors hover:border-abyss"
            >
              <Upload className="mx-auto mb-4 h-10 w-10 text-slate" aria-hidden="true" />
              <p className="text-sm text-ink/75">Click to upload or drag and drop</p>
              <p className="mt-1 font-mono text-xs text-slate">PNG, JPG, GIF up to 16MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden bg-ink/5">
                {/* External blob preview URL -- next/image requires a loader for
                    non-http sources, plain img is correct here. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Selected upload preview" className="h-full w-full object-contain" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-ink/70">
                  <ImageIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="max-w-xs truncate">{selectedFile.name}</span>
                </div>
                <button onClick={handleReset} className="font-mono text-xs text-abyss hover:underline">
                  REMOVE
                </button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Upload image"
          />
        </div>

        <div className="border border-slate/25 p-6">
          <h2 className="eyebrow mb-4">02 — DETECTION METHOD</h2>
          <div className="space-y-3">
            {METHODS.map((m) => (
              <label
                key={m.value}
                className={`flex items-start gap-3 border p-4 cursor-pointer transition-colors ${
                  method === m.value ? 'border-abyss bg-abyss/5' : 'border-slate/25 hover:border-slate/50'
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  value={m.value}
                  checked={method === m.value}
                  onChange={(e) => setMethod(e.target.value)}
                  className="mt-1 accent-abyss"
                />
                <div className="flex-1">
                  <div className="font-medium text-ink">{m.label}</div>
                  <div className="text-sm text-ink/65">{m.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleProcess}
          disabled={!selectedFile || loading}
          className="flex w-full items-center justify-center gap-2 bg-abyss py-4 font-medium text-paper transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Processing&hellip;
            </>
          ) : (
            'Extract Features'
          )}
        </button>
      </div>

      {/* Right column: results */}
      <div className="space-y-6">
        {error && (
          <div className="flex items-start gap-3 border border-abyss/40 p-4">
            <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-abyss" aria-hidden="true" />
            <div>
              <p className="font-medium text-ink">Error</p>
              <p className="text-sm text-ink/70">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="flex items-start gap-3 border border-slate/25 p-4">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-abyss" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">Success</p>
                <p className="text-sm text-ink/70">{result.message}</p>
              </div>
            </div>

            <div className="border border-slate/25 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="eyebrow">DETECTED FEATURES</h2>
                <a
                  href={apiClient.getOutputUrl(result.image_url)}
                  download
                  className="flex items-center gap-1 text-sm text-abyss hover:underline"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download
                </a>
              </div>
              <div className="relative aspect-video overflow-hidden bg-ink/5">
                <Image
                  src={apiClient.getOutputUrl(result.image_url)}
                  alt={`${result.method} feature visualization`}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>

            <div className="border border-slate/25 p-6">
              <h2 className="eyebrow mb-4">STATISTICS</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-xs text-slate">KEYPOINTS</p>
                  <p className="font-display text-2xl font-semibold text-ink">{result.statistics.num_keypoints}</p>
                </div>
                {result.statistics.avg_size !== undefined && (
                  <div>
                    <p className="font-mono text-xs text-slate">AVG SIZE</p>
                    <p className="font-display text-2xl font-semibold text-ink">
                      {result.statistics.avg_size.toFixed(2)}
                    </p>
                  </div>
                )}
                {result.statistics.avg_response !== undefined && (
                  <div className="col-span-2">
                    <p className="font-mono text-xs text-slate">AVG RESPONSE</p>
                    <p className="font-display text-xl font-semibold text-ink">
                      {result.statistics.avg_response.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!result && !error && !loading && (
          <div className="border border-dashed border-slate/30 p-12 text-center">
            <ImageIcon className="mx-auto mb-4 h-12 w-12 text-slate/50" aria-hidden="true" />
            <p className="text-sm text-slate">Results will appear here after processing</p>
          </div>
        )}
      </div>
    </div>
  );
}
