import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryComponent } from './delivery.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Delivery } from '../../core/models/delivery';
import { DeliveryService } from '../../core/services/delivery/delivery.service';
import { of } from 'rxjs';
import { Table } from 'primeng/table';

describe('DeliveryComponent', () => {
  let component: DeliveryComponent;
  let fixture: ComponentFixture<DeliveryComponent>;
  let dataTableMock: jest.Mocked<Table>;
  let deliveryService: DeliveryService;

  beforeEach(async () => {
    dataTableMock = {
      filterGlobal: jest.fn(),
    } as unknown as jest.Mocked<Table>;
    await TestBed.configureTestingModule({
      imports: [DeliveryComponent, HttpClientTestingModule],
      providers: [DeliveryService, { provide: Table, useValue: dataTableMock }],
    }).compileComponents();

    deliveryService = TestBed.inject(DeliveryService);
    fixture = TestBed.createComponent(DeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dt1 = dataTableMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a table', () => {
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

    jest
      .spyOn(deliveryService, 'getDeliveries')
      .mockReturnValue(of(mockDeliveries));

    component.loadTable();
    fixture.detectChanges();

    expect(component.deliveries).toEqual(mockDeliveries);
  });

  it('should call filterGlobal on input event', () => {
    const inputValue = 'João Silva';
    const event = {
      target: { value: inputValue },
    } as unknown as Event;

    component.onInput(event);

    expect(component.dt1?.filterGlobal).toHaveBeenCalledWith(
      inputValue,
      'contains'
    );
  });
});
