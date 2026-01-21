import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { QrScannerService, ScanResult } from '../../services/qr-scanner.service';
import { Product } from '../../models/product.model';
import { JourneyTimelineComponent } from '../journey-timeline/journey-timeline.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-lookup',
  standalone: true,
  imports: [CommonModule, FormsModule, JourneyTimelineComponent],
  templateUrl: './product-lookup.component.html',
  styleUrl: './product-lookup.component.css'
})
export class ProductLookupComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  productId: string = '';
  product: Product | null = null;
  loading: boolean = false;
  notFound: boolean = false;
  showCamera: boolean = false;
  errorMessage = '';
  cameraError = '';
  isScanning = false;

  private scanSubscription: Subscription | null = null;

  // დემო პროდუქტები
  private demoProducts: Product[] = [
    {
      id: 'DEMO001',
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
      id: 'DEMO002',
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
      id: 'DEMO003',
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
    },
    {
      id: 'DEMO004',
      name: 'ორგანული სტაფილო',
      farmName: 'ბუნების საჩუქარი',
      farmerName: 'მარიამ გელაშვილი',
      farmerEmail: 'mariam@naturegift.ge',
      farmerPhone: '+995 555 321 789',
      category: 'ხილი',
      seedOrigin: 'საფრანგეთი - EcoFruit',
      plantingDate: '2024-02-10',
      harvestDate: '2024-07-25',
      certifications: ['ორგანული', 'EU BIO', 'ეროვნული ორგანული სტანდარტი'],
      location: 'სამეგრელო, ზუგდიდი',
      description: 'სრულიად ბუნებრივად მოყვანილი სტაფილო, ქიმიური დამხმარე საშუალებების გარეშე',
      imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500',
      transportMethod: 'რეფრიჟერატორი 0-2°C',
      storeLocation: 'თბილისი, Carrefour',
      qrCode: '',
      scanCount: 42,
      createdAt: '2024-02-10T08:30:00Z',
      journey: {
        planting: {
          date: '2024-02-10',
          notes: 'საფრანგეთიდან შემოტანილი ორგანული ნერგები, დარგული სპეციალურ ნიადაგში',
          location: 'სათბური კომპლექსი, ზუგდიდი'
        },
        growing: {
          date: '2024-04-15',
          notes: 'მორწყვა სისტემატური, კომპოსტური სასუქი, ბუნებრივი მავნებლების საწინააღმდეგო საშუალებები',
          location: 'სათბური'
        },
        harvest: {
          date: '2024-07-25',
          notes: 'ხელით, ფრთხილად, დილის საათებში რომ შენარჩუნდეს სიახლე',
          location: 'ბუნების საჩუქრის ფერმა'
        },
        processing: {
          date: '2024-07-25',
          notes: 'დაუყოვნებელი გაწმენდა, დახარისხება ზომისა და ხარისხის მიხედვით',
          location: 'ფერმის დამუშავების ცეხი'
        },
        packaging: {
          date: '2024-07-26',
          notes: 'ბიოდეგრადირებად შეფუთვაში, ხის კონტეინერებში',
          location: 'პაკეტირების განყოფილება'
        },
        distribution: {
          date: '2024-07-27',
          notes: 'სწრაფი მიწოდება რეფრიჟერატორული ტრანსპორტით თბილისში',
          location: 'Carrefour ქსელი'
        }
      }
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private qrScannerService: QrScannerService
  ) {}

  ngOnInit(): void {
    // Check if product ID is in URL
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = params['id'];
        this.lookupProduct();
      }
    });

    // Subscribe to scan results
    this.scanSubscription = this.qrScannerService.scanResult$.subscribe(result => {
      if (result) {
        this.handleScanResult(result);
      }
    });
  }

  ngAfterViewInit(): void {
    // ვიდეო ელემენტი მზად არის
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
    this.isScanning = true;

    // დაველოდოთ DOM-ის განახლებას
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
      // QR კოდი წარმატებით დასკანერდა
      this.stopCamera();

      // შევეცადოთ პროდუქტის ID-ს ამოღება
      let productId = result.data;

      // თუ URL არის, ამოვიღოთ ID
      if (result.data.includes('/product/') || result.data.includes('/lookup/')) {
        const parts = result.data.split('/');
        productId = parts[parts.length - 1];
      }

      this.productId = productId;
      this.lookupProduct();
    } else if (result.error) {
      this.cameraError = result.error;
      this.isScanning = false;
    }
  }

  lookupProduct(): void {
    if (!this.productId.trim()) {
      return;
    }

    this.loading = true;
    this.notFound = false;
    this.product = null;

    const searchId = this.productId.trim();

    // ჯერ დემო პროდუქტებში ვეძებთ
    const demoProduct = this.demoProducts.find(p => p.id === searchId);

    if (demoProduct) {
      this.product = demoProduct;
      this.loading = false;
      return;
    }

    // თუ დემოში არ მოიძებნა, LocalStorage-ში ვეძებთ
    this.productService.getProductById(searchId).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          this.productService.incrementScanCount(searchId);
        } else {
          this.notFound = true;
        }
        this.loading = false;
      },
      error: () => {
        this.notFound = true;
        this.loading = false;
      }
    });
  }

  searchProduct(): void {
    if (this.productId.trim()) {
      this.lookupProduct();
    }
  }

  reset(): void {
    this.productId = '';
    this.product = null;
    this.notFound = false;
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ka-GE');
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
