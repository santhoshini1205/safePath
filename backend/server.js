require("dotenv").config();
console.log("API KEY:", process.env.GEMINI_API_KEY);
const { getSafetyVerdict } = require("./controllers/aiController");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// 👇 import your AI controller

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

/* ------------------ BASIC TEST ROUTE ------------------ */
app.get("/", (req, res) => {
  res.send("Server working ✅");
});

/* ------------------ EXISTING ROUTES API ------------------ */
app.get("/routes", (req, res) => {
  res.json({
    fastest: { time: "8 min", safety: 3.4 },
    safest: { time: "12 min", safety: 8.7 },
  });
});

/* ------------------ AI SAFETY API ------------------ */
app.post("/analyze-safety", async (req, res) => {
  try {
    const { streetName, lighting, situation } = req.body;

    const result = await getSafetyVerdict(streetName, lighting, situation);

    res.json(result);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: "AI failed" });
  }
});

/* ------------------ START SERVER ------------------ */
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
