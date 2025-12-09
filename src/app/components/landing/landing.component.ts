import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  constructor(private router: Router) {}

  navigateToFarmer(): void {
    this.router.navigate(['/farmer']);
  }

  navigateToScanner(): void {
    this.router.navigate(['/scanner']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  navigateToLookup(): void {
    this.router.navigate(['/lookup']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
