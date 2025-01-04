import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import utils

app = Flask(__name__)

# Enable CORS for specific origin
CORS(app, resources={r"/*": {"origins": os.getenv('CORS_ORIGIN')}})

@app.route('/hi', methods=['GET'])
def hello():
    return 'hi ja parawar ke ahaas'

@app.route('/classify_image', methods=['POST'])
def classify_image():
    try:
        data = request.json
        image_data = data.get('image_data')

        if not image_data:
            return jsonify({'error': 'No image data provided'}), 400

        result = utils.classify_image(image_data)
        print("Classification Result:", result)
        return jsonify(result)
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    print("Starting Python Flask Server For Sports Celebrity Image Classification")
    
    # Use an environment variable for sensitive initialization, if needed
    utils.load_saved_artifacts()
    app.run(debug=True, port=int(os.getenv("FLASK_PORT")))
