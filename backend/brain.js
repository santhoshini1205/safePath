// brain.js

// 🧠 MAIN SAFETY SCORE FUNCTION
function calculateSafetyScore(
  crimeSafety,
  lightLevel,
  footfall,
  policeProximity,
  cctvCoverage,
  hospitalProximity,
  communityReports,
) {
  const score =
    crimeSafety * 0.3 +
    lightLevel * 0.25 +
    footfall * 0.2 +
    policeProximity * 0.1 +
    cctvCoverage * 0.1 +
    hospitalProximity * 0.03 +
    communityReports * 0.02;

  // round to 1 decimal
  return Math.round(score * 10) / 10;
}

// 🟢 SAFETY LEVEL (for UI)
function getSafetyLevel(score) {
  if (score >= 80) return "SAFE";
  if (score >= 60) return "MODERATE";
  return "UNSAFE";
}

// 🎨 COLOR FOR FRONTEND
function getSafetyColor(score) {
  if (score >= 80) return "#39FF14"; // green
  if (score >= 60) return "#FFE600"; // yellow
  return "#FF1744"; // red
}

// 💡 REASON (smart explanation)
function getSafetyReason({ crimeSafety, lightLevel, footfall }) {
  if (lightLevel < 40) return "Poor lighting area";
  if (footfall < 40) return "Low crowd presence";
  if (crimeSafety < 50) return "Higher crime risk";
  return "Generally safe route";
}

// 🧪 TEST (optional, runs when file loads)
const testScore = calculateSafetyScore(88, 88, 80, 90, 70, 80, 80);
console.log("⚙️ SafePath Engine Running...");
console.log("✅ Sample Score:", testScore);

// 📦 EXPORT EVERYTHING
module.exports = {
  calculateSafetyScore,
  getSafetyLevel,
  getSafetyColor,
  getSafetyReason,
};
