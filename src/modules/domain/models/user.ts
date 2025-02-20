import { Person } from "./person";

export class User {
    public idUser: number;
    public person: Person;
    public username: string;
    public email: string;
    public password: string;
    public status: number;
    public creationDate: Date;
    public lastAccess: Date;
    public token: string;
    public validationPin: string ;

    constructor(
        user?: any
    ){
        this.idUser = user.idUser;
        this.person = new Person(user.person);
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.status = user.status;
        this.creationDate = new Date(user.creationDate);
        this.lastAccess = new Date(user.lastAccess);
        this.token = user.token;
        this.validationPin = user.validationPin;
    }

    get usernameValidation(): boolean { 
        return this.username.length > 0;
    }

    get nameValidation(): boolean {
        const fullName = this.person.firstName + " " + this.person.middleName + " " + this.person.lastName + " " + this.person.secondLastName;
        return fullName.trim().length > 0;
    }

    get emailValidation(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    get passwordValidation(): boolean {
        return this.password.length > 0;
    }

    static toModelArray(users: any[]): User[] {
        return users.map(user => new User(user));
    }
}