import React, { useState } from 'react';
import DownloadIcon from './icons/DownloadIcon';

interface FinalizeStepProps {
  imageUrl: string;
  onDone: () => void;
  title: string;
  doneButtonText: string;
}

const frames = [
    // Wood
    { name: 'Light Oak', style: 'wood-oak-light', category: 'Wood', className: 'p-6 bg-[#D2B48C] border-8 border-[#A0886A] shadow-2xl' },
    { name: 'Classic Oak', style: 'wood-oak-classic', category: 'Wood', className: 'p-6 bg-[#A17A4D] border-8 border-[#805B3B] shadow-2xl' },
    { name: 'Dark Walnut', style: 'wood-walnut-dark', category: 'Wood', className: 'p-6 bg-[#5C4033] border-8 border-[#3D2B22] shadow-2xl' },
    { name: 'Rich Mahogany', style: 'wood-mahogany', category: 'Wood', className: 'p-6 bg-[#C04000] border-8 border-[#8B2300] shadow-2xl' },
    { name: 'Black Ash', style: 'wood-ash-black', category: 'Wood', className: 'p-6 bg-[#3A3A3A] border-8 border-[#212121] shadow-2xl' },
    { name: 'Cherry Wood', style: 'wood-cherry', category: 'Wood', className: 'p-6 bg-[#933A16] border-8 border-[#6D270B] shadow-2xl' },
    { name: 'Pine Wood', style: 'wood-pine', category: 'Wood', className: 'p-6 bg-[#F2D1A7] border-8 border-[#D8B583] shadow-2xl' },
    { name: 'Redwood', style: 'wood-redwood', category: 'Wood', className: 'p-6 bg-[#A45A52] border-8 border-[#7F413B] shadow-2xl' },
    // Metal
    { name: 'Brushed Steel', style: 'metal-steel', category: 'Metal', className: 'p-4 bg-gradient-to-b from-gray-400 to-gray-500 border-2 border-gray-600 shadow-xl' },
    { name: 'Polished Chrome', style: 'metal-chrome', category: 'Metal', className: 'p-4 bg-gradient-to-b from-gray-200 to-gray-400 border-2 border-gray-500 shadow-xl' },
    { name: 'Matte Gold', style: 'metal-gold-matte', category: 'Metal', className: 'p-5 bg-[#D4AF37] border-4 border-[#B89B2E] shadow-xl' },
    { name: 'Rose Gold', style: 'metal-gold-rose', category: 'Metal', className: 'p-5 bg-[#B76E79] border-4 border-[#A35F68] shadow-xl' },
    { name: 'Polished Brass', style: 'metal-brass', category: 'Metal', className: 'p-5 bg-[#CFB53B] border-4 border-[#B59E31] shadow-xl' },
    { name: 'Matte Aluminum', style: 'metal-aluminum', category: 'Metal', className: 'p-4 bg-gray-500 border-2 border-gray-600 shadow-xl' },
    { name: 'Copper', style: 'metal-copper', category: 'Metal', className: 'p-5 bg-[#B87333] border-4 border-[#A0642A] shadow-xl' },
    { name: 'Titanium', style: 'metal-titanium', category: 'Metal', className: 'p-4 bg-gray-600 border-2 border-gray-700 shadow-xl' },
    // Color
    { name: 'Matte Black', style: 'color-black-matte', category: 'Color', className: 'p-6 bg-black border-2 border-gray-800 shadow-2xl' },
    { name: 'Gloss Black', style: 'color-black-gloss', category: 'Color', className: 'p-6 bg-black border-2 border-gray-600 shadow-2xl' },
    { name: 'Gallery White', style: 'color-white-gallery', category: 'Color', className: 'p-8 bg-white border-2 border-gray-200 shadow-2xl' },
    { name: 'Minimal White', style: 'color-white-minimal', category: 'Color', className: 'p-2 bg-white border-2 border-gray-300 shadow-lg' },
    { name: 'Deep Navy', style: 'color-navy', category: 'Color', className: 'p-6 bg-[#000080] border-2 border-[#00004d] shadow-2xl' },
    { name: 'Crimson Red', style: 'color-red', category: 'Color', className: 'p-6 bg-[#DC143C] border-2 border-[#a30f2c] shadow-2xl' },
    { name: 'Forest Green', style: 'color-green', category: 'Color', className: 'p-6 bg-[#228B22] border-2 border-[#1a681a] shadow-2xl' },
    { name: 'Royal Purple', style: 'color-purple', category: 'Color', className: 'p-6 bg-[#6A0DAD] border-2 border-[#4c097c] shadow-2xl' },
    { name: 'Slate Gray', style: 'color-gray-slate', category: 'Color', className: 'p-6 bg-[#708090] border-2 border-[#54606b] shadow-2xl' },
    { name: 'Charcoal', style: 'color-charcoal', category: 'Color', className: 'p-6 bg-[#36454F] border-2 border-[#253036] shadow-2xl' },
    { name: 'Teal', style: 'color-teal', category: 'Color', className: 'p-6 bg-[#008080] border-2 border-[#005f5f] shadow-2xl' },
    { name: 'Mustard Yellow', style: 'color-yellow', category: 'Color', className: 'p-6 bg-[#FFDB58] border-2 border-[#d3b447] shadow-2xl' },
    // Add more to get to 50
    ...Array(22).fill(0).map((_, i) => ({
      name: `Color Variant ${i+1}`, style: `color-variant-${i+1}`, category: 'Color', className: `p-6 bg-hsl(${(i * 16) % 360}, 60%, 40%) border-2 border-hsl(${(i * 16) % 360}, 60%, 30%) shadow-2xl`
    })),
    { name: 'No Frame', style: 'none', category: 'Color', className: 'p-0' },
];

