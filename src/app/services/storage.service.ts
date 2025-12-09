import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'agrotech_products';
  private readonly DEMO_DATA_KEY = 'agrotech_demo_initialized';

  constructor() {
    this.initializeDemoData();
  }

  saveProducts(products: Product[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
  }

  getProducts(): Product[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addProduct(product: Product): void {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      this.saveProducts(products);
    }
  }

  getProductById(id: string): Product | undefined {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  }

  deleteProduct(id: string): void {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    this.saveProducts(filtered);
  }

  incrementScanCount(id: string): void {
    const product = this.getProductById(id);
    if (product) {
      product.scanCount++;
      this.updateProduct(product);
    }
  }

  private initializeDemoData(): void {
    // Check if demo data already initialized
    if (localStorage.getItem(this.DEMO_DATA_KEY)) {
      return;
    }

    const demoProducts: Product[] = [
      {
        id: 'demo-1',
        name: 'ორგანული პომიდორი',
        farmName: 'მზიანი ველები',
        farmerName: 'გიორგი ბერიძე',
        farmerEmail: 'giorgi@mzianifields.ge',
        farmerPhone: '+995 555 123 456',
        category: 'ბოსტნეული',
        seedOrigin: 'ჰოლანდია - BioSeeds',
        plantingDate: '2024-03-15',
        harvestDate: '2024-06-20',
        certifications: ['ორგანული', 'ბიო', 'Georgian Organic'],
        location: 'კახეთი, საგარეჯო',
        description: 'სრულიად ორგანულად მოყვანილი პომიდორი, ბუნებრივი სასუქებით და მავნებლების ბიოლოგიური კონტროლით',
        imageUrl: 'https://images.unsplash.com/photo-1546470427-e26264be0b93?w=500',
        transportMethod: 'რეფრიჟერატორი 2-4°C',
        storeLocation: 'თბილისის ცენტრალური ბაზარი',
        qrCode: '',
        scanCount: 15,
        createdAt: '2024-03-15T10:00:00Z',
        journey: {
          planting: {
            date: '2024-03-15',
            notes: 'დათესილია ჰოლანდიური ორგანული თესლი, სათბურში',
            location: 'სათბური #3, საგარეჯო'
          },
          growing: {
            date: '2024-04-20',
            notes: 'გამოყენებულია ორგანული სასუქი და ბიოლოგიური მავნებლების კონტროლი',
            location: 'სათბური #3'
          },
          harvest: {
            date: '2024-06-20',
            notes: 'მოსავალი აღებულია ადრე დილით, სრულ სიმწიფეში',
            location: 'საგარეჯოს ფერმა'
          },
          processing: {
            date: '2024-06-20',
            notes: 'დასორტირება და ხარისხის კონტროლი',
            location: 'ფერმის დასამუშავებელი ცენტრი'
          },
          packaging: {
            date: '2024-06-21',
            notes: 'ეკოლოგიურად სუფთა შეფუთვა',
            location: 'საპაკეტე ცენტრი'
          },
          distribution: {
            date: '2024-06-22',
            notes: 'გადატანილია რეფრიჟერატორით 2-4°C ტემპერატურაზე',
            location: 'თბილისის ცენტრალური ბაზარი'
          }
        }
      },
      {
        id: 'demo-2',
        name: 'ბიო კიტრი',
        farmName: 'მწვანე ბაღები',
        farmerName: 'ნინო მელაძე',
        farmerEmail: 'nino@greengarden.ge',
        farmerPhone: '+995 555 987 654',
        category: 'ბოსტნეული',
        seedOrigin: 'საქართველო - ადგილობრივი თესლი',
        plantingDate: '2024-04-01',
        harvestDate: '2024-06-15',
        certifications: ['ბიო', 'ქართული ორგანული პროდუქტი'],
        location: 'იმერეთი, ქუთაისი',
        description: 'ადგილობრივი თესლით მოყვანილი, გემრიელი და ხრაშუნა კიტრი',
        imageUrl: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=500',
        transportMethod: 'სტანდარტული ტრანსპორტი',
        storeLocation: 'ქუთაისის ბაზრობა',
        qrCode: '',
        scanCount: 8,
        createdAt: '2024-04-01T09:00:00Z',
        journey: {
          planting: {
            date: '2024-04-01',
            notes: 'დათესილია ადგილობრივი, გადარჩენილი თესლი',
            location: 'ღია გრუნტი, ქუთაისი'
          },
          growing: {
            date: '2024-05-10',
            notes: 'მორწყვა ბუნებრივი წყაროს წყლით',
            location: 'ღია მინდორი'
          },
          harvest: {
            date: '2024-06-15',
            notes: 'ხელით კრეფა, ოპტიმალურ ზომაში',
            location: 'მწვანე ბაღების ფერმა'
          },
          packaging: {
            date: '2024-06-15',
            notes: 'ბუნებრივი მასალის ტომრებში შეფუთული',
            location: 'ფერმა'
          },
          distribution: {
            date: '2024-06-16',
            notes: 'მიწოდებული ადგილობრივ ბაზარზე',
            location: 'ქუთაისის ბაზრობა'
          }
        }
      },
      {
        id: 'demo-3',
        name: 'ეკო ვაშლი',
        farmName: 'მთის ხილი',
        farmerName: 'დავით ქველაძე',
        farmerEmail: 'davit@mountainfruit.ge',
        farmerPhone: '+995 555 456 789',
        category: 'ხილი',
        seedOrigin: 'საქართველო - მთის ჯიში',
        plantingDate: '2023-11-10',
        harvestDate: '2024-09-20',
        certifications: ['ორგანული', 'მთის პროდუქტი'],
        location: 'რაჭა, ამბროლაური',
        description: 'რაჭის მთებში, 1200 მეტრ სიმაღლეზე მოყვანილი ბუნებრივი ვაშლი',
        imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500',
        transportMethod: 'რეფრიჟერატორი',
        storeLocation: 'თბილისის სუპერმარკეტები',
        qrCode: '',
        scanCount: 23,
        createdAt: '2023-11-10T08:00:00Z',
        journey: {
          planting: {
            date: '2023-11-10',
            notes: 'დარგულია ადგილობრივი, გამძლე ჯიშის ნერგი',
            location: 'რაჭა, 1200მ სიმაღლე'
          },
          growing: {
            date: '2024-05-15',
            notes: 'ბუნებრივი მოვლა, მინიმალური ინტერვენციით',
            location: 'მთის ბაღი'
          },
          harvest: {
            date: '2024-09-20',
            notes: 'ხელით კრეფა, ნაზად, სრული სიმწიფის შემდეგ',
            location: 'რაჭის მთის ბაღი'
          },
          processing: {
            date: '2024-09-21',
            notes: 'ხარისხის შემოწმება, დასორტირება ზომების მიხედვით',
            location: 'ამბროლაურის დამუშავებელი ცენტრი'
          },
          packaging: {
            date: '2024-09-22',
            notes: 'ხის ყუთებში შეფუთვა',
            location: 'საპაკეტე ცენტრი'
          },
          distribution: {
            date: '2024-09-23',
            notes: 'რეფრიჟერატორით ტრანსპორტირება თბილისში',
            location: 'თბილისის სუპერმარკეტები'
          }
        }
      }
    ];

    // Add demo products if no products exist
    const existingProducts = this.getProducts();
    if (existingProducts.length === 0) {
      this.saveProducts(demoProducts);
    }

    // Mark demo data as initialized
    localStorage.setItem(this.DEMO_DATA_KEY, 'true');
  }
}
