
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

console.log(Person);
console.log(Person.prototype);
console.log(new Person('John', 'Doe', 25));