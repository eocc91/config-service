import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity({name: 'configuration_users'})
export class UserEntity {
    @PrimaryGeneratedColumn({name: 'id_user', type: 'int'})
    idUser!: number;
    @ManyToOne(() => PersonEntity, person => person.idPerson, {cascade: ['insert', 'update']})
    @JoinColumn({name: 'id_person'})
    person!: PersonEntity;   
    @Column({name: 'username', type: 'varchar', length: 100})
    username!: string;
    @Column({name: 'email', type: 'varchar', length: 100})
    email!: string;
    @Column({name: 'password', type: 'varchar', length: 50})
    password!: string;
    @Column({name: 'status', type: 'tinyint'})
    status!: number;
    @Column({name: 'creation_date', type: 'datetime'})
    creationDate!: Date;
    @Column({name: 'last_access', type: 'datetime'})
    lastAccess!: Date
    @Column({name: 'token', type: 'varchar', length: 50})
    token!: string;
    @Column({name: 'validation_pin', type: 'varchar', length: 6})
    validationPin!: string
    
}