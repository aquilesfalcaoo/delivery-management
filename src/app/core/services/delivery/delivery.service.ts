import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Delivery } from '../../models/delivery';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private http = inject(HttpClient);

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${environment.baseURL}/deliveries`);
  }
}
