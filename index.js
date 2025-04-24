import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "http://localhost:4174"
];

// Middleware
app.use(cors({
  origin: allowedOrigins, // Replace with your frontend's URL during production
  credentials: true, // Allow cookies and other credentials
}));
app.use(express.json());

// API routes
app.use("/api", routes);

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`RUNNING ON PORT: ${PORT}`);
});
