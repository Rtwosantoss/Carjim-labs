import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../interfaces/User";

export class UserService {
    private users: User[] = [];

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async create(data: CreateUserDTO): Promise<User> {
        const user: User = {
            id: Math.floor(Math.random() * 1000),
            name: data.name,
            email: data.email,
        };

        this.users.push(user);
        return user;
    }
}