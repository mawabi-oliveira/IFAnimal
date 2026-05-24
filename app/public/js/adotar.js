let paginaAtual = 1;
const limite = 10;

document.addEventListener('DOMContentLoaded', () => {
    carregarGatos();
});

async function carregarGatos() {
    const res = await fetch(`/api/gatos?page=${paginaAtual}&limit=${limite}`);
    const data = await res.json();
    const galeria = document.getElementById('galeria-gatos');
    galeria.innerHTML = data.gatos.map(gato => `
        <div class="card">
            <img src="${gato.foto}" alt="${gato.nome}">
            <div class="card-info">
                <h3>${gato.nome}</h3>
                <span class="idade">${gato.idade}</span>
            </div>
            <a href="/views/form-adocao.html?id=${gato.id}&nome=${gato.nome}" class="adotar-btn">QUERO ADOTAR</a>
        </div>
    `).join('');

    document.getElementById('pagina-atual').innerText = `Página ${data.page} de ${data.totalPages || 1}`;
    document.getElementById('btn-anterior').disabled = data.page === 1;
    document.getElementById('btn-proximo').disabled = data.page >= data.totalPages;
}

function mudarPagina(direcao) {
    paginaAtual += direcao;
    carregarGatos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}