import dotenv from "dotenv";
dotenv.config();
import express from "express";
import healthRoutes from "./routes/health.route";

const app = express();

app.use("/health", healthRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`app is running at port: ${PORT}`));
