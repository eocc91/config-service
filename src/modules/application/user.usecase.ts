
import { UserRepository } from "@domain/ports/outbound/user.repository";
import { User } from "../domain/models/user";
import { UserService } from "../domain/ports/inbound/user.service";
import { CreateUserDomainService } from "@domain/services/create-user.domain.service";

export class UserUseCase implements UserService{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly createUserDomainService: CreateUserDomainService,
    ){}

    async getAll( params: any ): Promise<User[]> {    
        return await this.userRepository.getAll(params);
    }

    async getById( idUser: any ): Promise<User> {
        return await this.userRepository.getById(idUser);
    }

    async create( user: User ): Promise<User> {
        return await this.createUserDomainService.execute( user );
    }

    async update( user: User ): Promise<User> {
        return await this.createUserDomainService.execute( user );
    }
}

