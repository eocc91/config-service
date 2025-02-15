import { Person } from "./person";

export class User {
    // idUser!: number;
    // name!: string;
    // username!: string;
    // email!: string;
    // password!: string;
    // status!: number;
    // creationDate!: Date;
    // lastAccess!: Date
    // token!: string;
    // validationPin!: string
    constructor(
        public idUser: number,
        public person: Person,
        public name: string,
        public username: string,
        public email: string,
        public password: string,
        public status: number,
        public creationDate: Date,
        public lastAccess: Date,
        public token: string,
        public validationPin: string 
    ){}
}