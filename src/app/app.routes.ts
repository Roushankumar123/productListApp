import { Routes } from '@angular/router';
import { ApiIntegrationComponent } from './components/api-integration/api-integration.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: ApiIntegrationComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
];
