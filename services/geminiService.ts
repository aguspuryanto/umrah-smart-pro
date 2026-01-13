
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Initialize GoogleGenAI with the API key from environment variables directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSmartReport = async (data: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analisislah data travel Umroh berikut dan berikan ringkasan eksekutif, tren jamaah, dan saran bisnis dalam Bahasa Indonesia: ${JSON.stringify(data)}`,
      config: {
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Gagal menghasilkan laporan AI. Silakan periksa koneksi atau API Key.";
  }
};

export const validatePassportData = async (imageBase64: string) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
                parts: [
                    { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } },
                    { text: 'Extract passport information: full name, passport number, birth date, and expiry date in JSON format.' }
                ]
            },
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        fullName: { type: Type.STRING },
                        passportNumber: { type: Type.STRING },
                        birthDate: { type: Type.STRING },
                        expiryDate: { type: Type.STRING }
                    },
                    required: ['fullName', 'passportNumber']
                }
            }
        });
        return JSON.parse(response.text || '{}');
    } catch (error) {
        console.error("OCR Error:", error);
        return null;
    }
};
