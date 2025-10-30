-- Create the produtos table
CREATE TABLE public.produtos (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    nome text NOT NULL,
    descricao text,
    sku text UNIQUE NOT NULL,
    ean text UNIQUE NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for authenticated users
CREATE POLICY "Allow authenticated users to manage products"
ON public.produtos
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
