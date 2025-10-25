import React from 'react';
import { HistoryItem } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface HistoryStepProps {
  historyItems: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onBack: () => void;
}

const HistoryStep: React.FC<HistoryStepProps> = ({ historyItems, onSelect, onBack }) => {
  return (
    <div className="w-full animate-fade-in">
        <div className="flex items-center mb-8">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <ArrowLeftIcon />
            </button>
            <div className="ml-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your Collection</h2>
                <p className="text-gray-400">Revisit your previously generated artworks.</p>
            </div>
        </div>

        {historyItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {historyItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="relative aspect-[3/4]">
                            <img 
                                src={item.generatedImageUrl} 
                                alt={`${item.carModel.name} artwork`} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-3">
                                <h3 className="font-bold text-white text-sm leading-tight">{item.carModel.name}</h3>
                                <p className="text-xs text-gray-300">{item.selectedColor}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-2">Your gallery is empty.</h3>
                <p className="text-gray-400 mb-6">Start by creating your first piece of car art!</p>
                <button onClick={onBack} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                    Create New Artwork
                </button>
            </div>
        )}
    </div>
  );
};

export default HistoryStep;
