import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, CheckCircle, XCircle, Download } from 'lucide-react';
import { apiClient } from '../utils/api';
import type { FeatureExtractionResult } from '../types';

const FeatureExtractor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [method, setMethod] = useState<string>('SIFT');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FeatureExtractionResult | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const methods = [
    { value: 'SIFT', label: 'SIFT', description: 'Scale-Invariant Feature Transform - robust to scaling' },
    { value: 'ORB', label: 'ORB', description: 'Oriented FAST - faster, good for real-time' },
    { value: 'AKAZE', label: 'AKAZE', description: 'Accelerated-KAZE - fast and accurate' },
    { value: 'BRISK', label: 'BRISK', description: 'Binary Robust Invariant - efficient binary descriptor' },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 16 * 1024 * 1024) {
        setError('File size must be less than 16MB');
        return;
      }
      
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    
    if (file && file.type.startsWith('image/')) {
      if (file.size > 16 * 1024 * 1024) {
        setError('File size must be less than 16MB');
        return;
      }
      
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await apiClient.extractFeatures(selectedFile, method);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Feature Extractor
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Extract and visualize keypoints from images using various computer vision algorithms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Input */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Upload Image
            </h3>
            
            {!selectedFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-primary-400 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  PNG, JPG, GIF up to 16MB
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <ImageIcon className="w-4 h-4" />
                    <span className="truncate max-w-xs">{selectedFile.name}</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline"
                  >
                    Remove
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
            />
          </div>

          {/* Method Selection */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Detection Method
            </h3>
            
            <div className="space-y-3">
              {methods.map((m) => (
                <label
                  key={m.value}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    method === m.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value={m.value}
                    checked={method === m.value}
                    onChange={(e) => setMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{m.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{m.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Process Button */}
          <button
            onClick={handleProcess}
            disabled={!selectedFile || loading}
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Extract Features
              </>
            )}
          </button>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3 animate-slide-down">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-900 dark:text-red-200">Error</p>
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* Success Message */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-200">Success!</p>
                  <p className="text-sm text-green-700 dark:text-green-300">{result.message}</p>
                </div>
              </div>

              {/* Visualization */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Detected Features
                  </h3>
                  <a
                    href={apiClient.getOutputUrl(result.image_url)}
                    download
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={apiClient.getOutputUrl(result.image_url)}
                    alt="Feature visualization"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Keypoints</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {result.statistics.num_keypoints}
                    </p>
                  </div>
                  {result.statistics.avg_size && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Size</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {result.statistics.avg_size.toFixed(2)}
                      </p>
                    </div>
                  )}
                  {result.statistics.avg_response && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Avg Response</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {result.statistics.avg_response.toFixed(4)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder */}
          {!result && !error && !loading && (
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
              <p className="text-gray-500 dark:text-gray-500">
                Results will appear here after processing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureExtractor;