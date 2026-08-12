import "server-only";

// El modelo se resuelve con un alias ("-latest") a propósito: así el chatbot
// sigue funcionando cuando Google retire la versión fija, sin tocar código.
const MODELO = "gemini-flash-latest";

export function getGeminiApiKey(): string | null {
  return process.env.GEMINI_API_KEY?.trim() || null;
}

export function urlGenerateContent(): string {
  return `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`;
}
