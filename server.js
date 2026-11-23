const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10kb" }));

const keys = new Set([
    "MERCURY-GOLD-2026",
    "MERCURY-VIP-2026",
    "MERCURY-PREMIUM-2026"
]);

app.get("/", (req, res) => {
    res.json({
        name: "MERCURY API",
        status: "online",
        version: "2.0.0"
    });
});

app.post("/verify", (req, res) => {
    const key = req.body?.key;

    if (typeof key !== "string" || key.length > 60) {
        return res.status(400).json({
            success: false,
            message: "Invalid request"
        });
    }

    const valid = keys.has(key.trim().toUpperCase());

    return res.json({
        success: valid,
        message: valid ? "Access granted" : "Invalid key"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Not found"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("MERCURY API running on port " + PORT);
});
