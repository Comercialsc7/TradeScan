const webhookUrl = 'https://automacao.grupoamo.co/webhook/a4017e7f-4e4c-4148-8c5e-b16a39fd775e';

async function testCustomers() {
    console.log('🔍 Testando busca de CLIENTES...');
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'clientes',
                term: 'test'
            }),
        });

        console.log('Status:', response.status);
        console.log('Headers:', response.headers.get('content-type'));

        const rawText = await response.text();
        console.log('Resposta bruta (primeiros 500 chars):', rawText.substring(0, 500));

        if (!response.ok) {
            console.error(`❌ Erro: ${response.status} ${response.statusText}`);
            return;
        }

        try {
            const data = JSON.parse(rawText);
            console.log('✅ Clientes encontrados:', data.length);
            if (data.length > 0) {
                console.log('   Primeiro cliente:', data[0].nomerazao || data[0]);
            }
        } catch (e) {
            console.error('❌ Erro ao fazer parse do JSON:', e.message);
        }
    } catch (error) {
        console.error('❌ Erro ao buscar clientes:', error.message);
    }
}

async function testProducts() {
    console.log('\n🔍 Testando busca de PRODUTOS...');
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'produtos',
                barcode: '1234567890123'
            }),
        });

        console.log('Status:', response.status);
        console.log('Headers:', response.headers.get('content-type'));

        const rawText = await response.text();
        console.log('Resposta bruta (primeiros 500 chars):', rawText.substring(0, 500));

        if (!response.ok) {
            console.error(`❌ Erro: ${response.status} ${response.statusText}`);
            return;
        }

        try {
            const data = JSON.parse(rawText);
            console.log('✅ Produtos encontrados:', data.length);
            if (data.length > 0) {
                console.log('   Primeiro produto:', data[0].desccompleta || data[0]);
            }
        } catch (e) {
            console.error('❌ Erro ao fazer parse do JSON:', e.message);
        }
    } catch (error) {
        console.error('❌ Erro ao buscar produtos:', error.message);
    }
}

async function runTests() {
    await testCustomers();
    await testProducts();
    console.log('\n✅ Testes concluídos!');
}

runTests();
