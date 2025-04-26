class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  display() {
    const userDiv = document.createElement('div');
    userDiv.textContent = `Név: ${this.name}, Kor: ${this.age}`;
    userDiv.style.margin = '10px 0';
    document.body.appendChild(userDiv);
  }
}

class Admin extends User {
  constructor(name, age, role) {
    super(name, age); 
    this.role = role;
  }

  display() {
    const adminDiv = document.createElement('div');
    adminDiv.textContent = `Admin: ${this.name}, Kor: ${this.age}, Szerepkör: ${this.role}`;
    adminDiv.style.margin = '10px 0';
    adminDiv.style.fontWeight = 'bold';
    adminDiv.style.color = 'blue';
    document.body.appendChild(adminDiv);
  }
}

const user1 = new User('Kiss Péter', 25);
const user2 = new User('Nagy Anna', 30);
const admin1 = new Admin('Tóth Béla', 40, 'Rendszergazda');

user1.display();
user2.display();
admin1.display();