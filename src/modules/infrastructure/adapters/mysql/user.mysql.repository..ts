import { Repository } from 'typeorm';
import { User } from "../../../domain/models/user";
import { UserRepository } from "../../../domain/ports/outbound/user.repository";

export class UserMySqlRepository implements UserRepository{
    constructor(
        // @InjectRepository(UserEntity) private repository: Repository<UserEntity>
    ){}

    async getAll(params: any): Promise<User[]> {
        // return await this.repository.find();
        console.log('getAll')
        return null as any;
    }

    async getById(idUser: number): Promise<User> {
        // return await this.repository.findOneByOrFail({idUser: idUser});
        return null as any;
    }

    async save(user: User): Promise<User> {
        // return await this.repository.save(user)
        return null as any;
    }
}