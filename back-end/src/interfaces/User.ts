export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
