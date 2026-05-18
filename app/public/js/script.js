// ==========================================
// 1. LÓGICA DO CARROSSEL (Dinâmico para Banco de Dados)
// ==========================================
// Futuramente, esses dados virão do backend (Prisma)
const imagens = [
    './img/gatos/cat-1.jpeg',
    './img/gatos/cat-2.jpeg',
    './img/gatos/cat-3.jpeg',   
    './img/gatos/cat-4.jpeg',
    './img/gatos/cat-5.jpeg',
    './img/gatos/cat-6.jpeg',
    './img/gatos/cat-7.jpeg',
    './img/gatos/cat-8.jpeg'
];

let indexAtual = 1;
const imgsDOM = document.querySelectorAll('.carrossel-fotos img');
const btnEsq = document.querySelectorAll('.seta-carrossel')[0];
const btnDir = document.querySelectorAll('.seta-carrossel')[1];
const indicadoresContainer = document.querySelector('.indicadores');

let pontos = []; // Vai guardar as bolinhas dinâmicas

function inicializarIndicadores() {
    indicadoresContainer.innerHTML = ''; // Limpa a div
    
    // Cria uma bolinha para cada imagem no banco
    imagens.forEach((_, i) => {
        const span = document.createElement('span');
        span.classList.add('ponto');
        if (i === indexAtual) span.classList.add('ativo');
        indicadoresContainer.appendChild(span);
    });
    
    // Atualiza a lista de pontos
    pontos = document.querySelectorAll('.ponto');
}

function atualizarCarrossel() {
    let idxEsq = (indexAtual - 1 + imagens.length) % imagens.length;
    let idxDir = (indexAtual + 1) % imagens.length;

    imgsDOM[0].src = imagens[idxEsq];
    imgsDOM[1].src = imagens[indexAtual];
    imgsDOM[2].src = imagens[idxDir];

    pontos.forEach((ponto, i) => {
        ponto.classList.remove('ativo');
        if (i === indexAtual) ponto.classList.add('ativo');
    });
}

function avancarCarrossel() {
    indexAtual = (indexAtual + 1) % imagens.length;
    atualizarCarrossel();
}

// Inicializa as bolinhas antes de começar
inicializarIndicadores();

// Botões manuais
btnDir.addEventListener('click', avancarCarrossel);
btnEsq.addEventListener('click', () => {
    indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
    atualizarCarrossel();
});

// Passar sozinho a cada 5 segundos
setInterval(avancarCarrossel, 5000);


// ==========================================
// 2. LÓGICA DOS CARDS (Gatinhos Aleatórios)
// ==========================================
// Futuramente: const bancoDeGatos = await fetch('/api/gatos').then(res => res.json());
const bancoDeGatos = [
    { nome: 'Ameixa', idade: '2 anos', origem: 'IFAnimal', img: './img/gatos/cat-1.jpeg' },
    { nome: 'Safira', idade: '3 anos', origem: 'IFAnimal', img: './img/gatos/cat-2.jpeg' },
    { nome: 'Roberto', idade: '2 anos', origem: 'Comunidade', img: './img/gatos/cat-3.jpeg' },
    { nome: 'Frajola', idade: '1 ano', origem: 'IFAnimal', img: './img/gatos/cat-4.jpeg' }, 
    { nome: 'Mia', idade: '5 meses', origem: 'Comunidade', img: './img/gatos/cat-5.jpeg' },
    { nome: 'Simba', idade: '4 anos', origem: 'IFAnimal', img: './img/gatos/cat-6.jpeg' }
];
