const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getSafetyVerdict(streetName, currentLighting, situation) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // ✅ safer model
    });

    const prompt = `
    You are a safety analysis AI.

    Location: ${streetName}
    Lighting Level: ${currentLighting}/100
    Situation: ${situation}

    Respond ONLY in JSON:
    {
      "new_lighting": number,
      "explanation": "short reason"
    }
    `;

    const result = await model.generateContent(prompt);

    const text = result.response.text();
    console.log("RAW RESPONSE:", text);

    // ✅ safer parsing
    const cleaned = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned);

    return parsed;
  } catch (err) {
    console.log("🔥 REAL ERROR:", err);
    return {
      new_lighting: currentLighting - 10,
      explanation: "Fallback: AI failed, assuming lower safety",
    };
  }
}

module.exports = { getSafetyVerdict };
