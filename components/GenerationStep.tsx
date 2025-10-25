
import React, { useState, useEffect } from 'react';

const messages = [
  "Firing up the rendering engines...",
  "Sketching the initial design...",
  "Applying digital paint...",
  "Polishing the chrome details...",
  "Adjusting the lighting for perfect reflections...",
  "Finalizing your masterpiece...",
];

const GenerationStep: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in">
      <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8"></div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Generating Your Artwork</h2>
      <p className="text-lg md:text-xl text-gray-400 transition-opacity duration-500">
        {messages[messageIndex]}
      </p>
      <p className="text-sm text-gray-500 mt-8">This may take a moment. High-quality art requires patience!</p>
    </div>
  );
};

export default GenerationStep;
