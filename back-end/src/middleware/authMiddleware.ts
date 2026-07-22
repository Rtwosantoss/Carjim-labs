import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "client";
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid authorization header" });
    return;
  }

  const parts = authHeader.split(" ");
  const token = parts[1];

  if (!token) {
    res.status(401).json({ message: "Missing token" });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: "Server misconfiguration" });
    return;
  }

  try {
    req.user = jwt.verify(token, secret) as unknown as JwtPayload;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  authenticate(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Admin access required" });
      return;
    }
    next();
  });
}
