import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  farmName: string = '';
  location: string = '';
  password: string = '';
  confirmPassword: string = '';

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
    this.errorMessage = '';

    // ვალიდაცია
    if (!this.name || !this.email || !this.phone || !this.farmName ||
        !this.location || !this.password || !this.confirmPassword) {
      this.errorMessage = 'გთხოვთ შეავსოთ ყველა ველი';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'პაროლები არ ემთხვევა';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო';
      return;
    }

    // ელფოსტის ვალიდაცია
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'გთხოვთ შეიყვანოთ სწორი ელ. ფოსტა';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const success = this.authService.register({
        name: this.name,
        email: this.email,
        phone: this.phone,
        farmName: this.farmName,
        location: this.location,
        password: this.password
      });

      this.isLoading = false;

      if (success) {
        this.router.navigate(['/farmer']);
      } else {
        this.errorMessage = 'ეს ელ. ფოსტა უკვე რეგისტრირებულია';
      }
    }, 500);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
