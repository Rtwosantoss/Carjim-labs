import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginDTO } from "../dtos/LoginDTO";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = new UserRepository();

export class AuthService {
  async login(data: LoginDTO): Promise<{ token: string }> {
    const user = await userRepository.findByEmail(data.email);

    if (!user || !user.isActive || user.role !== "admin") {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const expiresIn = process.env.JWT_EXPIRES_IN ?? "8h";
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn } as jwt.SignOptions
    );

    return { token };
  }
}
