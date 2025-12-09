import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, JourneyStep } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  journey: JourneyStep[] = [];
  notFound = false;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadProduct(id);
    });
  }

  loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe(product => {
      if (product) {
        this.product = product;
        this.journey = this.productService.getProductJourney(product);
        this.productService.incrementScanCount(id);
        this.notFound = false;
      } else {
        this.notFound = true;
      }
      this.loading = false;
    });
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  scanAnother(): void {
    this.router.navigate(['/scanner']);
  }

  getIconClass(icon: string): string {
    const iconMap: { [key: string]: string } = {
      'seed': 'bi-sun',
      'plant': 'bi-flower1',
      'care': 'bi-droplet',
      'harvest': 'bi-basket',
      'transport': 'bi-truck',
      'store': 'bi-shop'
    };
    return iconMap[icon] || 'bi-circle';
  }
}
