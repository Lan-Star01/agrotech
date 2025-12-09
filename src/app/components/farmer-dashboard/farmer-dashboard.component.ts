import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product, ProductJourney } from '../../models/product.model';
import { Farmer } from '../../models/farmer.model';
import { JourneyTimelineComponent } from '../journey-timeline/journey-timeline.component';

@Component({
  selector: 'app-farmer-dashboard',
  imports: [CommonModule, FormsModule, JourneyTimelineComponent],
  templateUrl: './farmer-dashboard.component.html',
  styleUrl: './farmer-dashboard.component.css'
})
export class FarmerDashboardComponent implements OnInit {
  products: Product[] = [];
  showAddForm = false;
  selectedProduct: Product | null = null;
  isSubmitting = false;
  currentFarmer: Farmer | null = null;

  newProduct = {
    name: '',
    category: '',
    seedOrigin: '',
    plantingDate: '',
    harvestDate: '',
    certifications: [] as string[],
    description: '',
    imageUrl: '',
    transportMethod: '',
    storeLocation: '',
    journey: {
      planting: { date: '', notes: '', location: '' },
      growing: { date: '', notes: '', location: '' },
      harvest: { date: '', notes: '', location: '' },
      processing: { date: '', notes: '', location: '' },
      packaging: { date: '', notes: '', location: '' },
      distribution: { date: '', notes: '', location: '' }
    }
  };

  certificationInput = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentFarmer = this.authService.getCurrentFarmer();
    if (!this.currentFarmer) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadProducts();
  }

  loadProducts(): void {
    if (!this.currentFarmer) return;

    this.productService.getAllProducts().subscribe(products => {
      // Filter products to show only current farmer's products
      this.products = products.filter(p => p.farmerEmail === this.currentFarmer!.email);
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addCertification(): void {
    if (this.certificationInput.trim()) {
      this.newProduct.certifications.push(this.certificationInput.trim());
      this.certificationInput = '';
    }
  }

  removeCertification(index: number): void {
    this.newProduct.certifications.splice(index, 1);
  }

  async submitProduct(): Promise<void> {
    if (!this.validateForm() || !this.currentFarmer) {
      alert('გთხოვთ შეავსოთ ყველა სავალდებულო ველი');
      return;
    }

    this.isSubmitting = true;
    try {
      const cleanedJourney = this.cleanJourneyData();

      const productData = {
        ...this.newProduct,
        farmName: this.currentFarmer.farmName,
        farmerName: this.currentFarmer.name,
        farmerEmail: this.currentFarmer.email,
        farmerPhone: this.currentFarmer.phone,
        location: this.currentFarmer.location,
        journey: cleanedJourney
      };

      await this.productService.createProduct(productData);
      alert('პროდუქტი წარმატებით დაემატა!');
      this.loadProducts();
      this.toggleAddForm();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('შეცდომა პროდუქტის დამატებისას');
    } finally {
      this.isSubmitting = false;
    }
  }

  cleanJourneyData(): ProductJourney {
    const journey: ProductJourney = {};
    const stages: (keyof ProductJourney)[] = ['planting', 'growing', 'harvest', 'processing', 'packaging', 'distribution'];

    stages.forEach(stage => {
      const stageData = this.newProduct.journey[stage];
      if (stageData.date) {
        journey[stage] = {
          date: stageData.date,
          notes: stageData.notes || '',
          location: stageData.location || ''
        };
      }
    });

    return journey;
  }

  validateForm(): boolean {
    return !!(
      this.newProduct.name &&
      this.newProduct.category &&
      this.newProduct.plantingDate &&
      this.newProduct.harvestDate
    );
  }

  resetForm(): void {
    this.newProduct = {
      name: '',
      category: '',
      seedOrigin: '',
      plantingDate: '',
      harvestDate: '',
      certifications: [],
      description: '',
      imageUrl: '',
      transportMethod: '',
      storeLocation: '',
      journey: {
        planting: { date: '', notes: '', location: '' },
        growing: { date: '', notes: '', location: '' },
        harvest: { date: '', notes: '', location: '' },
        processing: { date: '', notes: '', location: '' },
        packaging: { date: '', notes: '', location: '' },
        distribution: { date: '', notes: '', location: '' }
      }
    };
    this.certificationInput = '';
  }

  logout(): void {
    if (confirm('დარწმუნებული ხართ, რომ გსურთ გასვლა?')) {
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }

  viewProduct(product: Product): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  deleteProduct(id: string): void {
    if (confirm('დარწმუნებული ხართ, რომ გსურთ პროდუქტის წაშლა?')) {
      this.productService.deleteProduct(id);
      this.loadProducts();
    }
  }

  downloadQR(product: Product): void {
    if (product.qrCode) {
      const link = document.createElement('a');
      link.href = product.qrCode;
      link.download = `${product.name}-QR.png`;
      link.click();
    }
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
