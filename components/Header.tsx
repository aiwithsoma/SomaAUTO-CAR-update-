import React from 'react';
import HistoryIcon from './icons/HistoryIcon';
import SettingsIcon from './icons/SettingsIcon';

interface HeaderProps {
    onGoToHistory: () => void;
    onGoToSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoToHistory, onGoToSettings }) => {

    return (
        <header className="w-full max-w-7xl mx-auto py-4 flex justify-between items-center">
            <a href="/" className="text-xl font-bold tracking-tight hover:text-blue-400 transition-colors">
                AI Car Artwork
            </a>
            <div className="flex items-center gap-2">
                <button 
                    onClick={onGoToHistory} 
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
                    aria-label="View history"
                >
                    <HistoryIcon />
                </button>
                <button 
                    onClick={onGoToSettings} 
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
                    aria-label="Settings"
                >
                    <SettingsIcon />
                </button>
            </div>
        </header>
    );
};

export default Header;