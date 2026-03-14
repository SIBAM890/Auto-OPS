const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // For listing models, we don't need a specific model instance usually, 
        // but the SDK structure usually implies using the model manager if available
        // or just iterating.
        // However, the node SDK doesn't expose listModels directly on the main class easily in all versions.
        // Let's try to just use a known model that usually exists 'embedding-001' or similar to test connection,
        // or try to find the list method.
        // Actually, newer SDKs don't always have a listModels helper without a model manager. 
        // Let's try to infer from the error or just try 'gemini-1.0-pro' which is often the strict name.

        // Attempting to check via a direct request if SDK doesn't support listModels easily
        // But wait, the error message literally said: "Call ListModels to see the list of available models".
        // This implies the API supports it.

        // Let's try a very basic "gemini-1.5-flash-latest" or "gemini-1.0-pro" in a simple generation to see if it works.
        console.group("Testing Models...");

        const candidates = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro", "gemini-1.0-pro-001", "gemini-1.5-pro"];

        for (const modelName of candidates) {
            process.stdout.write(`Testing ${modelName}... `);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                console.log("✅ Success!");
                console.log("Response:", result.response.text());
                process.exit(0); // Found a working one
            } catch (e) {
                console.log("❌ Failed (" + e.message.split('[')[0] + "...)");
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
