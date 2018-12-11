
class Person {
    constructor (name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    getFullName() {
        return this.name + ' ' + this.surname;
    }

    static order(person1, person2) {
        return (person1.age >= person2.age) ? person1 : person2;
    }
}

class PersonWithMiddlename extends Person {
    constructor(name, middlename, surname, age) {
        super(name, surname, age);
        this.middlename = middlename;
    }

    getFullName() {
        return this.name + ' ' + this.middlename + ' ' + this.surname;
    }
}

console.log(PersonWithMiddlename);
console.log(PersonWithMiddlename.prototype);
console.log(new PersonWithMiddlename('John', 'Mac', 'Doe', 25));