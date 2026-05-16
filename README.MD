# IFAnimal 🐾

O **IFAnimal** é uma plataforma para um projeto social dedicado à proteção, cuidado e adoção de gatinhos do IFAL (Instituto Federal, campus Maceió)em Maceió - AL. O sistema conecta animais resgatados a novos lares e divulga as ações e métricas do projeto.

## 🚀 Tecnologias

* **Front-end:** HTML5, CSS3 (Flexbox e CSS Grid) e JavaScript (ES6+).
* **Back-end:** Node.js.
* **Banco de Dados:** Prisma ORM (Pronto para integração).

## 📂 Estrutura do Projeto

```text
├── backend/
│   └── src/
│       ├── controllers/   # Regras de negócio e rotas da API
│       ├── repositories/  # Comunicação direta com o Prisma (Banco de dados)
│       ├── services/      # Validações e lógica intermediária
│       └── server.js      # Inicialização do servidor Node.js
├── frontend/
│   ├── css/
│   │   ├── adotar.css     # Grade dinâmica e filtros da página de adoção
│   │   ├── home.css       # Estilização base, navbar, footer e cards
│   │   └── sobre.css      # Estilização do painel de impactos e valores
│   ├── img/
│   │   ├── gatos/         # Fotos dos felinos cadastrados
│   │   ├── inseridos/     # Logotipos, patinhas e ícones gerais
│   │   └── pessoas/       # Fotos da equipe organizadora
│   ├── js/
│   │   ├── script.js      # Controle do carrossel e rotação dos cards da Home
│   │   └── sobre.js       # Interações e avisos da página Sobre Nós
│   ├── adotar.html        # Galeria de animais com filtros por origem
│   ├── home.html          # Página inicial com destaques e carrossel
│   └── sobre.html         # Histórico da equipe, impactos e botões de apoio
└── README.md              # Documentação do projeto