import express from "express";
import userController from "../controllers/UserController";

const router = express.Router();


router.get("/", userController.getAll);
router.get("/:id", userController.getById.bind(userController));
router.post("/", userController.create.bind(userController));
router.put("/:id", userController.update.bind(userController));
router.delete("/:id", userController.delete.bind(userController));

export const userRoutes = router;
