
import { UserRepository } from "@domain/ports/outbound/user.repository";
import { User } from "../domain/models/user";
import { UserService } from "../domain/ports/inbound/user.service";
import { CreateUserDomainService } from "@domain/services/create-user.domain.service";
import { UpdateUserDomainService } from "@domain/services/update-user.domain.service";
import { ChangeStatusUserDomainService } from "@domain/services/change-status-user.domain.service";
import { Status } from "@domain/models/status";

export class UserUseCase implements UserService{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly createUserDomainService: CreateUserDomainService,
        private readonly updateUserDomainService: UpdateUserDomainService,
        private readonly changeStatusUserDomainService: ChangeStatusUserDomainService
    ){}

    async getAll( params: any ): Promise<User[]> {    
        return await this.userRepository.getAll(params);
    }

    async getById( idUser: any ): Promise<User> {
        return await this.userRepository.getById(idUser);
    }

    async create( user: User ): Promise<User> {
        const createUser = await this.createUserDomainService.execute( user );
        return await this.userRepository.save( createUser );
    }

    async update( idUser: number, user: User ): Promise<User> {
        const updateUser = await this.updateUserDomainService.execute(idUser, user );
        return await this.userRepository.save( updateUser );
    }
    async enable( idUser: number ): Promise<User> {
        const enableUser = await this.changeStatusUserDomainService.execute(idUser, Status.ENABLE );
        return await this.userRepository.save( enableUser );
    }
    async disable( idUser: number ): Promise<User> {
        const disableUser = await this.changeStatusUserDomainService.execute(idUser, Status.DISABLE );
        return await this.userRepository.save( disableUser );
    }
    async delete( idUser: number ): Promise<User> {
        const deleteUser = await this.changeStatusUserDomainService.execute(idUser, Status.DELETE );
        return await this.userRepository.save( deleteUser );
    }
}

