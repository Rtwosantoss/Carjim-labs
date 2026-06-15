import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {
  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await authService.login(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  };
}
