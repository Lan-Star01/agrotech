import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Farmer } from '../models/farmer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly FARMERS_KEY = 'agrotech_farmers';
  private readonly CURRENT_FARMER_KEY = 'agrotech_current_farmer';

  private currentFarmerSubject: BehaviorSubject<Farmer | null>;
  public currentFarmer$: Observable<Farmer | null>;

  constructor() {
    const storedFarmer = localStorage.getItem(this.CURRENT_FARMER_KEY);
    this.currentFarmerSubject = new BehaviorSubject<Farmer | null>(
      storedFarmer ? JSON.parse(storedFarmer) : null
    );
    this.currentFarmer$ = this.currentFarmerSubject.asObservable();

    this.initializeMockFarmers();
  }

  private initializeMockFarmers(): void {
    const farmers = this.getFarmers();
    if (farmers.length === 0) {
      const mockFarmers: Farmer[] = [
        {
          id: 'farmer_001',
          name: 'გიორგი მელაძე',
          email: 'giorgi@greenfarm.ge',
          phone: '+995 555 123 456',
          farmName: 'მწვანე ველი',
          location: 'თბილისი, საბურთალო',
          password: 'demo123'
        },
        {
          id: 'farmer_002',
          name: 'ნინო ბერიძე',
          email: 'nino@ecofarm.ge',
          phone: '+995 555 234 567',
          farmName: 'ეკო ფერმა',
          location: 'მცხეთა, ჯვარი',
          password: 'demo123'
        }
      ];
      localStorage.setItem(this.FARMERS_KEY, JSON.stringify(mockFarmers));
    }
  }

  login(email: string, password: string): boolean {
    const farmers = this.getFarmers();
    const farmer = farmers.find(f => f.email === email && f.password === password);

    if (farmer) {
      const farmerWithoutPassword = { ...farmer };
      delete farmerWithoutPassword.password;

      localStorage.setItem(this.CURRENT_FARMER_KEY, JSON.stringify(farmerWithoutPassword));
      this.currentFarmerSubject.next(farmerWithoutPassword);
      return true;
    }
    return false;
  }

  register(farmer: Omit<Farmer, 'id'>): boolean {
    const farmers = this.getFarmers();

    if (farmers.some(f => f.email === farmer.email)) {
      return false;
    }

    const newFarmer: Farmer = {
      ...farmer,
      id: 'farmer_' + Date.now().toString(36)
    };

    farmers.push(newFarmer);
    localStorage.setItem(this.FARMERS_KEY, JSON.stringify(farmers));

    const farmerWithoutPassword = { ...newFarmer };
    delete farmerWithoutPassword.password;

    localStorage.setItem(this.CURRENT_FARMER_KEY, JSON.stringify(farmerWithoutPassword));
    this.currentFarmerSubject.next(farmerWithoutPassword);

    return true;
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_FARMER_KEY);
    this.currentFarmerSubject.next(null);
  }

  getCurrentFarmer(): Farmer | null {
    return this.currentFarmerSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentFarmerSubject.value !== null;
  }

  private getFarmers(): Farmer[] {
    const data = localStorage.getItem(this.FARMERS_KEY);
    return data ? JSON.parse(data) : [];
  }
}
