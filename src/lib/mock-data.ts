import { subDays } from 'date-fns'

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
]

export type Product = {
  barcode: string
  sku: string
  name: string
  description: string
  brand: string
  stock: number
  retailPrice: number
  baseCost: number
}

export const products: Product[] = [
  {
    barcode: '7891000315507',
    sku: '8934-22A',
    name: 'Coca-Cola 2L',
    description:
      'Um parágrafo curto e de preenchimento sobre as características, benefícios e categoria do produto, fornecendo informações essenciais ao usuário rapidamente.',
    brand: 'Coca-Cola',
    stock: 25,
    retailPrice: 8.5,
    baseCost: 5.5,
  },
  {
    barcode: '7891991010836',
    sku: '7431-45B',
    name: 'Salgadinho Doritos Queijo Nacho 140g',
    description:
      'Um parágrafo curto e de preenchimento sobre as características, benefícios e categoria do produto, fornecendo informações essenciais ao usuário rapidamente.',
    brand: 'Elma Chips',
    stock: 40,
    retailPrice: 9.99,
    baseCost: 6.0,
  },
  {
    barcode: '7896065800034',
    sku: '1234-99C',
    name: 'Leite Integral Italac 1L',
    description:
      'Um parágrafo curto e de preenchimento sobre as características, benefícios e categoria do produto, fornecendo informações essenciais ao usuário rapidamente.',
    brand: 'Italac',
    stock: 120,
    retailPrice: 4.29,
    baseCost: 3.2,
  },
  {
    barcode: '7896336006921',
    sku: 'TRAK-CHOC-126',
    name: 'Biscoito Trakinas Chocolate 126g',
    description:
      'Um parágrafo curto e de preenchimento sobre as características, benefícios e categoria do produto, fornecendo informações essenciais ao usuário rapidamente.',
    brand: 'Trakinas',
    stock: 80,
    retailPrice: 2.99,
    baseCost: 1.8,
  },
]

export type Sale = {
  NRO_PEDIDO: string
  DATA_INCLUSAO: string
  NRO_NFE: string
  DATA_FATURAMENTO: string
  PRODUTO: string // barcode
  FORNECEDOR: string
  VENDEDOR: string
  CLIENTE: string // customer id
  SITUACAO: 'Faturado' | 'Pendente' | 'Cancelado'
  VALOR: number
  QTDE_EMB: number
  EMBALAGEM: string
  QTDE_EMBALAGEM: number
  QTDE_FORMA_EMBALAGEM: number
  CGO: string
}

export const sales: Sale[] = [
  {
    NRO_PEDIDO: 'PED1001',
    DATA_INCLUSAO: subDays(new Date(), 15).toISOString(),
    NRO_NFE: 'NFE001',
    DATA_FATURAMENTO: subDays(new Date(), 12).toISOString(),
    PRODUTO: '7891000315507',
    FORNECEDOR: 'Distribuidora de Bebidas ABC',
    VENDEDOR: 'João Silva',
    CLIENTE: '789123',
    SITUACAO: 'Faturado',
    VALOR: 850.0,
    QTDE_EMB: 100,
    EMBALAGEM: 'Unidade',
    QTDE_EMBALAGEM: 1,
    QTDE_FORMA_EMBALAGEM: 100,
    CGO: '1234',
  },
  {
    NRO_PEDIDO: 'PED1002',
    DATA_INCLUSAO: subDays(new Date(), 45).toISOString(),
    NRO_NFE: 'NFE002',
    DATA_FATURAMENTO: subDays(new Date(), 40).toISOString(),
    PRODUTO: '7891000315507',
    FORNECEDOR: 'Distribuidora de Bebidas ABC',
    VENDEDOR: 'João Silva',
    CLIENTE: '789123',
    SITUACAO: 'Faturado',
    VALOR: 425.0,
    QTDE_EMB: 50,
    EMBALAGEM: 'Unidade',
    QTDE_EMBALAGEM: 1,
    QTDE_FORMA_EMBALAGEM: 50,
    CGO: '1234',
  },
  {
    NRO_PEDIDO: 'PED1003',
    DATA_INCLUSAO: subDays(new Date(), 10).toISOString(),
    NRO_NFE: 'NFE003',
    DATA_FATURAMENTO: subDays(new Date(), 8).toISOString(),
    PRODUTO: '7891991010836',
    FORNECEDOR: 'Atacado de Snacks XYZ',
    VENDEDOR: 'Maria Oliveira',
    CLIENTE: '456789',
    SITUACAO: 'Faturado',
    VALOR: 1998.0,
    QTDE_EMB: 200,
    EMBALAGEM: 'Unidade',
    QTDE_EMBALAGEM: 1,
    QTDE_FORMA_EMBALAGEM: 200,
    CGO: '5678',
  },
  {
    NRO_PEDIDO: 'PED1004',
    DATA_INCLUSAO: subDays(new Date(), 5).toISOString(),
    NRO_NFE: 'NFE004',
    DATA_FATURAMENTO: subDays(new Date(), 2).toISOString(),
    PRODUTO: '7896065800034',
    FORNECEDOR: 'Laticínios Sul',
    VENDEDOR: 'Carlos Pereira',
    CLIENTE: '123456',
    SITUACAO: 'Faturado',
    VALOR: 1287.0,
    QTDE_EMB: 300,
    EMBALAGEM: 'Caixa',
    QTDE_EMBALAGEM: 12,
    QTDE_FORMA_EMBALAGEM: 25,
    CGO: '9101',
  },
  {
    NRO_PEDIDO: 'PED1005',
    DATA_INCLUSAO: subDays(new Date(), 25).toISOString(),
    NRO_NFE: 'NFE005',
    DATA_FATURAMENTO: subDays(new Date(), 22).toISOString(),
    PRODUTO: '7896065800034',
    FORNECEDOR: 'Laticínios Sul',
    VENDEDOR: 'Carlos Pereira',
    CLIENTE: '789123',
    SITUACAO: 'Faturado',
    VALOR: 214.5,
    QTDE_EMB: 50,
    EMBALAGEM: 'Unidade',
    QTDE_EMBALAGEM: 1,
    QTDE_FORMA_EMBALAGEM: 50,
    CGO: '9101',
  },
  {
    NRO_PEDIDO: 'PED1006',
    DATA_INCLUSAO: subDays(new Date(), 20).toISOString(),
    NRO_NFE: 'NFE006',
    DATA_FATURAMENTO: subDays(new Date(), 18).toISOString(),
    PRODUTO: '7896336006921',
    FORNECEDOR: 'Atacado de Doces ZYX',
    VENDEDOR: 'Ana Costa',
    CLIENTE: '789123',
    SITUACAO: 'Faturado',
    VALOR: 239.2,
    QTDE_EMB: 80,
    EMBALAGEM: 'Unidade',
    QTDE_EMBALAGEM: 1,
    QTDE_FORMA_EMBALAGEM: 80,
    CGO: '4321',
  },
]
