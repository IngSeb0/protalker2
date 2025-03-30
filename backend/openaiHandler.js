const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API Key is not set in the environment variables.");
}

// Configure OpenAI API
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function handleOpenAIChat(req, res) {
    try {
        const { message } = req.body;

        if (!message) {
            console.error("No message provided in request body.");
            return res.status(400).json({ error: "Message is required." });
        }

        console.log("Message received from client:", message);

        // Use OpenAI SDK to generate a response
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 150,
        });

        console.log("Response from OpenAI API:", response.data);

        res.json({ response: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error("Error handling OpenAI chat:", error.response?.data || error.message);
        res.status(500).json({ error: "Internal server error." });
    }
}

module.exports = handleOpenAIChat;
