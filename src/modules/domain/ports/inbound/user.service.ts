import { User } from "../../models/user";


export abstract class UserService {
    abstract getAll( params: any ): Promise<User[]>;
    abstract getById( idUser: number ): Promise<User>;
    abstract create( user: User ): Promise<User>;
    abstract update( idUser: number, user: User ): Promise<User>;
    abstract enable( idUser: number ): Promise<User>;
    abstract disable( idUser: number ): Promise<User>;
    abstract delete( idUser: number ): Promise<User>;
}