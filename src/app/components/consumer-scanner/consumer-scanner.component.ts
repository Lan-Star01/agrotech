import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { QrScannerService, ScanResult } from '../../services/qr-scanner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consumer-scanner',
  imports: [CommonModule, FormsModule],
  templateUrl: './consumer-scanner.component.html',
  styleUrl: './consumer-scanner.component.css'
})
export class ConsumerScannerComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  manualCode = '';
  errorMessage = '';
  cameraError = '';
  isScanning = false;
  showCamera = false;

  private scanSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private productService: ProductService,
    private qrScannerService: QrScannerService
  ) {}

  ngOnInit(): void {
    this.scanSubscription = this.qrScannerService.scanResult$.subscribe(result => {
      if (result) {
        this.handleScanResult(result);
      }
    });
  }

  ngOnDestroy(): void {
    this.stopCamera();
    if (this.scanSubscription) {
      this.scanSubscription.unsubscribe();
    }
  }

  async startCamera(): Promise<void> {
    this.showCamera = true;
    this.cameraError = '';
    this.errorMessage = '';
    this.isScanning = true;

    setTimeout(async () => {
      if (this.videoElement?.nativeElement) {
        await this.qrScannerService.startScanning(this.videoElement.nativeElement);
      }
    }, 100);
  }

  stopCamera(): void {
    this.showCamera = false;
    this.isScanning = false;
    this.qrScannerService.stopScanning();
    this.qrScannerService.resetResult();
  }

  private handleScanResult(result: ScanResult): void {
    if (result.success && result.data) {
      this.stopCamera();

      let productId = result.data;

      // თუ URL არის, ამოვიღოთ ID
      if (result.data.includes('/product/') || result.data.includes('/lookup/')) {
        const parts = result.data.split('/');
        productId = parts[parts.length - 1];
      }

      this.router.navigate(['/lookup', productId]);
    } else if (result.error) {
      this.cameraError = result.error;
      this.isScanning = false;
    }
  }

  searchByCode(): void {
    if (!this.manualCode.trim()) {
      this.errorMessage = 'გთხოვთ შეიყვანოთ პროდუქტის ID';
      return;
    }

    this.errorMessage = '';
    this.router.navigate(['/lookup', this.manualCode.trim()]);
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
