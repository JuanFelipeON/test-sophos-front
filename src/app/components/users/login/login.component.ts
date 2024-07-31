import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import {  } from '../../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  readonly createNewUser = inject(MatDialog);

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  openRegister(){
    const createNewUserRef = this.createNewUser.open(RegisterComponent, {
      width: '550px',
      disableClose: true,
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const newUser = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        };
        const response = await this._userService.loginUser(
          newUser
        );
        if (!response.error) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/task-list']);
        } else {
          console.error('Login error:', response.error);
        }
      } catch (error) {
        console.error('HTTP error:', error);
      }
    } else {
      console.warn('Formulario inválido');
    }
  }
}
