import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, Video, VideoOff } from 'lucide-react';

interface CameraProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function Camera({ isRecording, onStartRecording, onStopRecording }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);

  const handleStartRecording = useCallback(() => {
    if (webcamRef.current) {
      onStartRecording();
    }
  }, [onStartRecording]);

  return (
    <div className="relative">
      <Webcam
        ref={webcamRef}
        audio={false}
        className="rounded-lg shadow-lg w-full max-w-2xl"
        screenshotFormat="image/jpeg"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={isRecording ? onStopRecording : handleStartRecording}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          {isRecording ? (
            <>
              <VideoOff size={20} />
              Stop Recording
            </>
          ) : (
            <>
              <Video size={20} />
              Start Recording
            </>
          )}
        </button>
      </div>
    </div>
  );
}