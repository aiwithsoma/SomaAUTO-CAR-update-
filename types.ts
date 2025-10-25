export interface CarModel {
    name: string;
}

export interface CarSpecs {
    engine: string;
    power: string;
    torque: string;
    zeroToSixty: string;
    topSpeed: string;
}

export interface Theme {
    name: string;
    imageUrl: string;
    styleDescription: string;
}

export interface HistoryItem {
    id: string;
    carModel: CarModel;
    carSpecs: CarSpecs;
    selectedTheme: Theme;
    selectedColor: string;
    generatedImageUrl: string;
}

export type Step = 'apiKeySetup' | 'settings' | 'carInput' | 'modelSelect' | 'styleSelect' | 'themeSelect' | 'colorSelect' | 'generating' | 'finalize' | 'history';

export interface AppState {
    step: Step;
    apiKey: string | null;
    carBrand: string;
    carModel: CarModel | null;
    carStyle: 'stock' | 'modified' | null;
    carSpecs: CarSpecs | null;
    models: CarModel[];
    colors: string[];
    selectedTheme: Theme | null;
    selectedColor: string;
    generatedImageUrl: string;
    error: string | null;
    loading: boolean;
    history: HistoryItem[];
    cameFromHistory: boolean;
}