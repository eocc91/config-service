export class Person {
    public idPerson: number | undefined;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public secondLastName: string;
    constructor(
        person?: any
    ){
        if(person){
            this.idPerson = person.idPerson;
            this.firstName = person.firstName;
            this.middleName = person.middleName;
            this.lastName = person.lastName;
            this.secondLastName = person.secondLastName;
        }  else {
            this.idPerson = undefined;
            this.firstName = '';
            this.middleName = '';
            this.lastName = '';
            this.secondLastName = '';
        }
    }
}