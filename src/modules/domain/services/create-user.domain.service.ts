import { UserException } from "@domain/exceptions/user.exception";
import { Status } from "@domain/models/status";
import { User } from "@domain/models/user";
import { PasswordHashService } from "@domain/ports/inbound/password-hash.service";
import { UserRepository } from "@domain/ports/outbound/user.repository";

export class CreateUserDomainService {
    constructor(private userRepository: UserRepository, private passwordHash: PasswordHashService) {}
    async execute(user: User): Promise<User> {
        user = new User(user);
        user.creationDate = new Date();
        user.status = Status.ENABLE;

        if(!user.usernameValidation ) {
            throw new UserException("El nombre de usuario es requerido.");
        }
        if( !user.nameValidation ) {
            throw new UserException("El nombre del usuario es requerido.");
        }
        if(!user.emailValidation ) {
            throw new UserException("El email del usuario es requerido.");
        }
        if(!user.passwordValidation ) {
            throw new UserException("La contraseña del usuario es requerida.");
        }
        const existUser = await this.userRepository.getAll({username: user.username});
        if( existUser.length > 0 ) {
            throw new UserException("El nombre de usuario ya existe.");
        }
        user.password = await this.passwordHash.hashPassword(user.password);
        const newUser = await this.userRepository.save(user);
        return newUser;
    }

}