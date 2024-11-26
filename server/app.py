from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np
import json
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Initialize MediaPipe
mp_holistic = mp.solutions.holistic
holistic = mp_holistic.Holistic(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

RECORDINGS_DIR = "recordings"
os.makedirs(RECORDINGS_DIR, exist_ok=True)

def process_frame(frame):
    # Convert the frame to RGB
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # Make detections
    results = holistic.process(image)
    
    # Extract landmarks
    pose_landmarks = results.pose_landmarks.landmark if results.pose_landmarks else None
    left_hand_landmarks = results.left_hand_landmarks.landmark if results.left_hand_landmarks else None
    right_hand_landmarks = results.right_hand_landmarks.landmark if results.right_hand_landmarks else None
    
    return {
        "pose": [[lm.x, lm.y, lm.z] for lm in pose_landmarks] if pose_landmarks else [],
        "left_hand": [[lm.x, lm.y, lm.z] for lm in left_hand_landmarks] if left_hand_landmarks else [],
        "right_hand": [[lm.x, lm.y, lm.z] for lm in right_hand_landmarks] if right_hand_landmarks else []
    }

@app.route('/api/record', methods=['POST'])
def record_gesture():
    data = request.json
    phrase = data['phrase']
    frames = data['frames']  # List of base64 encoded frames
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{phrase.replace(' ', '_')}.json"
    
    processed_frames = []
    for frame in frames:
        # Convert base64 to numpy array
        # Process frame using MediaPipe
        landmarks = process_frame(frame)
        processed_frames.append(landmarks)
    
    recording_data = {
        "phrase": phrase,
        "timestamp": timestamp,
        "frames": processed_frames
    }
    
    with open(os.path.join(RECORDINGS_DIR, filename), 'w') as f:
        json.dump(recording_data, f)
    
    return jsonify({"status": "success", "filename": filename})

@app.route('/api/recordings', methods=['GET'])
def get_recordings():
    recordings = []
    for filename in os.listdir(RECORDINGS_DIR):
        if filename.endswith('.json'):
            with open(os.path.join(RECORDINGS_DIR, filename), 'r') as f:
                data = json.load(f)
                recordings.append({
                    "id": filename,
                    "phrase": data["phrase"],
                    "timestamp": data["timestamp"]
                })
    
    return jsonify(recordings)

if __name__ == '__main__':
    app.run(debug=True, port=5000)