import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
interface User {
  id: number;
  name: string;
  lastName: string;
  idCard: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'formulario';
  userForm: FormGroup;

  users: Array<User> = [
    {
      id: 0,
      name: 'Stevan',
      lastName: 'Velez',
      idCard: '0000000000',
      email: 'hol@asdf.com',
      password: '1234',
    },
    {
      id: 1,
      name: 'Juan',
      lastName: 'Zambrano',
      idCard: '0000000000',
      email: 'sdf@gsdfsg.cfom',
      password: '12atsa34',
    },
    {
      id: 2,
      name: 'Pedro',
      lastName: 'Gomez',
      idCard: '0000000000',
      email: 'sdf@gsdfsg.cfom',
      password: '12atsa34',
    },
  ];

  selectedUser?: User;

  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),
          Validators.minLength(2),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),
          Validators.minLength(2),
        ],
      ],
      idCard: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          // Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
          Validators.email,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  saveUser() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    let newUser: User = {
      id: -1,
      name: this.userForm.value.name,
      lastName: this.userForm.value.lastName,
      idCard: this.userForm.value.idCard,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };

    if (!this.selectedUser) {
      newUser.id = (this.users.at(-1)?.id ?? this.users.length) + 1;
      this.users.push(newUser);
    } else {
      newUser.id = this.selectedUser.id;
      let oldUserIndex = this.users.indexOf(this.selectedUser);
      this.users.splice(oldUserIndex, 1, newUser);

      this.isEditing = false;
      this.selectedUser = undefined;
    }

    this.userForm.reset();
  }

  editUser(userId: number) {
    if (this.selectedUser?.id === userId) {
      this.isEditing = false;
      this.selectedUser = undefined;
      this.userForm.reset();
      return;
    }

    this.isEditing = true;
    this.selectedUser = this.users.find((u) => u.id === userId);
    if (!this.selectedUser) return;

    this.userForm.setValue({
      name: this.selectedUser.name,
      lastName: this.selectedUser.lastName,
      idCard: this.selectedUser.idCard,
      email: this.selectedUser.email,
      password: this.selectedUser.password,
    });
  }

  deleteUser(userId: number) {
    if (this.selectedUser?.id == userId) {
      this.isEditing = false;
      this.userForm.reset();
    }
    this.users = this.users.filter((u) => u.id !== userId);
  }
}
