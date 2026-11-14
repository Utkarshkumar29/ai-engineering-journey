import "dotenv/config"


import "dotenv/config";

const apiCallHandler = async () => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        console.log("API key loaded:", Boolean(apiKey));

        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is missing");
        }

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/interactions",
            {
                method: "POST",
                headers: {
                    "x-goog-api-key": apiKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "gemini-3.8-flash",
                    input: "Write a one-sentence bedtime story about a unicorn."
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            return;
        }

        console.log("Gemini Response:", data);

    } catch (error) {
        console.error("Error:", error.message);
    }
};

apiCallHandler();

export default apiCallHandler