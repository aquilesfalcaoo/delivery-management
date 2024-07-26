import { TestBed } from '@angular/core/testing';

import { DeliveryService } from './delivery.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Delivery } from '../../models/delivery';
import { environment } from '../../../../environments/environment.development';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeliveryService],
    });
    service = TestBed.inject(DeliveryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return deliveries list', () => {
    const mockDeliveries: Delivery[] = [
      {
        id: '1',
        documento: '91205492',
        motorista: {
          nome: 'João Silva',
        },
        cliente_origem: {
          nome: 'Tecmaster LTDA',
          endereco: 'Rua dos Alfineiros, 102',
          bairro: 'Feira Nova',
          cidade: 'Lima Pacheco',
        },
        cliente_destino: {
          nome: 'Leonardo Peixoto',
          endereco: 'Rua Teixeira Neves, 522',
          bairro: 'Peneiras',
          cidade: 'Oliveiras',
        },
        status_entrega: 'ENTREGUE',
      },
    ];
    service.getDeliveries().subscribe((deliveries) => {
      expect(deliveries).toEqual(mockDeliveries);
    });

    const req = httpTestingController.expectOne(
      `${environment.baseURL}/deliveries`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockDeliveries);
  });
});
