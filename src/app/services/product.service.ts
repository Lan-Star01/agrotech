import { Injectable } from '@angular/core';
import { Product, JourneyStep } from '../models/product.model';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';
import QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private storageService: StorageService) { }

  getAllProducts(): Observable<Product[]> {
    return of(this.storageService.getProducts());
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.storageService.getProductById(id));
  }

  async createProduct(product: Omit<Product, 'id' | 'qrCode' | 'scanCount' | 'createdAt'>): Promise<Product> {
    const id = this.generateId();
    const qrCode = await this.generateQRCode(id);

    const newProduct: Product = {
      ...product,
      id,
      qrCode,
      scanCount: 0,
      createdAt: new Date().toISOString()
    };

    this.storageService.addProduct(newProduct);
    return newProduct;
  }

  updateProduct(product: Product): void {
    this.storageService.updateProduct(product);
  }

  deleteProduct(id: string): void {
    this.storageService.deleteProduct(id);
  }

  incrementScanCount(id: string): void {
    this.storageService.incrementScanCount(id);
  }

  getProductJourney(product: Product): JourneyStep[] {
    return [
      {
        step: 'თესლის წარმოშობა',
        date: product.seedOrigin,
        location: product.seedOrigin,
        description: `სერტიფიცირებული თესლი - ${product.seedOrigin}`,
        icon: 'seed'
      },
      {
        step: 'დარგვა',
        date: product.plantingDate,
        location: product.location,
        description: `დარგული ${product.farmName}-ში`,
        icon: 'plant'
      },
      {
        step: 'მოვლა',
        date: new Date(new Date(product.plantingDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        location: product.location,
        description: 'ორგანული მოვლა, ბუნებრივი სასუქები',
        icon: 'care'
      },
      {
        step: 'მოსავლის აღება',
        date: product.harvestDate,
        location: product.location,
        description: `მოსავალი აღებულია ${product.farmName}-ში`,
        icon: 'harvest'
      },
      {
        step: 'ტრანსპორტირება',
        date: new Date(new Date(product.harvestDate).getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        location: product.transportMethod || 'რეფრიჟერატორით',
        description: `ტრანსპორტირება: ${product.transportMethod || 'რეფრიჟერატორით'}`,
        icon: 'transport'
      },
      {
        step: 'მაღაზია',
        date: new Date().toISOString().split('T')[0],
        location: product.storeLocation || 'საცალო ქსელი',
        description: `ხელმისაწვდომი: ${product.storeLocation || 'საცალო ქსელი'}`,
        icon: 'store'
      }
    ];
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private async generateQRCode(id: string): Promise<string> {
    try {
      const url = `${window.location.origin}/product/${id}`;
      return await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#2d5a2d',
          light: '#ffffff'
        }
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      return '';
    }
  }
}
