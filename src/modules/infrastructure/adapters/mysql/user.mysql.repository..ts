import { Repository } from 'typeorm';
import { User } from "../../../domain/models/user";
import { UserRepository } from "../../../domain/ports/outbound/user.repository";
import { UserEntity } from '@entities/user.entity';
import { MysqlDataSource } from '@infrastructure/database/datasource/mysql.datasource';

export class UserMySqlRepository implements UserRepository{
    private userRepository!: Repository<UserEntity>;
    constructor(         
    ){
        this.userRepository = MysqlDataSource.getRepository(UserEntity);
    }

    async getAll(params: any): Promise<User[]> {
        let where = {};
        if(params.username){
            where = {...where, username: params.username };
        }
        if(params.email){
            where = {...where, email: params.email };
        }
        const users = await this.userRepository.find({where});
        return User.toModelArray(users)
    }

    async getById(idUser: number): Promise<any> {
        return await this.userRepository.findOneBy({idUser});
    }

    async save(user: User): Promise<User> {

        return new User(await this.userRepository.save(user));
        
    }
}