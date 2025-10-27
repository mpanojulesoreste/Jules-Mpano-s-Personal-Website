// Tool types
export interface Tool {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'coming-soon';
  methods?: string[];
  icon?: string;
}

// Feature Extractor types
export interface FeatureExtractionResult {
  success: boolean;
  method: string;
  image_url: string;
  statistics: FeatureStatistics;
  message: string;
}

export interface FeatureStatistics {
  num_keypoints: number;
  descriptor_shape: number[] | null;
  descriptor_dtype: string | null;
  avg_size?: number;
  std_size?: number;
  avg_response?: number;
  std_response?: number;
  size_range?: {
    min: number;
    max: number;
  };
  response_range?: {
    min: number;
    max: number;
  };
}

// API types
export interface ApiError {
  error: string;
  message?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  status: 'completed' | 'in-progress' | 'planned';
}