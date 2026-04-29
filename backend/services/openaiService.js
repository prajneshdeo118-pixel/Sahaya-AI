const { OpenAI } = require('openai');

/**
 * Uses OpenAI to explain a government scheme in extremely simple terms.
 * Requires process.env.OPENAI_API_KEY to be set.
 */
async function explainScheme(schemeName, schemeDetails) {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY");
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = `Explain the following Indian Government Scheme to a layperson in extremely simple, native terms (like you are explaining to a 5th grader). Keep it under 3-4 sentences.\n\nScheme Name: ${schemeName}\nDetails: ${schemeDetails}`;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            max_tokens: 100,
            temperature: 0.5,
        });

        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error("OpenAI API Error:", error);
        throw new Error("Failed to generate explanation from OpenAI");
    }
}

module.exports = {
    explainScheme
};
