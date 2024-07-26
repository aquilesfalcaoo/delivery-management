import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeliveryService } from '../../core/services/delivery/delivery.service';
import {
  Delivery,
  DeliveryByNeighborhood,
  DeliveryProgress,
  UnsuccessfulDeliveries,
} from '../../core/models/delivery';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TableModule, CardModule],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent implements OnInit {
  public unsuccessfulDeliveries: UnsuccessfulDeliveries[] = [];
  public deliveriesByNeighborhood: DeliveryByNeighborhood[] = [];
  public deliveryProgress: DeliveryProgress[] = [];
  private titleService = inject(Title);
  private deliveryService = inject(DeliveryService);

  ngOnInit(): void {
    this.titleService.setTitle('Delivery Management - Dashboard');
    this.loadTableDeliveryProgress();
    this.loadTableFailureDelivery();
    this.loadTableDeliveryByNeighborhood();
  }

  public loadTableDeliveryProgress(): void {
    this.deliveryService
      .getDeliveries()
      .pipe(
        map((deliveries) => this.amountDeliveryProgressByDriver(deliveries))
      )
      .subscribe((res) => {
        this.deliveryProgress = res;
      });
  }

  public loadTableFailureDelivery(): void {
    this.deliveryService
      .getDeliveries()
      .pipe(map((deliveries) => this.amountUnsuccessfulDeliveries(deliveries)))
      .subscribe((res) => {
        this.unsuccessfulDeliveries = res;
      });
  }

  public loadTableDeliveryByNeighborhood() {
    this.deliveryService
      .getDeliveries()
      .pipe(map((deliveries) => this.amountDeliveryByNeighborhood(deliveries)))
      .subscribe((res) => {
        this.deliveriesByNeighborhood = res;
      });
  }

  public amountDeliveryProgressByDriver(
    deliveries: Delivery[]
  ): DeliveryProgress[] {
    const countMap = deliveries.reduce((acc, delivery) => {
      const driver = delivery.motorista.nome;

      if (!acc[driver]) {
        acc[driver] = {
          amountDelivered: 0,
          amountLeftDelivery: 0,
        };
      }

      if (delivery.status_entrega === 'ENTREGUE') {
        acc[driver].amountDelivered += 1;
      } else if (delivery.status_entrega === 'PENDENTE') {
        acc[driver].amountLeftDelivery += 1;
      }

      return acc;
    }, {} as { [key: string]: { amountDelivered: number; amountLeftDelivery: number } });

    return Object.entries(countMap).map(
      ([name, { amountDelivered, amountLeftDelivery }]) => ({
        name,
        amountDelivered,
        amountLeftDelivery,
      })
    );
  }

  public amountUnsuccessfulDeliveries(
    deliveries: Delivery[]
  ): UnsuccessfulDeliveries[] {
    const countMap = deliveries
      .filter((delivery) => delivery.status_entrega === 'INSUCESSO')
      .reduce((acc, delivery) => {
        const motoristaNome = delivery.motorista.nome;
        acc[motoristaNome] = (acc[motoristaNome] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

    return Object.entries(countMap).map(([name, amount]) => ({ name, amount }));
  }

  public amountDeliveryByNeighborhood(
    deliveries: Delivery[]
  ): DeliveryByNeighborhood[] {
    const countMap = deliveries.reduce((acc, delivery) => {
      const neighborhood = delivery.cliente_destino.bairro;

      if (!acc[neighborhood]) {
        acc[neighborhood] = {
          amountDeliveries: 0,
          amountDelivered: 0,
        };
      }

      if (delivery.status_entrega === 'ENTREGUE') {
        acc[neighborhood].amountDelivered += 1;
      } else {
        acc[neighborhood].amountDeliveries += 1;
      }

      return acc;
    }, {} as { [key: string]: { amountDeliveries: number; amountDelivered: number } });

    return Object.entries(countMap).map(
      ([neighborhood, { amountDeliveries, amountDelivered }]) => ({
        neighborhood,
        amountDeliveries,
        amountDelivered,
      })
    );
  }
}
