const { HfInference } = require('@huggingface/inference');

async function explainScheme(schemeName, schemeDetails) {
    if (!process.env.HUGGINGFACE_API_KEY) {
        throw new Error("Missing HUGGINGFACE_API_KEY");
    }

    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

    const prompt = `Explain the following Indian Government Scheme to a layperson in extremely simple terms (like you are explaining to a 5th grader). Keep it under 3-4 sentences.\n\nScheme Name: ${schemeName}\nDetails: ${schemeDetails}`;

    try {
        const result = await hf.chatCompletion({
            model: "Qwen/Qwen2.5-7B-Instruct", // Highly reliable free conversational model currently active on serverless
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150,
            temperature: 0.5,
        });

        return result.choices[0].message.content.trim();
    } catch (error) {
        console.error("Hugging Face SDK Error:", error.message || error);
        throw new Error("Failed to generate explanation from Hugging Face");
    }
}

module.exports = {
    explainScheme
};
