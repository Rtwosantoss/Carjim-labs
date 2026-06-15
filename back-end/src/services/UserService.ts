import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = new UserRepository();

export class UserService {
  async findAll() {
    return await userRepository.findAll();
  }

  async create(data: CreateUserDTO) {
    return await userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }
}
