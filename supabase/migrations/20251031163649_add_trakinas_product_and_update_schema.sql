-- Add missing columns to the produtos table to align with application requirements.
-- The frontend components rely on 'brand', 'base_cost', and 'descricao' for displaying product details.
ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS brand TEXT;
ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS base_cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00;
ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS descricao TEXT;

-- Insert the new product for EAN 7896336006921 if it does not already exist.
-- This ensures the product is available for lookup via scanning or manual entry.
INSERT INTO public.produtos (ean, sku, nome, descricao, brand, base_cost)
VALUES (
    '7896336006921',
    'TRAK-CHOC-126',
    'Biscoito Trakinas Chocolate 126g',
    'Um parágrafo curto e de preenchimento sobre as características, benefícios e categoria do produto, fornecendo informações essenciais ao usuário rapidamente.',
    'Trakinas',
    1.80
)
ON CONFLICT (ean) DO NOTHING;

-- Update existing sales records to link to the correct produto_id.
-- This ensures that any past or pending sales with the specified EAN are correctly associated with the product record.
DO $$
DECLARE
    trakinas_product_id UUID;
BEGIN
    -- Retrieve the id of the newly inserted or already existing product.
    SELECT id INTO trakinas_product_id FROM public.produtos WHERE ean = '7896336006921';

    -- If the product ID was found, update any sales records that have the matching EAN but are missing the foreign key reference.
    IF trakinas_product_id IS NOT NULL THEN
        UPDATE public.vendas
        SET produto_id = trakinas_product_id
        WHERE "PRODUTO" = '7896336006921' AND produto_id IS NULL;
    END IF;
END $$;
