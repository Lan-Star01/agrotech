import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { FarmerDashboardComponent } from './components/farmer-dashboard/farmer-dashboard.component';
import { ConsumerScannerComponent } from './components/consumer-scanner/consumer-scanner.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductLookupComponent } from './components/product-lookup/product-lookup.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'farmer', component: FarmerDashboardComponent, canActivate: [authGuard] },
  { path: 'scanner', component: ConsumerScannerComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'lookup', component: ProductLookupComponent },
  { path: 'lookup/:id', component: ProductLookupComponent },
  { path: '**', redirectTo: '' }
];
