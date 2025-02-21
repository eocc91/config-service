import { UserException } from "@domain/exceptions/user.exception";
import { User } from "@domain/models/user";
import { PasswordHashService } from "@domain/ports/inbound/password-hash.service";
import { UserRepository } from "@domain/ports/outbound/user.repository";

export class ChangeStatusUserDomainService {
    constructor(private userRepository: UserRepository) {}
    async execute(idUser: number, status: number): Promise<User> {       
        const userToUpdate = await this.userRepository.getById(idUser);
        userToUpdate.status = status;
        return userToUpdate;
    }

}