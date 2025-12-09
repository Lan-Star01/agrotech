import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-consumer-scanner',
  imports: [CommonModule, FormsModule],
  templateUrl: './consumer-scanner.component.html',
  styleUrl: './consumer-scanner.component.css'
})
export class ConsumerScannerComponent {
  manualCode = '';
  errorMessage = '';
  isScanning = false;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  scanQRCode(): void {
    this.isScanning = true;
    this.errorMessage = '';

    setTimeout(() => {
      this.errorMessage = 'კამერით სკანირება ამ დემო ვერსიაში მიუწვდომელია. გთხოვთ გამოიყენოთ პროდუქტის ID.';
      this.isScanning = false;
    }, 1000);
  }

  searchByCode(): void {
    if (!this.manualCode.trim()) {
      this.errorMessage = 'გთხოვთ შეიყვანოთ პროდუქტის ID';
      return;
    }

    this.errorMessage = '';
    this.router.navigate(['/product', this.manualCode.trim()]);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  viewAllProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      if (products.length > 0) {
        this.router.navigate(['/product', products[0].id]);
      } else {
        this.errorMessage = 'პროდუქტები არ მოიძებნა. გთხოვთ ფერმერმა დაამატოს პროდუქტები.';
      }
    });
  }
}
