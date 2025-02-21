import { UserException } from "@domain/exceptions/user.exception";
import { Status } from "@domain/models/status";
import { User } from "@domain/models/user";
import { PasswordHashService } from "@domain/ports/inbound/password-hash.service";
import { UserRepository } from "@domain/ports/outbound/user.repository";

export class UpdateUserDomainService {
    constructor(private userRepository: UserRepository, private passwordHash: PasswordHashService) {}
    async execute(idUser: number, user: User): Promise<User> {
        user = new User(user);
        const userToUpdate = await this.userRepository.getById(idUser);
        
        if(!userToUpdate ) {
            throw new UserException("El usuario no existe.");
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
        if( existUser.length > 0 && user.idUser != existUser[0].idUser ) {
            throw new UserException("El nombre de usuario ya existe.");
        }
        if( !await this.passwordHash.comparePasswords(user.password, userToUpdate.password ) ) {
            user.password = await this.passwordHash.hashPassword(user.password);
        }        
        userToUpdate.password = user.password;
        userToUpdate.email = user.email;
        userToUpdate.person = user.person;
        // const newUser = await this.userRepository.save(user);
        return userToUpdate;
    }

}