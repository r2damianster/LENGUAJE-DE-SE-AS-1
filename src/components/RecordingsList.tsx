import React from 'react';
import { Download, Code } from 'lucide-react';

interface Recording {
  id: string;
  phrase: string;
  timestamp: string;
  code: string;
}

interface RecordingsListProps {
  recordings: Recording[];
}

export function RecordingsList({ recordings }: RecordingsListProps) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">Recorded Gestures</h2>
      <div className="space-y-4">
        {recordings.map((recording) => (
          <div
            key={recording.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{recording.phrase}</h3>
                <p className="text-sm text-gray-500">{recording.timestamp}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50"
                  title="View Code"
                >
                  <Code size={20} />
                </button>
                <button
                  className="p-2 text-gray-600 hover:text-green-600 rounded-full hover:bg-green-50"
                  title="Download"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}