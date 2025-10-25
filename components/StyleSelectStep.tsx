import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface StyleSelectStepProps {
  onSelect: (style: 'stock' | 'modified') => void;
  onBack: () => void;
  modelName: string;
}

const StyleSelectStep: React.FC<StyleSelectStepProps> = ({ onSelect, onBack, modelName }) => {
  return (
    <div className="w-full animate-fade-in">
        <div className="flex items-center mb-8">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <ArrowLeftIcon />
            </button>
            <div className="ml-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Stock or Modified?</h2>
                <p className="text-gray-400">Choose the style for your <span className="font-semibold text-white">{modelName}</span>.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
                onClick={() => onSelect('stock')}
                className="group cursor-pointer bg-gray-800 p-8 rounded-lg border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
                <h3 className="text-3xl font-bold text-white mb-2">Stock</h3>
                <p className="text-gray-400">The car in its original, factory-fresh condition. A timeless classic.</p>
            </div>
            
            <div
                onClick={() => onSelect('modified')}
                className="group cursor-pointer bg-gray-800 p-8 rounded-lg border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
                <h3 className="text-3xl font-bold text-white mb-2">Tastefully Modified</h3>
                <p className="text-gray-400">Enhanced with popular, high-end aftermarket parts for a unique look.</p>
            </div>
        </div>
    </div>
  );
};

export default StyleSelectStep;
