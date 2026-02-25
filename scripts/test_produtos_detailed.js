const webhookUrl = 'https://automacao.grupoamo.co/webhook/a4017e7f-4e4c-4148-8c5e-b16a39fd775e';

async function testProdutos() {
    console.log('🔍 Testando PRODUTOS com type...\n');

    const payload = {
        type: 'produtos',
        barcode: '1234567890123'
    };

    console.log('📤 Enviando:', JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log('\n📥 Status:', response.status);
        console.log('📥 Headers:', response.headers.get('content-type'));

        const rawText = await response.text();
        console.log('📥 Tamanho da resposta:', rawText.length, 'bytes');
        console.log('📥 Resposta (primeiros 200 chars):', rawText.substring(0, 200));

        if (rawText.length > 0) {
            try {
                const data = JSON.parse(rawText);
                console.log('\n✅ JSON válido! Total de itens:', data.length);
            } catch (e) {
                console.error('\n❌ Resposta não é JSON válido');
            }
        } else {
            console.error('\n❌ Resposta vazia!');
        }
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

testProdutos();
