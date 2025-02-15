import { User } from "../domain/models/user";
import { UserService } from "../domain/ports/inbound/user.service";

export class UserUseCase {
    constructor(
        private userService: UserService
    ){}

    async getAll( params: any ): Promise<User[]> {
        return await this.userService.getAll(params);
    }

    async getById( idUser: any ): Promise<User> {
        return await this.userService.getById(idUser);
    }

    async create( user: User ): Promise<User> {
        return await this.userService.create( user );
    }
}
