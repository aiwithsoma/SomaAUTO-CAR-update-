
import React from 'react';
import { Theme } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface ThemeSelectStepProps {
  themes: Theme[];
  onSelect: (theme: Theme) => void;
  onBack: () => void;
  modelName: string;
}

const ThemeSelectStep: React.FC<ThemeSelectStepProps> = ({ themes, onSelect, onBack, modelName }) => {
  return (
    <div className="w-full animate-fade-in">
        <div className="flex items-center mb-8">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <ArrowLeftIcon />
            </button>
            <div className="ml-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Choose a Style</h2>
                <p className="text-gray-400">Select a theme for your <span className="font-semibold text-white">{modelName}</span> artwork</p>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {themes.map((theme) => (
                <div key={theme.name} onClick={() => onSelect(theme)} className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative">
                        <img src={theme.imageUrl} alt={theme.name} className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-white">{theme.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ThemeSelectStep;
