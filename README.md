# Help System

Sistema interno de perguntas e respostas para auxiliar colaboradores entre departamentos.

## Tecnologias

- **Backend:** Node.js + Express.js
- **Template Engine:** EJS
- **Banco de Dados:** MySQL
- **Autenticacao:** bcryptjs + express-session
- **Hospedagem:** Railway

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [MySQL](https://www.mysql.com/) (v8 ou superior)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/help-systems.git
cd help-systems
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o banco de dados executando o script SQL no MySQL:

```bash
mysql -u root -p < db/ScriptSQL.txt
```

Ou copie o conteúdo de `db/ScriptSQL.txt` e execute diretamente no MySQL Workbench ou terminal do MySQL.

4. Crie um arquivo `.env` na raíz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=help_system
SESSION_SECRET=uma_chave_secreta_qualquer
PORT=3000
```

## Como rodar

**Modo desenvolvimento** (reinicia automaticamente ao salvar):

```bash
npm run dev
```

**Modo produção:**

```bash
npm start
```

Acesse no navegador: `http://localhost:3000`

## Estrutura do Projeto

```
help-systems/
├── app.js                 # Arquivo principal do servidor
├── db/
│   ├── pool.js            # Conexao com o banco de dados
│   └── ScriptSQL.txt      # Script de criação do banco
├── routes/
│   ├── auth.js            # Rotas de autenticação (login/cadastro)
│   ├── home.js            # Rota da tela inicial
│   └── solicitacoes.js    # Rotas de criação de solicitações
├── views/
│   ├── login.ejs          # Pagina de login
│   ├── cadastro.ejs       # Pagina de cadastro
│   ├── home.ejs           # Tela inicial
│   ├── nova-solicitacao.ejs # Formulário de nova solicitação
│   └── partials/
│       ├── header.ejs     # Cabecalho reutilizável
│       └── footer.ejs     # Rodape reutilizável
├── public/
│   └── css/
│       └── style.css      # Estilos do sistema
├── .env                   # Variáveis de ambiente (não versionado)
└── package.json
```

## Funcionalidades Implementadas

- [x] Cadastro de usuario com validacao de e-mail e criptografia de senha
- [x] Login e logout com sessao
- [x] Tela inicial com nome/departamento do usuario e botoes de acesso
- [x] Criar solicitacoes (perguntas)
- [x] Listagem de solicitacoes na tela inicial
- [x] Deploy no Railway
- [x] Responder solicitacoes
- [ ] Filtros e ordenacao na listagem
- [ ] Gerenciamento de solicitacoes (status, duplicidade)