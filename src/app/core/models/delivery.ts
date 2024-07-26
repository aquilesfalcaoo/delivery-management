export interface Delivery {
  id: string;
  documento: string;
  motorista: Motorista;
  cliente_origem: Cliente;
  cliente_destino: Cliente;
  status_entrega: string;
}

export interface Cliente {
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
}

export interface Motorista {
  nome: string;
}

export interface UnsuccessfulDeliveries {
  name: string;
  amount: number;
}

export interface DeliveryProgress {
  name: string;
  amountDelivered: number;
  amountLeftDelivery: number;
}

export interface DeliveryByNeighborhood {
  neighborhood: string;
  amountDeliveries: number;
  amountDelivered: number;
}