import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedMaterialModule } from '../../../shared/shared-material/shared-material.module';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formNewUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.formNewUser = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async createNewUser() {
    if (this.formNewUser.valid) {
      try {
        await this._userService.registerNewUser(this.formNewUser.value);
        this.successfulCreateUser();
      } catch (error) {
        console.error('Error creating new user:', error);
        this.notSuccessfulCreateUser();
      }
    } else {
      console.warn('Form is invalid');
    }
  }

  successfulCreateUser() {
    this._snackBar.open('El usuario fue creado con exito', '', {
      duration: 2000,
    });
  }

  notSuccessfulCreateUser() {
    this._snackBar.open('El usuario no se pudo crear', '', {
      duration: 2000,
    });
  }
}
