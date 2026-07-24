import axios from 'axios';
import type { Tool, FeatureExtractionResult } from './types';

// Flask/OpenCV backend (server/), deployed separately on Render.
// Override with NEXT_PUBLIC_API_URL for local dev against a local Flask server.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jules-mpano-s-personal-website.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = {
  // Health check
  healthCheck: async () => {
    const response = await api.get('/api/health');
    return response.data;
  },

  // Get available tools
  getTools: async (): Promise<Tool[]> => {
    const response = await api.get('/api/tools');
    return response.data;
  },

  // Feature Extractor
  extractFeatures: async (image: File, method: string = 'SIFT'): Promise<FeatureExtractionResult> => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('method', method);

    const response = await api.post('/api/tools/feature-extractor', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // Get output image URL
  getOutputUrl: (filename: string) => {
    return `${API_BASE_URL}${filename}`;
  },
};

export default apiClient;
