import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryService } from '../../core/services/delivery/delivery.service';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import {
  Delivery,
  DeliveryByNeighborhood,
  DeliveryProgress,
  UnsuccessfulDeliveries,
} from '../../core/models/delivery';
import { DashboardComponent } from '../dashboard/dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let deliveryService: DeliveryService;

  const mockDeliveries: Delivery[] = [
    {
      id: '1',
      documento: '01021',
      motorista: {
        nome: 'João',
      },
      cliente_origem: {
        nome: 'Empresa ABC',
        endereco: 'Rua dos Pinheiros, 789',
        bairro: 'Jardins',
        cidade: 'São Paulo',
      },
      cliente_destino: {
        nome: 'Ana Clara',
        endereco: 'Rua Vergueiro, 1234',
        bairro: 'Centro',
        cidade: 'São Paulo',
      },
      status_entrega: 'ENTREGUE',
    },
    {
      id: '2',
      documento: '01034',
      motorista: {
        nome: 'Maria',
      },
      cliente_origem: {
        nome: 'Empresa DEF',
        endereco: 'Rua Augusta, 345',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
      },
      cliente_destino: {
        nome: 'Maria Souza',
        endereco: 'Avenida Paulista, 456',
        bairro: 'Centro',
        cidade: 'São Paulo',
      },
      status_entrega: 'INSUCESSO',
    },
    {
      id: '3',
      documento: '01022',
      motorista: {
        nome: 'João',
      },
      cliente_origem: {
        nome: 'Empresa DEF',
        endereco: 'Rua Augusta, 345',
        bairro: 'Consolação',
        cidade: 'São Paulo',
      },
      cliente_destino: {
        nome: 'Pedro Lima',
        endereco: 'Avenida Brasil, 1010',
        bairro: 'Jardim',
        cidade: 'São Paulo',
      },
      status_entrega: 'PENDENTE',
    },
  ];

  beforeEach(async () => {
    const deliveryServiceSpy = {
      getDeliveries: jest.fn().mockReturnValue(of(mockDeliveries)),
    };

    await TestBed.configureTestingModule({
      imports: [TableModule, CardModule, DashboardComponent],
      providers: [
        Title,
        { provide: DeliveryService, useValue: deliveryServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    deliveryService = TestBed.inject(DeliveryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadTable methods on ngOnInit', () => {
    const spyLoadTableDeliveryProgress = jest.spyOn(
      component,
      'loadTableDeliveryProgress'
    );
    const spyLoadTableFailureDelivery = jest.spyOn(
      component,
      'loadTableFailureDelivery'
    );
    const spyLoadTableDeliveryByNeighborhood = jest.spyOn(
      component,
      'loadTableDeliveryByNeighborhood'
    );

    component.ngOnInit();

    expect(spyLoadTableDeliveryProgress).toHaveBeenCalled();
    expect(spyLoadTableFailureDelivery).toHaveBeenCalled();
    expect(spyLoadTableDeliveryByNeighborhood).toHaveBeenCalled();
  });

  it('should load delivery progress data', () => {
    const expectedProgress: DeliveryProgress[] = [
      { name: 'João', amountDelivered: 1, amountLeftDelivery: 1 },
      { name: 'Maria', amountDelivered: 0, amountLeftDelivery: 0 },
    ];

    component.loadTableDeliveryProgress();
    expect(component.deliveryProgress).toEqual(expectedProgress);
  });

  it('should load unsuccessful deliveries data', () => {
    const expectedUnsuccessfulDeliveries: UnsuccessfulDeliveries[] = [
      { name: 'Maria', amount: 1 },
    ];

    component.loadTableFailureDelivery();
    expect(component.unsuccessfulDeliveries).toEqual(
      expectedUnsuccessfulDeliveries
    );
  });

  it('should load delivery data by neighborhood', () => {
    const expectedDeliveriesByNeighborhood: DeliveryByNeighborhood[] = [
      { neighborhood: 'Centro', amountDeliveries: 1, amountDelivered: 1 },
      { neighborhood: 'Jardim', amountDeliveries: 1, amountDelivered: 0 },
    ];

    component.loadTableDeliveryByNeighborhood();
    expect(component.deliveriesByNeighborhood).toEqual(
      expectedDeliveriesByNeighborhood
    );
  });

  it('should calculate delivery progress by driver', () => {
    const expectedProgress: DeliveryProgress[] = [
      { name: 'João', amountDelivered: 1, amountLeftDelivery: 1 },
      { name: 'Maria', amountDelivered: 0, amountLeftDelivery: 0 },
    ];

    const result = component.amountDeliveryProgressByDriver(mockDeliveries);
    expect(result).toEqual(expectedProgress);
  });

  it('should calculate unsuccessful deliveries', () => {
    const expectedUnsuccessful: UnsuccessfulDeliveries[] = [
      { name: 'Maria', amount: 1 },
    ];

    const result = component.amountUnsuccessfulDeliveries(mockDeliveries);
    expect(result).toEqual(expectedUnsuccessful);
  });

  it('should calculate delivery by neighborhood', () => {
    const expectedByNeighborhood: DeliveryByNeighborhood[] = [
      { neighborhood: 'Centro', amountDeliveries: 1, amountDelivered: 1 },
      { neighborhood: 'Jardim', amountDeliveries: 1, amountDelivered: 0 },
    ];

    const result = component.amountDeliveryByNeighborhood(mockDeliveries);
    expect(result).toEqual(expectedByNeighborhood);
  });
});
