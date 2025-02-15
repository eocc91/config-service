import { UserService } from "../ports/inbound/user.service";
import { UserRepository } from "../ports/outbound/user.repository";
import { User } from "../models/user";

export class UserDomainService implements UserService {
    
    constructor(
        private userRepository: UserRepository
    ){}

    async getAll(params: any): Promise<User[]> {
        return await this.userRepository.getAll(params);
    }

    async getById(idUser: number): Promise<User> {
        return await this.userRepository.getById(idUser);
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}