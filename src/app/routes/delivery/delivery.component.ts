import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import { DeliveryService } from '../../core/services/delivery/delivery.service';
import { Delivery } from '../../core/models/delivery';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CardModule, TableModule, FormsModule, InputTextModule],
  templateUrl: './delivery.component.html',
  styles: ``,
})
export class DeliveryComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  private titleService = inject(Title);
  private deliveryService = inject(DeliveryService);
  public deliveries: Delivery[] = [];
  public searchValue: string | undefined;

  ngOnInit(): void {
    this.titleService.setTitle('Delivery Management - Delivery');
    this.loadTable();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (this.dt1) {
      this.dt1.filterGlobal(value, 'contains');
    }
  }

  loadTable(): void {
    this.deliveryService.getDeliveries().subscribe((res) => {
      this.deliveries = res;
    });
  }
}
