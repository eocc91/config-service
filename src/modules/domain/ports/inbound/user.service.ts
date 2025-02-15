import { User } from "../../models/user";


export abstract class UserService {
    abstract getAll( params: any ): Promise<User[]>;
    abstract getById( idUser: number ): Promise<User>;
    abstract create( user: User ): Promise<User>;
    abstract update( user: User ): Promise<User>;
}