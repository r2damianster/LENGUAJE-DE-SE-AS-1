import React from 'react';
import { MessageSquare } from 'lucide-react';

interface PhraseInputProps {
  phrase: string;
  onPhraseChange: (phrase: string) => void;
}

export function PhraseInput({ phrase, onPhraseChange }: PhraseInputProps) {
  return (
    <div className="w-full max-w-2xl">
      <label htmlFor="phrase" className="block text-sm font-medium text-gray-700 mb-2">
        Enter the phrase or expression to record
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MessageSquare className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          id="phrase"
          value={phrase}
          onChange={(e) => onPhraseChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type a phrase or expression..."
        />
      </div>
    </div>
  );
}