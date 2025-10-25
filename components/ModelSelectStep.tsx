
import React from 'react';
import { CarModel } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface ModelSelectStepProps {
  models: CarModel[];
  onSelect: (model: CarModel) => void;
  onBack: () => void;
  brand: string;
}

const ModelSelectStep: React.FC<ModelSelectStepProps> = ({ models, onSelect, onBack, brand }) => {
  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <ArrowLeftIcon />
        </button>
        <div className="ml-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Select a Model</h2>
          <p className="text-gray-400">Choose a model from <span className="font-semibold text-white">{brand}</span></p>
        </div>
      </div>
      
      {models.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {models.map((model) => (
            <button
              key={model.name}
              onClick={() => onSelect(model)}
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg text-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="font-semibold">{model.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400">No models found for this brand.</p>
        </div>
      )}
    </div>
  );
};

export default ModelSelectStep;
