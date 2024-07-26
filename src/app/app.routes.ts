import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routes/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'delivery',
    loadComponent: () =>
      import('./routes/delivery/delivery.component').then(
        (c) => c.DeliveryComponent
      ),
  },
];
