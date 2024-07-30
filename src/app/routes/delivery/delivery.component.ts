import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import { DeliveryService } from '../../core/services/delivery/delivery.service';
import { Delivery, Status } from '../../core/models/delivery';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './delivery.component.html',
  styles: ``,
})
export class DeliveryComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  private titleService = inject(Title);
  private deliveryService = inject(DeliveryService);
  public deliveries: Delivery[] = [];
  public searchValue: string | undefined;
  public selectedStatus = '';
  public status: Status[] = [];

  ngOnInit(): void {
    this.titleService.setTitle('Delivery Management - Delivery');
    this.loadTable();
    this.setSelectedStatus();
  }

  setSelectedStatus(): void {
    this.status = [
      { label: 'Status', value: '' },
      { label: 'Entregue', value: 'ENTREGUE' },
      { label: 'Pendente', value: 'PENDENTE' },
      { label: 'Insucesso', value: 'INSUCESSO' },
    ];
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (this.dt1) {
      this.dt1.filter(value, 'motorista.nome', 'contains');
    }
  }

  onStatusChanges(event: DropdownChangeEvent): void {
    const value = event.value;

    if (this.dt1) {
      this.dt1.filter(value, 'status_entrega', 'equals');
    }
  }

  loadTable(): void {
    this.deliveryService.getDeliveries().subscribe((res) => {
      this.deliveries = res;
    });
  }
}
