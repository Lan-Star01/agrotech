import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // If already logged in, redirect to farmer dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/farmer']);
    }
  }

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'გთხოვთ შეავსოთ ყველა ველი';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const success = this.authService.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/farmer']);
    } else {
      this.errorMessage = 'არასწორი ელ. ფოსტა ან პაროლი';
      this.isLoading = false;
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
