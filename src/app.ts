import express from "express";
import { userRoutes } from "./routes/userRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
