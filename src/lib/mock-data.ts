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
