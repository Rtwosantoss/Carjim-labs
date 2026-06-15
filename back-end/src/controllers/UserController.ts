import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    constructor(private readonly userService: UserService) {}

    findAll = async(req: Request, res: Response): Promise<Response> => {
        try {
            const users = await this.userService.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching users"
            });
        }
    }
    
    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await this.userService.create(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({
                message: "Error creating user"
            });
        }
    }
}
