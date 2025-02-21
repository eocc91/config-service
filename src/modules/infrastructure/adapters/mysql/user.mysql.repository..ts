import { Like, Repository } from 'typeorm';
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
        const query = this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.person", "person");
    
        if (params.username) {
            query.andWhere("user.username = :username", { username: params.username });
        }
        if (params.email) {
            query.andWhere("user.email LIKE :email", { email: `%${params.email}%` });
        }
        if (params.status) {
            query.andWhere("user.status = :status", { status: params.status });
        }
        if (params.name) {
            query.andWhere(
                "CONCAT(person.firstName, ' ', person.middleName, ' ', person.lastName, ' ', person.secondLastName) LIKE :name",
                { name: `%${params.name}%` }
            );
        }
    
        const users = await query.getMany();
        return User.toModelArray(users);
    }

    async getById(idUser: number): Promise<any> {
        return await this.userRepository.findOneBy({idUser});
    }

    async save(user: User): Promise<User> {

        return new User(await this.userRepository.save(user));
        
    }
}