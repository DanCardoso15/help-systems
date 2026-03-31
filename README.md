# Help System

Sistema interno de perguntas e respostas para auxiliar colaboradores entre departamentos.

## Tecnologias

- **Backend:** Node.js + Express.js
- **Template Engine:** EJS
- **Banco de Dados:** MySQL
- **Autenticacao:** bcryptjs + express-session
- **Hospedagem:** Railway

## Pre-requisitos

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [MySQL](https://www.mysql.com/) (v8 ou superior)

## Instalacao

1. Clone o repositorio:

```bash
git clone https://github.com/seu-usuario/help-systems.git
cd help-systems
```

2. Instale as dependencias:

```bash
npm install
```

3. Crie o banco de dados executando o script SQL no MySQL:

```bash
mysql -u root -p < db/ScriptSQL.txt
```

Ou copie o conteudo de `db/ScriptSQL.txt` e execute diretamente no MySQL Workbench ou terminal do MySQL.

4. Crie um arquivo `.env` na raiz do projeto com as seguintes variaveis:

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

**Modo producao:**

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
│   └── ScriptSQL.txt      # Script de criacao do banco
├── routes/
│   ├── auth.js            # Rotas de autenticacao (login/cadastro)
│   ├── home.js            # Rota da tela inicial
│   └── solicitacoes.js    # Rotas de criacao de solicitacoes
├── views/
│   ├── login.ejs          # Pagina de login
│   ├── cadastro.ejs       # Pagina de cadastro
│   ├── home.ejs           # Tela inicial
│   ├── nova-solicitacao.ejs # Formulario de nova solicitacao
│   └── partials/
│       ├── header.ejs     # Cabecalho reutilizavel
│       └── footer.ejs     # Rodape reutilizavel
├── public/
│   └── css/
│       └── style.css      # Estilos do sistema
├── .env                   # Variaveis de ambiente (nao versionado)
└── package.json
```

## Funcionalidades Implementadas

- [x] Cadastro de usuario com validacao de e-mail e criptografia de senha
- [x] Login e logout com sessao
- [x] Tela inicial com nome/departamento do usuario e botoes de acesso
- [x] Criar solicitacoes (perguntas)
- [x] Listagem de solicitacoes na tela inicial
- [x] Deploy no Railway
- [ ] Responder solicitacoes
- [ ] Filtros e ordenacao na listagem
- [ ] Gerenciamento de solicitacoes (status, duplicidade)
