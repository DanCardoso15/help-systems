# Help System

Sistema interno de perguntas e respostas para auxiliar colaboradores entre departamentos.

## Tecnologias

- **Backend:** Node.js + Express.js
- **Template Engine:** EJS
- **Banco de Dados:** MySQL
- **Autenticacao:** bcrypt + express-session

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
DB_NAME=HelpSystem
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
│   ├── pool.js            # Conexão com o banco de dados
│   └── ScriptSQL.txt      # Script de criação do banco
├── routes/
│   └── auth.js            # Rotas de autenticação (login/cadastro)
├── views/
│   ├── login.ejs          # Página de login
│   ├── cadastro.ejs       # Página de cadastro
│   └── partials/
│       ├── header.ejs     # Cabeçalho reutilizável
│       └── footer.ejs     # Rodapé reutilizável
├── public/
│   └── css/
│       └── style.css      # Estilos do sistema
├── .env                   # Variáveis de ambiente (não versionado)
└── package.json
```

## Funcionalidades Implementadas

- [x] Cadastro de usuario com validacao de e-mail e criptografia de senha
- [x] Login e logout com sessao
- [ ] Tela inicial
- [ ] Criar solicitacoes
- [ ] Responder solicitacoes
- [ ] Listar solicitacoes
- [ ] Gerenciamento de solicitacoes
