const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST
app.get("/", (req, res) => {
  res.send("SafePath Backend Running 🚀");
});

// ROUTES API
app.get("/routes", (req, res) => {
  res.json({
    safest: {
      route: "Route A",
      time: "25 min",
      safety: 95,
    },
    fastest: {
      route: "Route B",
      time: "15 min",
      safety: 60,
    },
  });
});

// START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
