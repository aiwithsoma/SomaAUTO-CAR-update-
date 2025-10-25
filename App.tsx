import React, { useState, useEffect } from 'react';
import { AppState, CarModel, CarSpecs, Theme, Step, HistoryItem } from './types';
import ApiKeySetupStep from './components/ApiKeySetupStep';
import SettingsStep from './components/SettingsStep';
import CarInputStep from './components/CarInputStep';
import ModelSelectStep from './components/ModelSelectStep';
import StyleSelectStep from './components/StyleSelectStep';
import ThemeSelectStep from './components/ThemeSelectStep';
import ColorSelectStep from './components/ColorSelectStep';
import GenerationStep from './components/GenerationStep';
import FinalizeStep from './components/FinalizeStep';
import HistoryStep from './components/HistoryStep';
import Header from './components/Header';
import { THEMES } from './constants';
import { getCarModels, getCarColors, getCarSpecs, generateArtwork } from './services/geminiService';

const getInitialState = (): AppState => {
  const savedHistory = localStorage.getItem('artworkHistory');
  const savedApiKey = localStorage.getItem('apiKey');
  return {
    step: savedApiKey ? 'carInput' : 'apiKeySetup',
    apiKey: savedApiKey,
    carBrand: '',
    carModel: null,
    carStyle: null,
    carSpecs: null,
    models: [],
    colors: [],
    selectedTheme: null,
    selectedColor: '',
    generatedImageUrl: '',
    error: null,
    loading: false,
    history: savedHistory ? JSON.parse(savedHistory) : [],
    cameFromHistory: false,
  };
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(getInitialState());

  useEffect(() => {
    localStorage.setItem('artworkHistory', JSON.stringify(state.history));
  }, [state.history]);

  const handleError = (message: string) => {
    setState(prevState => ({ ...prevState, error: message, loading: false }));
  };
  
  const restart = () => {
    const currentState = getInitialState();
    // If API key exists, go to car input, otherwise back to setup
    const nextStep = state.apiKey ? 'carInput' : 'apiKeySetup';
    setState(prevState => ({
      ...currentState,
      apiKey: prevState.apiKey, // Keep api key
      history: prevState.history, // Keep history on restart
      step: nextStep,
    }));
  };

  const goToStep = (step: Step) => {
    setState(prevState => ({ ...prevState, step, error: null }));
  };

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('apiKey', key);
    setState(prevState => ({
      ...prevState,
      apiKey: key,
      step: 'carInput',
      error: null,
    }));
  };

  const handleSaveApiKey = (key: string) => {
      localStorage.setItem('apiKey', key);
      setState(prevState => ({ ...prevState, apiKey: key }));
  };
  
  const handleCarBrandSubmit = async (brand: string) => {
    if (!state.apiKey) {
      handleError("API Key is not set.");
      goToStep('apiKeySetup');
      return;
    }
    setState(prevState => ({ ...prevState, loading: true, carBrand: brand, error: null }));
    try {
      const models = await getCarModels(brand, state.apiKey);
      setState(prevState => ({ ...prevState, models, step: 'modelSelect', loading: false }));
    } catch (err: any) {
      handleError(err.message || 'Could not fetch car models. Please try again.');
    }
  };

  const handleModelSelect = async (model: CarModel) => {
    if (!state.apiKey) {
        handleError("API Key is not set.");
        goToStep('apiKeySetup');
        return;
    }
    setState(prevState => ({ ...prevState, loading: true, carModel: model, error: null }));
    try {
      const [colors, specs] = await Promise.all([
        getCarColors(model.name, state.apiKey),
        getCarSpecs(model.name, state.apiKey)
      ]);
      setState(prevState => ({ ...prevState, colors, carSpecs: specs, step: 'styleSelect', loading: false }));
    } catch (err: any) {
      handleError(err.message || 'Could not fetch model details. Please try again.');
      goToStep('modelSelect');
    }
  };
  
  const handleStyleSelect = (style: 'stock' | 'modified') => {
    setState(prevState => ({ ...prevState, carStyle: style, step: 'themeSelect' }));
  };

  const handleThemeSelect = (theme: Theme) => {
    setState(prevState => ({ ...prevState, selectedTheme: theme, step: 'colorSelect' }));
  };

  const handleColorSelect = async (color: string) => {
    if (!state.apiKey) {
      handleError("API Key is not set.");
      goToStep('apiKeySetup');
      return;
    }
    setState(prevState => ({ ...prevState, selectedColor: color, step: 'generating', loading: true, error: null }));
    if (!state.carModel || !state.selectedTheme || !state.carSpecs || !state.carStyle) {
        handleError('Something went wrong. Missing required information.');
        goToStep('carInput');
        return;
    }
    try {
        const imageUrl = await generateArtwork(state.carModel.name, state.selectedTheme, color, state.carStyle, state.carSpecs, state.apiKey);
        const newHistoryItem: HistoryItem = {
          id: new Date().toISOString(),
          carModel: state.carModel,
          carSpecs: state.carSpecs,
          selectedTheme: state.selectedTheme,
          selectedColor: color,
          generatedImageUrl: imageUrl,
        };
        setState(prevState => ({
          ...prevState, 
          generatedImageUrl: imageUrl, 
          step: 'finalize',
          history: [newHistoryItem, ...prevState.history],
          cameFromHistory: false,
          loading: false,
        }));
    } catch (err: any) {
        handleError(err.message || 'Failed to generate artwork. Please try again.');
        goToStep('colorSelect');
    }
  };

  const handleViewHistory = () => {
    goToStep('history');
  };

  const handleViewSettings = () => {
    goToStep('settings');
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setState(prevState => ({
      ...prevState,
      carModel: item.carModel,
      carSpecs: item.carSpecs,
      selectedTheme: item.selectedTheme,
      selectedColor: item.selectedColor,
      generatedImageUrl: item.generatedImageUrl,
      step: 'finalize',
      cameFromHistory: true,
    }));
  };

  const renderAppStep = () => {
    switch (state.step) {
      case 'apiKeySetup':
        return <ApiKeySetupStep onSubmit={handleApiKeySubmit} error={state.error} />;
      case 'settings':
        return <SettingsStep onBack={restart} onSaveApiKey={handleSaveApiKey} currentApiKey={state.apiKey} />;
      case 'carInput':
        return <CarInputStep onSubmit={handleCarBrandSubmit} loading={state.loading} error={state.error} />;
      case 'modelSelect':
        return <ModelSelectStep models={state.models} onSelect={handleModelSelect} onBack={() => goToStep('carInput')} brand={state.carBrand} />;
      case 'styleSelect':
        return <StyleSelectStep onSelect={handleStyleSelect} onBack={() => goToStep('modelSelect')} modelName={state.carModel?.name ?? ''} />;
      case 'themeSelect':
        return <ThemeSelectStep themes={THEMES} onSelect={handleThemeSelect} onBack={() => goToStep('styleSelect')} modelName={state.carModel?.name ?? ''} />;
      case 'colorSelect':
        return <ColorSelectStep colors={state.colors} onSelect={handleColorSelect} onBack={() => goToStep('themeSelect')} loading={state.loading} error={state.error} />;
      case 'generating':
        return <GenerationStep />;
      case 'history':
        return <HistoryStep historyItems={state.history} onSelect={handleSelectHistoryItem} onBack={restart} />;
      case 'finalize':
        return <FinalizeStep 
                  imageUrl={state.generatedImageUrl} 
                  onDone={state.cameFromHistory ? () => goToStep('history') : restart}
                  title={`${state.carModel?.name} - ${state.selectedColor}`}
                  doneButtonText={state.cameFromHistory ? 'Back to History' : 'Create Another'}
                />;
      default:
        return <CarInputStep onSubmit={handleCarBrandSubmit} loading={state.loading} error={state.error}/>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <Header onGoToHistory={handleViewHistory} onGoToSettings={handleViewSettings} />
      <main className="w-full max-w-7xl mx-auto flex-grow flex items-center justify-center">
        {renderAppStep()}
      </main>
    </div>
  );
};

export default App;