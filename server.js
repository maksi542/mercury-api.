const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Настройки
app.use(express.json({ limit: "10kb" }));

// Демонстрационные ключи
const keys = new Set([
    "MERCURY-GOLD-2026",
    "MERCURY-VIP-2026",
    "MERCURY-PREMIUM-2026"
]);

// Главная страница
app.get("/", (req, res) => {
    res.status(200).json({
        name: "MERCURY API",
        status: "online",
        version: "2.0.0"
    });
});

// Проверка ключа для собственного приложения
app.post("/verify", (req, res) => {
    try {
        const key = req.body?.key;

        if (typeof key !== "string" || key.length > 60) {
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            });
        }

        const normalizedKey = key.trim().toUpperCase();
        const valid = keys.has(normalizedKey);

        return res.status(200).json({
            success: valid,
            message: valid ? "Access granted" : "Invalid key"
        });

    } catch (error) {
        console.error("Verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Неизвестные адреса
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Not found"
    });
});

// Запуск сервера
app.listen(PORT, "0.0.0.0", () => {
    console.log(MERCURY API running on port ${PORT});
});
