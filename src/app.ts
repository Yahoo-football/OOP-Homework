import express, { NextFunction, Request, Response } from "express";
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

app.use((err: Error & { statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  let statusCode = 500;
  let message = "Internal server error";

  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({ message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
