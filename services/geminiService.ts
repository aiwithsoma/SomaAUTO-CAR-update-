import { GoogleGenAI, Type } from "@google/genai";
import { CarModel, CarSpecs, Theme } from '../types';

export async function getCarModels(brand: string, apiKey: string): Promise<CarModel[]> {
    const ai = new GoogleGenAI({ apiKey });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `List every car model for the brand "${brand}", from their very first vintage model to the absolute latest release. Be comprehensive and list all distinct models.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        models: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: 'The name of the car model'
                            }
                        }
                    }
                },
            },
        });
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result.models.map((name: string) => ({ name }));
    } catch (error: any) {
        console.error("Error fetching car models:", error);
        if (error.message.includes('API key not valid')) {
            throw new Error("Invalid API key. Please check your key and try again.");
        }
        if (error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('429')) {
            throw new Error("API rate limit reached. You've made too many requests. Please wait a minute and try again, or check your billing details for higher limits.");
        }
        throw new Error("Failed to fetch car models from the API.");
    }
}


export async function getCarColors(modelName: string, apiKey: string): Promise<string[]> {
    const ai = new GoogleGenAI({ apiKey });
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `List over 100 of the best, most iconic, and most interesting factory and custom paint colors for a ${modelName}. Include a wide variety of shades from classic to modern and exotic. Provide just the color names.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        colors: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                description: 'The name of the color'
                            }
                        }
                    }
                },
            },
        });
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result.colors;
    } catch (error: any) {
        console.error("Error fetching car colors:", error);
        if (error.message.includes('API key not valid')) {
            throw new Error("Invalid API key. Please check your key and try again.");
        }
        if (error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('429')) {
            throw new Error("API rate limit reached. You've made too many requests. Please wait a minute and try again, or check your billing details for higher limits.");
        }
        throw new Error("Failed to fetch car colors from the API.");
    }
}


export async function getCarSpecs(modelName: string, apiKey: string): Promise<CarSpecs> {
    const ai = new GoogleGenAI({ apiKey });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Provide the key performance specifications for a recent model of the ${modelName}. Include Engine, Horsepower, Torque, 0-60 mph time, and Top Speed.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        engine: { type: Type.STRING },
                        power: { type: Type.STRING },
                        torque: { type: Type.STRING },
                        zeroToSixty: { type: Type.STRING },
                        topSpeed: { type: Type.STRING }
                    },
                    required: ["engine", "power", "torque", "zeroToSixty", "topSpeed"]
                }
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error: any) {
        console.error("Error fetching car specs:", error);
        if (error.message.includes('API key not valid')) {
            throw new Error("Invalid API key. Please check your key and try again.");
        }
        if (error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('429')) {
            throw new Error("API rate limit reached. You've made too many requests. Please wait a minute and try again, or check your billing details for higher limits.");
        }
        throw new Error("Failed to fetch car specifications from the API.");
    }
}

export async function generateArtwork(modelName: string, theme: Theme, color: string, carStyle: 'stock' | 'modified', specs: CarSpecs, apiKey: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey });
    
    const modificationPrompt = carStyle === 'modified' 
        ? 'The car should be tastefully modified with popular, high-end aftermarket parts, such as custom forged wheels, a subtle aerodynamic body kit, and a slightly lowered suspension. The modifications should enhance the car\'s appearance, not be overly exaggerated or gaudy.'
        : 'The car should be in its original, stock factory condition with no modifications.';

    const prompt = `
        Create a hyper-realistic, ultra-detailed, 16K resolution, photorealistic wall frame artwork of a ${color} ${modelName}.

        ${modificationPrompt}

        The artistic style must be: ${theme.styleDescription}.

        The car should be the central focus, depicted in a setting that matches the artistic style, perfectly lit to highlight its lines and the ${color} paint. 
        The artwork must be presented as a framed piece hanging on a clean, modern gallery wall that complements the style.

        Integrate the car's name "${modelName}" and its key specifications elegantly and legibly into the artwork's design, like a high-end automotive poster.

        Specifications to include:
        - Engine: ${specs.engine}
        - Power: ${specs.power}
        - Torque: ${specs.torque}
        - 0-60 mph: ${specs.zeroToSixty}
        - Top Speed: ${specs.topSpeed}

        The final image must be of master-quality, visually premium, and look like a real photograph of a framed piece of art. The composition should be balanced and aesthetically pleasing.
    `;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              aspectRatio: '3:4', // Portrait orientation for posters
              outputMimeType: 'image/jpeg',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error: any) {
        console.error("Error generating artwork:", error);
        if (error.message.includes('API key not valid')) {
            throw new Error("Invalid API key. Please check your key and try again.");
        }
        if (error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('429')) {
            throw new Error("API rate limit reached. You've made too many requests. Please wait a minute and try again, or check your billing details for higher limits.");
        }
        throw new Error("Failed to generate artwork from the API.");
    }
}