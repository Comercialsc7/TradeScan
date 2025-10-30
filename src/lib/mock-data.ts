export type Customer = {
  id: string
  name: string
  cnpj: string
  rede: string
  segmento: string
  cidade: string
  endereco: string
  telefone: string
}

export const customers: Customer[] = [
  {
    id: '789123',
    name: 'Supermercado Pague Menos',
    cnpj: '12.345.678/0001-99',
    rede: 'Rede Sol',
    segmento: 'Varejo',
    cidade: 'Campinas - SP',
    endereco: 'Rua das Flores, 123, Centro',
    telefone: '(19) 99999-1234',
  },
  {
    id: '456789',
    name: 'Atacadão Dia a Dia',
    cnpj: '98.765.432/0001-11',
    rede: 'Rede Forte',
    segmento: 'Atacado',
    cidade: 'São Paulo - SP',
    endereco: 'Avenida Principal, 456, Bairro Industrial',
    telefone: '(11) 98888-5678',
  },
  {
    id: '123456',
    name: 'Varejão do Povo',
    cnpj: '11.222.333/0001-44',
    rede: 'Rede União',
    segmento: 'Varejo',
    cidade: 'Rio de Janeiro - RJ',
    endereco: 'Praça da Sé, 789, Centro',
    telefone: '(21) 97777-9012',
  },
  {
    id: '987654',
    name: 'Mercado da Esquina',
    cnpj: '44.555.666/0001-77',
    rede: 'Rede Sol',
    segmento: 'Varejo',
    cidade: 'Belo Horizonte - MG',
    endereco: 'Rua dos Andradas, 101, Savassi',
    telefone: '(31) 96666-3456',
  },
  {
    id: '321654',
    name: 'Empório Bom Preço',
    cnpj: '77.888.999/0001-00',
    rede: 'Rede Forte',
    segmento: 'Varejo',
    cidade: 'Curitiba - PR',
    endereco: 'Alameda dos Anjos, 202, Batel',
    telefone: '(41) 95555-7890',
  },
  {
    id: '654987',
    name: 'Minimercado Central',
    cnpj: '22.333.444/0001-55',
    rede: 'Rede União',
    segmento: 'Varejo',
    cidade: 'Porto Alegre - RS',
    endereco: 'Avenida Ipiranga, 303, Moinhos de Vento',
    telefone: '(51) 94444-1234',
  },
]

export type Product = {
  barcode: string
  sku: string
  name: string
  description: string
  saleId: string
  lastPurchaseDate: string
  lastCost: number
  margin: number
  stock: number
  retailPrice: number
  salesLast30Days: number
  brand: string
}

export const products: Product[] = [
  {
    barcode: '7891000315507',
    sku: '8934-22A',
    name: 'Coca-Cola 2L',
    description:
      'Um parágrafo curto e de preenchimento sobre as características, benefícios e categoria do produto, fornecendo informações essenciais ao usuário rapidamente.',
    saleId: '#54823',
    lastPurchaseDate: '2025-10-12',
    lastCost: 5.5,
    margin: 0.35,
    stock: 25,
    retailPrice: 8.5,
    salesLast30Days: 150,
    brand: 'Coca-Cola',
  },
  {
    barcode: '7891991010836',
    sku: '7431-45B',
    name: 'Salgadinho Doritos Queijo Nacho 140g',
    description:
      'Um parágrafo curto e de preenchimento sobre as características, benefícios e categoria do produto, fornecendo informações essenciais ao usuário rapidamente.',
    saleId: '#54824',
    lastPurchaseDate: '2025-10-20',
    lastCost: 6.0,
    margin: 0.4,
    stock: 40,
    retailPrice: 9.99,
    salesLast30Days: 200,
    brand: 'Elma Chips',
  },
  {
    barcode: '7896065800034',
    sku: '1234-99C',
    name: 'Leite Integral Italac 1L',
    description:
      'Um parágrafo curto e de preenchimento sobre as características, benefícios e categoria do produto, fornecendo informações essenciais ao usuário rapidamente.',
    saleId: '#54825',
    lastPurchaseDate: '2025-10-22',
    lastCost: 3.2,
    margin: 0.25,
    stock: 120,
    retailPrice: 4.29,
    salesLast30Days: 500,
    brand: 'Italac',
  },
]
