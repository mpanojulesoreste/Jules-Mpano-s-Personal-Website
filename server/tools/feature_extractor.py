import cv2
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend for web
import matplotlib.pyplot as plt
import os
from datetime import datetime

class FeatureExtractorTool:
    """
    Feature extraction tool adapted for web backend.
    Extracts keypoints and descriptors from images using various methods.
    """
    
    def __init__(self, method='SIFT'):
        """
        Initialize feature extractor
        
        Args:
            method: 'SIFT', 'ORB', 'AKAZE', or 'BRISK'
        """
        self.method = method
        self.detector = self._get_detector(method)
    
    def _get_detector(self, method):
        """Get the appropriate feature detector"""
        detectors = {
            'SIFT': cv2.SIFT_create,
            'ORB': cv2.ORB_create,
            'AKAZE': cv2.AKAZE_create,
            'BRISK': cv2.BRISK_create
        }
        
        if method not in detectors:
            raise ValueError(f"Unknown method: {method}. Choose from: {list(detectors.keys())}")
        
        return detectors[method]()
    
    def extract_features(self, image_path):
        """
        Extract keypoints and descriptors from an image
        
        Args:
            image_path: Path to the input image
            
        Returns:
            tuple: (keypoints, descriptors, gray_image)
        """
        # Load image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not load image: {image_path}")
        
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Detect keypoints and compute descriptors
        keypoints, descriptors = self.detector.detectAndCompute(gray, None)
        
        return keypoints, descriptors, gray
    
    def visualize_features(self, gray_image, keypoints, output_path):
        """
        Create visualization of detected features
        
        Args:
            gray_image: Grayscale image
            keypoints: Detected keypoints
            output_path: Path to save visualization
        """
        # Draw keypoints on image
        image_with_keypoints = cv2.drawKeypoints(
            gray_image, 
            keypoints, 
            None,
            flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS
        )
        
        # Create figure
        plt.figure(figsize=(12, 8))
        plt.imshow(image_with_keypoints, cmap='gray')
        plt.title(f'{self.method} Features: {len(keypoints)} keypoints detected', 
                 fontsize=16, pad=20)
        plt.axis('off')
        
        # Save with high quality
        plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
        plt.close()
    
    def get_feature_statistics(self, keypoints, descriptors):
        """
        Calculate detailed statistics about extracted features
        
        Returns:
            dict: Feature statistics
        """
        stats = {
            'num_keypoints': len(keypoints),
            'descriptor_shape': list(descriptors.shape) if descriptors is not None else None,
            'descriptor_dtype': str(descriptors.dtype) if descriptors is not None else None,
        }
        
        if keypoints:
            # Extract keypoint properties
            sizes = [kp.size for kp in keypoints]
            angles = [kp.angle for kp in keypoints]
            responses = [kp.response for kp in keypoints]
            
            stats.update({
                'avg_size': float(np.mean(sizes)),
                'std_size': float(np.std(sizes)),
                'avg_response': float(np.mean(responses)),
                'std_response': float(np.std(responses)),
                'size_range': {
                    'min': float(np.min(sizes)),
                    'max': float(np.max(sizes))
                },
                'response_range': {
                    'min': float(np.min(responses)),
                    'max': float(np.max(responses))
                }
            })
        
        return stats
    
    def process(self, input_path, output_dir):
        """
        Main processing pipeline for web backend
        
        Args:
            input_path: Path to input image
            output_dir: Directory to save outputs
            
        Returns:
            dict: Processing results with paths and statistics
        """
        # Extract features
        keypoints, descriptors, gray = self.extract_features(input_path)
        
        # Generate output filename
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_filename = f"features_{self.method}_{timestamp}.png"
        output_path = os.path.join(output_dir, output_filename)
        
        # Create visualization
        self.visualize_features(gray, keypoints, output_path)
        
        # Get statistics
        stats = self.get_feature_statistics(keypoints, descriptors)
        
        # Prepare result
        result = {
            'success': True,
            'method': self.method,
            'image_url': f'/api/outputs/{output_filename}',
            'statistics': stats,
            'message': f'Successfully detected {len(keypoints)} keypoints using {self.method}'
        }
        
        return result


def compare_methods(image_path, output_dir):
    """
    Compare all feature detection methods on the same image
    
    Args:
        image_path: Path to input image
        output_dir: Directory to save comparison
        
    Returns:
        dict: Comparison results
    """
    methods = ['SIFT', 'ORB', 'AKAZE', 'BRISK']
    results = {}
    
    for method in methods:
        try:
            tool = FeatureExtractorTool(method=method)
            result = tool.process(image_path, output_dir)
            results[method] = result
        except Exception as e:
            results[method] = {
                'success': False,
                'error': str(e)
            }
    
    return results