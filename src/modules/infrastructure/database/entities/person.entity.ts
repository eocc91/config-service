import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'configuration_persons'})
export class PersonEntity {
    @PrimaryGeneratedColumn({name: 'id_person', type: 'int'})
    idPerson!: number;
    @Column({name: 'first_name', type: 'varchar', length: 100})
    firstName!: string;
    @Column({name: 'middle_name', type: 'varchar', length: 100})
    middleName!: string;
    @Column({name: 'last_name', type: 'varchar', length: 100})
    lastName!: string;
    @Column({name: 'second_last_name', type: 'varchar', length: 100})
    secondLastName!: string;
    
}