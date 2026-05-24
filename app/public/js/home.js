document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/gatos?page=1&limit=50');
        const data = await res.json();
        const gatos = data.gatos;

        if (gatos && gatos.length > 0) {
            // 1. Renderiza o carrossel no HTML
            const containerCarrossel = document.getElementById('carrossel-fotos');
            containerCarrossel.innerHTML = gatos.map(g => `<img src="${g.foto}" alt="${g.nome}">`).join('');
            
            // 2. Avisa o script.js para iniciar
            window.inicializarCarrossel(gatos.map(g => g.foto));
            
            // 3. Renderiza os destaques
            const containerDestaques = document.getElementById('galeria-destaques');
            containerDestaques.innerHTML = gatos.slice(0, 3).map(g => `
                <div class="card">
                    <img src="${g.foto}" alt="${g.nome}">
                    <div class="card-info">
                        <div class="nome-idade">
                            <h3>${g.nome}</h3>
                            <span class="idade">${g.idade}</span>
                        </div>
                        <span class="origem">${g.origem}</span>
                    </div>
                    <a href="/views/form-adocao.html?id=${g.id}&nome=${g.nome}" class="adotar-btn">QUERO ADOTAR</a>
                </div>
            `).join('');
        }
    } catch (err) {
        console.error("Erro ao carregar banco:", err);
    }
});