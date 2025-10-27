from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from datetime import datetime
import traceback

# Import tool modules
from tools.feature_extractor import FeatureExtractorTool

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'available_tools': ['feature-extractor']
    })

@app.route('/api/tools', methods=['GET'])
def get_tools():
    """Get list of available tools"""
    tools = [
        {
            'id': 'feature-extractor',
            'name': 'Feature Extractor',
            'description': 'Extract and visualize keypoints from images using SIFT, ORB, AKAZE, or BRISK',
            'status': 'active',
            'methods': ['SIFT', 'ORB', 'AKAZE', 'BRISK']
        },
        # Add more tools here as you build them
        {
            'id': '3d-reconstruction-benchmark',
            'name': '3D Reconstruction Benchmark',
            'description': 'Compare different methods to reconstruct 3D scenes from images',
            'status': 'coming-soon',
            'methods': ['colmap', 'MapAnything', 'other stuff']
        },
        {
            'id': 'underwater-tracking',
            'name': 'Underwater Object Tracking',
            'description': 'Track and analyze underwater objects in video footage',
            'status': 'coming-soon'
        }
    ]
    return jsonify(tools)

@app.route('/api/tools/feature-extractor', methods=['POST'])
def feature_extractor():
    """Process image with feature extraction"""
    try:
        # Validate request
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Allowed: png, jpg, jpeg, gif, bmp, webp'}), 400
        
        # Get method parameter
        method = request.form.get('method', 'SIFT')
        if method not in ['SIFT', 'ORB', 'AKAZE', 'BRISK']:
            return jsonify({'error': 'Invalid method. Choose from: SIFT, ORB, AKAZE, BRISK'}), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{timestamp}_{filename}")
        file.save(input_path)
        
        # Process with feature extractor
        tool = FeatureExtractorTool(method=method)
        result = tool.process(input_path, app.config['OUTPUT_FOLDER'])
        
        # Clean up input file
        os.remove(input_path)
        
        return jsonify(result)
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'error': 'Processing failed',
            'message': str(e)
        }), 500

@app.route('/api/outputs/<path:filename>', methods=['GET'])
def serve_output(filename):
    """Serve output images"""
    try:
        return send_file(
            os.path.join(app.config['OUTPUT_FOLDER'], filename),
            mimetype='image/png'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 404

# Error handlers
@app.errorhandler(413)
def too_large(e):
    return jsonify({'error': 'File too large. Maximum size is 16MB'}), 413

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(e):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    print("Server running at http://localhost:5001")
    print("Available tools: Feature Extractor")
    app.run(debug=True, host='0.0.0.0', port=5001)