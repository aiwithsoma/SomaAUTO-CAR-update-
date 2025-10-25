import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import Spinner from './Spinner';

interface ColorSelectStepProps {
  colors: string[];
  onSelect: (color: string) => void;
  onBack: () => void;
  loading: boolean;
  error: string | null;
}

const ColorSelectStep: React.FC<ColorSelectStepProps> = ({ colors, onSelect, onBack, loading, error }) => {
    
  // Simple heuristic to map color names to a visible background
  const getColorStyle = (colorName: string): React.CSSProperties => {
    const name = colorName.toLowerCase();
    
    // Prioritize specific, common car color names
    if (name.includes('red')) return { backgroundColor: '#c81d25' };
    if (name.includes('blue')) return { backgroundColor: '#005a9c' };
    if (name.includes('yellow')) return { backgroundColor: '#fdee44' };
    if (name.includes('green')) return { backgroundColor: '#00843d' };
    if (name.includes('orange')) return { backgroundColor: '#f4651f' };
    if (name.includes('purple')) return { backgroundColor: '#5d3b90' };
    if (name.includes('black')) return { backgroundColor: '#1e1e1e' };
    if (name.includes('white') || name.includes('chalk')) return { backgroundColor: '#f0f0f0' };
    if (name.includes('silver')) return { backgroundColor: '#c0c0c0' };
    if (name.includes('grey') || name.includes('gray')) return { backgroundColor: '#808080' };
    if (name.includes('gold')) return { backgroundColor: '#ffd700' };
    if (name.includes('bronze')) return { backgroundColor: '#cd7f32' };
    if (name.includes('brown')) return { backgroundColor: '#654321' };
    
    // Fallback for less common colors
    return { backgroundColor: '#cccccc' };
  };

  return (
    <div className="w-full animate-fade-in">
        <div className="flex items-center mb-8">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" disabled={loading}>
                <ArrowLeftIcon />
            </button>
            <div className="ml-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Final Touch: Color</h2>
                <p className="text-gray-400">Pick a color to finalize your artwork.</p>
            </div>
        </div>

        {loading ? (
            <div className="flex justify-center items-center py-20"><Spinner /></div>
        ) : (
            <div className="w-full max-h-[60vh] overflow-y-auto p-2 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="flex flex-wrap justify-center gap-3">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => onSelect(color)}
                            className="flex items-center justify-between p-3 min-w-[150px] bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <span className="font-semibold text-sm text-left flex-1 mr-2">{color}</span>
                            <span className="w-5 h-5 rounded-full border-2 border-gray-500" style={getColorStyle(color)}></span>
                        </button>
                    ))}
                </div>
            </div>
        )}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default ColorSelectStep;