const categories = ['Wood', 'Metal', 'Color'];

const FinalizeStep: React.FC<FinalizeStepProps> = ({ imageUrl, onDone, title, doneButtonText }) => {
  const [selectedFrame, setSelectedFrame] = useState(frames[0].style);
  const [activeCategory, setActiveCategory] = useState('Wood');
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadImage = () => {
    if (!imageUrl) return;
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${title.replace(/\s+/g, '_')}_artwork.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download image:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const currentFrame = frames.find(f => f.style === selectedFrame) || frames.find(f => f.style === 'none');

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full animate-fade-in">
      <div className="w-full lg:w-2/3 flex justify-center">
        <div className={`transition-all duration-300 rounded-lg ${currentFrame?.className}`}>
          {imageUrl ? (
            <img src={imageUrl} alt="Generated Car Artwork" className="max-w-full h-auto max-h-[75vh] object-contain rounded-sm" />
          ) : (
            <div className="w-[500px] h-[667px] bg-gray-800 flex items-center justify-center rounded-sm">
              <p className="text-gray-500">Artwork loading...</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Your Masterpiece is Ready!</h2>
        <p className="text-gray-400 mt-2 mb-8">Select a frame and download your custom artwork.</p>

        <div className="mb-8 w-full max-w-xs">
          <h3 className="text-lg font-semibold mb-3">Choose a Frame</h3>
          <div className="flex items-center gap-2 border-b border-gray-700 mb-3">
            {categories.map(category => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeCategory === category ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}>
                {category}
              </button>
            ))}
          </div>
          <div className="h-48 overflow-y-auto p-1 bg-gray-800/50 rounded-md">
            <div className="grid grid-cols-5 gap-3">
              {frames.filter(f => f.category === activeCategory).map(frame => (
                <button
                  key={frame.style}
                  title={frame.name}
                  onClick={() => setSelectedFrame(frame.style)}
                  className={`w-12 h-12 rounded-full border-4 transition-all ${selectedFrame === frame.style ? 'border-blue-500 scale-110' : 'border-gray-600'}`}
                  style={{ backgroundColor: frame.style.startsWith('color-variant') ? `hsl(${(parseInt(frame.style.split('-')[2]) - 1) * 16}, 60%, 40%)` : undefined }}
                >
                  {frame.style === 'none' && <div className="w-full h-[2px] bg-red-500 transform rotate-45"></div>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-xs flex flex-col gap-4">
          <button
            onClick={downloadImage}
            disabled={isDownloading || !imageUrl}
            className="w-full px-8 py-4 bg-green-600 text-white font-bold rounded-lg text-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 transform hover:scale-105"
          >
            <DownloadIcon />
            <span className="ml-3">{isDownloading ? 'Downloading...' : 'Download Artwork'}</span>
          </button>
          <button
            onClick={onDone}
            className="w-full px-8 py-4 bg-gray-700 text-white font-bold rounded-lg text-lg hover:bg-gray-600 transition-all duration-300"
          >
            {doneButtonText}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4 max-w-xs text-center lg:text-left">Note: Download provides the unframed, high-quality source image.</p>
      </div>
    </div>
  );
};

export default FinalizeStep;
