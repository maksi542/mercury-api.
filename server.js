const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Демонстрационные ключи
const keys = new Map([
    ["MERCURY-GOLD-2026", true],
    ["MERCURY-VIP-2026", true],
    ["MERCURY-PREMIUM-2026", true]
]);

app.get("/", (req, res) => {
    res.json({
        name: "MERCURY API",
        status: "online",
        version: "1.0.0"
    });
});

app.post("/verify", (req, res) => {
    const key = req.body?.key;

    if (typeof key !== "string" || key.length > 60) {
        return res.status(400).json({
            success: false,
            message: "Invalid key"
        });
    }

    const valid = keys.has(key.trim().toUpperCase());

    res.json({
        success: valid,
        message: valid ? "Access granted" : "Invalid key"
    });
});

app.listen(PORT, () => {
    console.log(Mercury API running on port ${PORT});
});
