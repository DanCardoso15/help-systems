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
├── app.js                   # Arquivo principal do servidor
├── db/
│   ├── pool.js              # Conexao com o banco de dados
│   └── ScriptSQL.txt        # Script de criacao do banco
├── routes/
│   ├── auth.js              # Rotas de autenticacao (login/cadastro)
│   ├── home.js              # Rota da tela inicial com filtros
│   ├── solicitacoes.js      # Rotas de criacao de solicitacoes
│   └── respostas.js         # Rotas de respostas e visualizacao
├── views/
│   ├── login.ejs            # Pagina de login
│   ├── cadastro.ejs         # Pagina de cadastro
│   ├── home.ejs             # Tela inicial com listagem e filtros
│   ├── nova-solicitacao.ejs # Formulario de nova solicitacao
│   ├── respostas.ejs        # Lista de solicitacoes para responder
│   ├── responder.ejs        # Formulario de resposta
│   ├── ver-respostas.ejs    # Visualizacao de respostas
│   └── partials/
│       ├── header.ejs       # Cabecalho reutilizavel
│       └── footer.ejs       # Rodape reutilizavel
├── public/
│   ├── css/
│   │   └── style.css        # Estilos do sistema (Tailwind CSS)
│   └── media/               # Logo e assets
├── .env                     # Variaveis de ambiente (nao versionado)
└── package.json
```

## Funcionalidades Implementadas

### RF01 - Cadastro de Usuario
- [x] Formulario de cadastro e login
- [x] Validacao de formato de e-mail
- [x] Criptografia de senha (bcryptjs)
- [x] Persistencia no banco de dados
- [x] Mensagens de sucesso e erro

### RF02 - Tela Inicial
- [x] Interface com nome e departamento do usuario
- [x] Botoes de acesso (Registrar Pergunta, Registrar Resposta, Ver Respostas)
- [x] Listagem de solicitacoes

### RF03 - Criar Solicitacoes
- [x] Formulario com campos obrigatorios (departamento destino, titulo, pergunta)
- [x] Salvamento no banco de dados
- [x] Confirmacao ao usuario

### RF04 - Responder Solicitacoes
- [x] Interface para responder perguntas
- [x] Respostas vinculadas a solicitacao
- [x] Notificacao de conclusao
- [x] Pagina de visualizacao de respostas

### RF05 - Listar Solicitacoes
- [x] Tabela com listagem de solicitacoes
- [x] Filtros por departamento, destino, titulo e colaborador
- [x] Ordenacao por data de criacao (mais recentes/mais antigos)

### RF06 - Gerenciamento de Solicitacoes
- [x] Validacao de duplicidade (mesmo titulo e categoria)
- [x] Status nas solicitacoes (aberto/resolvido)
- [x] Atualizacao automatica para "resolvido" ao responder

## Deploy

O projeto esta hospedado no Railway com deploy automatico via GitHub.