-- Create the clientes table
CREATE TABLE public.clientes (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    nome text NOT NULL,
    email text UNIQUE NOT NULL,
    telefone text,
    endereco text,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for authenticated users
CREATE POLICY "Allow authenticated users to manage clients"
ON public.clientes
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
