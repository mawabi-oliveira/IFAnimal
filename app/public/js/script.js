// A variável imagens fica vazia inicialmente
let imagens = [];
let indexAtual = 1;
let pontos = [];

// Função que o home.js chamará para iniciar tudo
window.inicializarCarrossel = function(fotosDoBanco) {
    imagens = fotosDoBanco;
    const container = document.querySelector('.carrossel-fotos');
    const indicadoresContainer = document.querySelector('.indicadores');
    
    // 1. Limpa o container e zera a lista de pontos
    indicadoresContainer.innerHTML = '';
    pontos = []; 
    
    // 2. Cria os indicadores dinamicamente baseados no tamanho real do array
    imagens.forEach((_, i) => {
        const span = document.createElement('span');
        span.classList.add('ponto');
        indicadoresContainer.appendChild(span);
    });

    // 3. ATUALIZAÇÃO CRÍTICA: Captura os pontos NOVOS logo após a criação
    pontos = document.querySelectorAll('.ponto');
    
    // Inicia a navegação
    document.querySelectorAll('.seta-carrossel')[0].onclick = retrocederCarrossel;
    document.querySelectorAll('.seta-carrossel')[1].onclick = avancarCarrossel;
    
    // Garante que o indexAtual não exceda o limite se o banco mudar
    if (indexAtual >= imagens.length) indexAtual = 0;
    
    atualizarCarrossel();
    setInterval(avancarCarrossel, 5000);
};

function atualizarCarrossel() {
    const imgsDOM = document.querySelectorAll('.carrossel-fotos img');
    if (imgsDOM.length === 0) return;

    let len = imagens.length;
    let idxEsq = (indexAtual - 1 + len) % len;
    let idxDir = (indexAtual + 1) % len;

    imgsDOM.forEach((img, i) => {
        img.style.display = 'none';
        img.classList.remove('foto-principal', 'foto-secundaria');
    });

    imgsDOM[idxEsq].className = 'foto-secundaria';
    imgsDOM[idxEsq].style.display = 'block';

    imgsDOM[indexAtual].className = 'foto-principal';
    imgsDOM[indexAtual].style.display = 'block';

    imgsDOM[idxDir].className = 'foto-secundaria';
    imgsDOM[idxDir].style.display = 'block';

    pontos.forEach((ponto, i) => {
        ponto.classList.toggle('ativo', i === indexAtual);
    });
}

function avancarCarrossel() {
    indexAtual = (indexAtual + 1) % imagens.length;
    atualizarCarrossel();
}

function retrocederCarrossel() {
    indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
    atualizarCarrossel();
}