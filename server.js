
require("dotenv").config();

const express = require("express");
const pool = require("./config/db");
const peopleRoutes = require("./routes/peopleRoutes");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/health", async (req, res, next) => {
    try {
        await pool.query("SELECT 1");

        res.json({
            success: true,
            message: "Server and PostgreSQL are connected"
        });
    } catch (error) {
        next(error);
    }
});

app.use("/people", peopleRoutes);

app.use((error, req, res, next) => {
    console.error(error.message);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

async function startServer() {
    await pool.query("SELECT 1");

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer().catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exitCode = 1;
});
