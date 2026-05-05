"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
router.get("/", UserController_1.default.getAll.bind(UserController_1.default));
router.get("/:id", UserController_1.default.getById.bind(UserController_1.default));
router.post("/", UserController_1.default.create.bind(UserController_1.default));
router.put("/:id", UserController_1.default.update.bind(UserController_1.default));
router.delete("/:id", UserController_1.default.delete.bind(UserController_1.default));
exports.userRoutes = router;
