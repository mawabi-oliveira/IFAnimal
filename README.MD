IFAnimal 🐾

O IFAnimal é uma plataforma para um projeto social dedicado à proteção, cuidado e adoção de gatinhos do IFAL (Instituto Federal, campus Maceió) em Maceió - AL. O sistema conecta animais resgatados a novos lares e divulga as ações e métricas do projeto.

🚀 Tecnologias

    Front-end: HTML5, CSS3, JavaScript (Vanilla) e SweetAlert2 (Alertas visuais).

    Back-end: Node.js com Express.js (Arquitetura MVC).

    Banco de Dados: SQLite3 (Armazenamento local em arquivos .db).

    Segurança e Sessão: bcrypt (Criptografia de senhas), express-session e connect-sqlite3 (Sessões persistentes).

    Ferramentas Extras: multer (Upload de imagens) e nodemailer (Envio de e-mails para pedidos de adoção).

📂 Estrutura do Projeto

    ├── .env                 # Variáveis de ambiente (Credenciais de e-mail e sessão)
    ├── server.js            # Inicialização do servidor Node.js e middlewares
    ├── controllers/
    │   └── apiController.js # Lógica de negócio, envio de e-mails e comunicação com o banco
    ├── db/
    │   └── database.js      # Configuração e inicialização automática do banco SQLite
    ├── routes/
    │   └── api.js           # Mapeamento das rotas da API (Públicas e Admin)
    ├── public/              # Arquivos estáticos do sistema
    │   ├── css/             # Folhas de estilo modulares (home, adotar, sobre, admin)
    │   ├── img/             # Imagens estáticas (logos, ícones, equipe, gatos iniciais)
    │   └── js/              # Scripts de interação do front-end separados por página
    ├── uploads/             # Diretório onde as fotos cadastradas pelo admin são salvas
    └── views/               # Telas do sistema
        ├── admin.html       # Painel restrito para gestão de gatos e aprovação de adoções
        ├── adotar.html      # Galeria pública com paginação
        ├── form-adocao.html # Formulário de contato para adoção
        ├── home.html        # Página inicial com carrossel dinâmico
        └── sobre.html       # Histórico, métricas e formas de ajuda

⚙️ Principais Funcionalidades

    Painel Administrativo: Acesso restrito com login e senha criptografada (admin / 123 por padrão).

    Gestão de Gatos: Cadastro (com upload de fotos), edição de dados e listagem.

    Sistema de Adoção: Os usuários preenchem o formulário na plataforma, e o sistema envia um e-mail automático para o administrador.

    Paginação: A galeria pública carrega os animais de 10 em 10, garantindo performance.

    Limpeza Automática: Quando uma adoção é concluída no painel, a foto do gato é apagada fisicamente do servidor para poupar espaço.

🛠️ Como rodar o projeto localmente

    Clone o repositório e acesse a pasta do projeto.

    Instale as dependências:
    Bash

    npm install

    Crie um arquivo .env na raiz do projeto com as suas configurações:
    Snippet de código

    SESSION_SECRET=chave_super_secreta
    EMAIL_USER=seu-email@gmail.com
    EMAIL_PASS=sua-senha-de-app-do-gmail
    ADMIN_EMAIL=email-que-vai-receber-os-pedidos@gmail.com

    Inicie o servidor:
    Bash

    cd/ifanimal/app

    node server.js ou npx nodemon server.js

    Acesse no navegador: http://localhost:3000