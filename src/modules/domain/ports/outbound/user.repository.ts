import { User } from "../../models/user";

export abstract class UserRepository {
    abstract getAll( params: any ): Promise<User[]>;
    abstract getById( idUser: number ): Promise<User>;
    abstract save( user: User ): Promise<User>;
}