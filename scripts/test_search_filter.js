const webhookUrl = 'https://automacao.grupoamo.co/webhook/a4017e7f-4e4c-4148-8c5e-b16a39fd775e';

async function testSearch() {
    console.log('🔍 Testando busca com termo específico: "João"');
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'clientes',
                term: 'João'
            }),
        });

        const data = await response.json();
        console.log(`✅ Total de clientes retornados: ${data.length}`);

        if (data.length > 0) {
            console.log('\nPrimeiros 5 clientes:');
            data.slice(0, 5).forEach((c, i) => {
                console.log(`  ${i + 1}. ${c.nomerazao} (${c.cnpj})`);
            });
        }

        // Verificar se realmente filtrou
        const hasJoao = data.some(c =>
            c.nomerazao?.toLowerCase().includes('joão') ||
            c.apelido?.toLowerCase().includes('joão')
        );

        if (!hasJoao && data.length > 100) {
            console.warn('⚠️  PROBLEMA: Retornou muitos clientes mas nenhum com "João"');
            console.warn('⚠️  Isso indica que o N8N está IGNORANDO o campo "term" na busca');
        }

    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

testSearch();
