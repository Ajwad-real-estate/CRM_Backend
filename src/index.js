import express from "express";
import cors from "cors";
import registerRoute from "../routes/auth/register.js";
import loginRoute from "../routes/auth/login.js";
import refreshTokenRoute from "../routes/auth/token.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the CRM API.");
});

app.use("/api/auth", registerRoute);
app.use("/api/auth", loginRoute);
app.use("/api/auth", refreshTokenRoute);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`RUNNING ON PORT: ${PORT}`);
});
