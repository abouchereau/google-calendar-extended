import { Component, inject } from '@angular/core';
import { Config } from '../../core/config';
import { ReactiveFormsModule, FormControl, FormGroup  } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/entity/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {

  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly config = Config;
  protected form = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });


 login(): void {
    console.log('Login attempt with username:', this.form.value.username);
    this.authService
      .login(
        this.form.value.username!,
        this.form.value.password!
      )
      .subscribe({
        next: data => {
          const user: User = new User(data.username, data.token, data.write === '1');
          this.userService.register(user);
          this.router.navigate(['/']);

        },
        error: (error: HttpErrorResponse) => {

          if (error.status === 401) {
            alert('Échec de l’authentification');
          } else {
            alert(error.message);
          }

        }

      });

  }
}
