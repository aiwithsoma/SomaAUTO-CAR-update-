
import React, { useState } from 'react';
import Spinner from './Spinner';

interface CarInputStepProps {
  onSubmit: (brand: string) => void;
  loading: boolean;
  error: string | null;
}

const CarInputStep: React.FC<CarInputStepProps> = ({ onSubmit, loading, error }) => {
  const [brand, setBrand] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brand.trim()) {
      onSubmit(brand.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
        AI Car Artwork Generator
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl">
        Enter a car brand to begin creating your custom, hyper-realistic wall art. From vintage classics to modern hypercars.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="e.g., Porsche, Ferrari, BMW"
          className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !brand.trim()}
          className="mt-6 w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-lg text-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        >
          {loading ? <Spinner /> : 'Start Creating'}
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CarInputStep;
