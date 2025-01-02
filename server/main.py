from flask import Flask, request, jsonify
import utils
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS to allow the React frontend to communicate with the Flask server
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/hi', methods=['GET'])
def hello():
    return 'hi ja parawar ke ahaas'

@app.route('/classify_image', methods=['POST'])
def classify_image():
    try:
        # Extract image data from the JSON body
        data = request.json  # This expects a JSON body
        image_data = data.get('image_data')

        if not image_data:
            return jsonify({'error': 'No image data provided'}), 400

        # Classify the image using utils
        result = utils.classify_image(image_data)

        # Print the result in the terminal (before returning it)
        print("Classification Result:", result)

        # Return the result as a JSON response
        response = jsonify(result)
        response.headers.add('Access-Control-Allow-Origin', '*')  # Add CORS headers
        return response

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":

    print("Starting Python Flask Server For Sports Celebrity Image Classification on port 5000")
    
    utils.load_saved_artifacts()  # Load pre-trained model and dictionary

    app.run(debug=True, port=5000)
