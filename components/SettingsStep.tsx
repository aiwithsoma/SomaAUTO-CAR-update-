import React, { useState } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import SettingsIcon from './icons/SettingsIcon';

interface SettingsStepProps {
  onBack: () => void;
  onSaveApiKey: (key: string) => void;
  currentApiKey: string | null;
}

const SettingsStep: React.FC<SettingsStepProps> = ({ onBack, onSaveApiKey, currentApiKey }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSaveApiKey(apiKey.trim());
      setApiKey('');
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000); // Hide message after 3 seconds
    }
  };
  
  const maskApiKey = (key: string | null) => {
    if (!key) return 'Not set';
    if (key.length < 8) return '********';
    return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
  }

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <ArrowLeftIcon />
        </button>
        <div className="ml-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Settings</h2>
          <p className="text-gray-400">Manage your application settings.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 p-6 rounded-lg w-full">
        <h3 className="text-2xl font-bold mb-1">API Key Management</h3>
        <p className="text-gray-400 mb-2">
            Current Key: <span className="font-mono text-gray-300">{maskApiKey(currentApiKey)}</span>
        </p>
        <p className="text-gray-400 mb-4">
          You can change your API key by pasting a new one below. Your key is saved in your browser's local storage.
        </p>

        <label htmlFor="apiKeyInput" className="font-semibold text-gray-300">New API Key</label>
        <input
            id="apiKeyInput"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your new API key here"
            className="w-full mt-1 px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-lg text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
        />

        <button
          type="submit"
          disabled={!apiKey.trim()}
          className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg text-lg hover:bg-blue-700 disabled:bg-gray-600 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        >
          <SettingsIcon />
          <span className="ml-3">Save New Key</span>
        </button>
        {isSaved && <p className="text-green-400 mt-4">API Key updated successfully!</p>}
         <p className="text-xs text-gray-500 mt-4">
          Don't have a key? Get one from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">Google AI Studio</a>.
        </p>
      </form>
    </div>
  );
};

export default SettingsStep;