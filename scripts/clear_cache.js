// Script para limpar cache e testar novamente
console.log('🧹 Limpando cache do navegador...');

// Limpa o sessionStorage
sessionStorage.removeItem('tradescan_customers_cache');

console.log('✅ Cache limpo!');
console.log('');
console.log('Agora faça o seguinte:');
console.log('1. Recarregue a página (F5)');
console.log('2. Abra o Console do navegador (F12 → Console)');
console.log('3. Veja se aparece algum erro');
