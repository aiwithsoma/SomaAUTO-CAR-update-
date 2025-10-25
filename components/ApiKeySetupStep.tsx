import React, { useState } from 'react';
import SettingsIcon from './icons/SettingsIcon';

interface ApiKeySetupStepProps {
  onSubmit: (key: string) => void;
  error: string | null;
}

const ApiKeySetupStep: React.FC<ApiKeySetupStepProps> = ({ onSubmit, error }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-2xl mx-auto animate-fade-in">
      <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
        Welcome to the AI Car Artwork Generator
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-8">
        To get started, please paste your Google AI Studio API key below. This allows the application to use Gemini to generate your unique car artworks.
      </p>
      <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 p-6 rounded-lg w-full">
        <h2 className="text-2xl font-bold mb-3">Enter Your API Key</h2>
        <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your API key here"
            className="w-full px-6 py-4 bg-gray-900 border-2 border-gray-600 rounded-lg text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
        />
        <button
          type="submit"
          disabled={!apiKey.trim()}
          className="w-full mt-4 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg text-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        >
          <span className="ml-3">Save & Continue</span>
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </form>
       <p className="text-xs text-gray-500 mt-6">
        Don't have a key? You can get one for free from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">Google AI Studio</a>.
      </p>
    </div>
  );
};

export default ApiKeySetupStep;