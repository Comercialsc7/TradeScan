-- Create the vendas table
CREATE TABLE public.vendas (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "NRO_PEDIDO" text UNIQUE NOT NULL,
    "DATA_INCLUSAO" timestamp with time zone NOT NULL DEFAULT now(),
    "NRO_NFE" text,
    "DATA_FATURAMENTO" timestamp with time zone,
    "PRODUTO" text NOT NULL,
    produto_id uuid REFERENCES public.produtos(id),
    "FORNECEDOR" text,
    "VENDEDOR" text,
    "CLIENTE" text NOT NULL,
    cliente_id uuid REFERENCES public.clientes(id),
    "SITUACAO" text,
    "VALOR" numeric(10, 2) NOT NULL,
    "QTDE_EMB" integer,
    "EMBALAGEM" text,
    "QTDE_EMBALAGEM" integer,
    "QTDE_FORMA_EMBALAGEM" integer,
    "CGO" text,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for authenticated users
CREATE POLICY "Allow authenticated users to manage sales"
ON public.vendas
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
