require("dotenv").config();
const express = require("express");
const handleOpenAIChat = require("./openaiHandler");

const app = express();
app.use(express.json());

app.post("/api/openai-chat", (req, res, next) => {
    console.log("Request received at /api/openai-chat:", req.body);
    next();
}, handleOpenAIChat);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
