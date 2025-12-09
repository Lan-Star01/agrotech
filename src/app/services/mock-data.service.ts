import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  getMockProducts(): Product[] {
    return [
      {
        id: 'demo_tomato_001',
        name: 'ორგანული პომიდორი',
        farmName: 'მწვანე ველი',
        farmerName: 'გიორგი მელაძე',
        farmerEmail: 'giorgi@greenfarm.ge',
        farmerPhone: '+995 555 123 456',
        category: 'ბოსტნეული',
        seedOrigin: 'ჰოლანდია, BioCert Seeds',
        plantingDate: '2024-09-15',
        harvestDate: '2024-11-20',
        certifications: ['EU ორგანული სერტიფიკატი', 'ბიო სერტიფიკატი', 'ISO 9001'],
        location: 'თბილისი, საბურთალო',
        description: '100% ორგანული პომიდორი, მოყვანილი ბუნებრივი სასუქებით, გარეშე ქიმიური დანამატების. იდეალურია სალათებისა და სოუსებისთვის.',
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500',
        transportMethod: 'რეფრიჟერატორული ტრანსპორტი',
        storeLocation: 'Carrefour, თბილისი მოლი',
        qrCode: '',
        scanCount: 12,
        createdAt: '2024-11-20T10:00:00.000Z'
      },
      {
        id: 'demo_cucumber_002',
        name: 'ბიო კიტრი',
        farmName: 'ეკო ფერმა',
        farmerName: 'ნინო ბერიძე',
        farmerEmail: 'nino@ecofarm.ge',
        farmerPhone: '+995 555 234 567',
        category: 'ბოსტნეული',
        seedOrigin: 'საქართველო, ადგილობრივი თესლი',
        plantingDate: '2024-08-10',
        harvestDate: '2024-10-15',
        certifications: ['ორგანული პროდუქტი', 'ეკოლოგიურად სუფთა'],
        location: 'მცხეთა, ჯვარი',
        description: 'ტრადიციული ქართული კიტრი, მოყვანილი ეკოლოგიურად სუფთა ზონაში. სრულიად ბუნებრივი და ჯანსაღი.',
        imageUrl: 'https://images.unsplash.com/photo-1568584711271-81a0381d50eb?w=500',
        transportMethod: 'სტანდარტული ტრანსპორტი',
        storeLocation: 'Goodwill, ვაკე',
        scanCount: 8,
        createdAt: '2024-10-15T14:30:00.000Z'
      },
      {
        id: 'demo_apple_003',
        name: 'წითელი ვაშლი',
        farmName: 'მთის ხილი',
        farmerName: 'დავით გიორგაძე',
        farmerEmail: 'davit@mountainfruit.ge',
        farmerPhone: '+995 555 345 678',
        category: 'ხილი',
        seedOrigin: 'გორი, ადგილობრივი ნერგები',
        plantingDate: '2020-03-20',
        harvestDate: '2024-09-25',
        certifications: ['ეკო სერტიფიკატი', 'ბუნებრივი პროდუქტი'],
        location: 'გორი, ატენი',
        description: 'მთიანეთში მოყვანილი არომატული ვაშლი. გამორჩეული გემოთი და სიტკბოთი. მაღალი ხარისხის პროდუქტი.',
        imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
        transportMethod: 'რეფრიჟერატორული ტრანსპორტი',
        storeLocation: 'სამტრედიას ბაზარი',
        scanCount: 25,
        createdAt: '2024-09-25T09:15:00.000Z'
      },
      {
        id: 'demo_strawberry_004',
        name: 'ორგანული მარწყვი',
        farmName: 'ბუნების საჩუქარი',
        farmerName: 'თამარ ხარაიშვილი',
        farmerEmail: 'tamar@naturegift.ge',
        farmerPhone: '+995 555 456 789',
        category: 'ხილი',
        seedOrigin: 'იტალია, Premium Seeds',
        plantingDate: '2024-04-10',
        harvestDate: '2024-06-15',
        certifications: ['EU ორგანული', 'ბიო სერტიფიკატი', 'Global GAP'],
        location: 'ქუთაისი, მაჭვანაანი',
        description: 'ულამაზესი და არომატული მარწყვი. მოყვანილი თანამედროვე სათბურებში, ორგანული სასუქებით.',
        imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500',
        transportMethod: 'სწრაფი მიწოდება, კონტროლირებადი ტემპერატურა',
        storeLocation: 'Carrefour, სამგორი',
        scanCount: 18,
        createdAt: '2024-06-15T11:00:00.000Z'
      },
      {
        id: 'demo_potato_005',
        name: 'კარტოფილი',
        farmName: 'ფერმერული მეურნეობა',
        farmerName: 'ლევან კვირიკაშვილი',
        farmerEmail: 'levan@farmhouse.ge',
        farmerPhone: '+995 555 567 890',
        category: 'ბოსტნეული',
        seedOrigin: 'ახალციხე, ადგილობრივი თესლი',
        plantingDate: '2024-05-01',
        harvestDate: '2024-08-20',
        certifications: ['ორგანული პროდუქტი'],
        location: 'ახალციხე, ვარძია',
        description: 'ხარისხიანი კარტოფილი სამხრეთ საქართველოდან. შესანიშნავი გემო და სტრუქტურა.',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500',
        transportMethod: 'სტანდარტული ტრანსპორტი',
        storeLocation: 'ბაზრობა, დიდუბე',
        scanCount: 15,
        createdAt: '2024-08-20T16:45:00.000Z'
      }
    ];
  }

  loadMockData(): void {
    const existingData = localStorage.getItem('agrotech_products');
    if (!existingData || JSON.parse(existingData).length === 0) {
      localStorage.setItem('agrotech_products', JSON.stringify(this.getMockProducts()));
    }
  }
}
