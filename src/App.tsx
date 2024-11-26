import React, { useState } from 'react';
import { Camera } from './components/Camera';
import { PhraseInput } from './components/PhraseInput';
import { RecordingsList } from './components/RecordingsList';

function App() {
  const [phrase, setPhrase] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);

  const handleStartRecording = () => {
    if (phrase.trim()) {
      setIsRecording(true);
    } else {
      alert('Please enter a phrase first');
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Here we would normally process the recording and send it to the backend
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ecuadorian Sign Language Recorder
          </h1>
          <p className="text-gray-600">
            Record and store sign language gestures for computer vision analysis
          </p>
        </header>

        <div className="space-y-8">
          <PhraseInput phrase={phrase} onPhraseChange={setPhrase} />
          
          <Camera
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />

          <RecordingsList recordings={recordings} />
        </div>
      </div>
    </div>
  );
}

export default App;