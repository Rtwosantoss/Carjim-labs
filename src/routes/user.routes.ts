import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";

const router = Router();
const userService = new UserService();   
const userController = new UserController(userService); 

router.get("/users", userController.findAll);
router.post("/users", userController.create);

export default router;