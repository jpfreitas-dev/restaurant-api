# Restaurant API 🍽️

API REST em TypeScript para gerenciar produtos, mesas, sessões de mesa e pedidos de um restaurante. Usando Express e Knex (SQLite) para controlar o fluxo de um restaurante: CRUD de produtos, listagem de mesas, abertura e fechamento de sessões, criação e consulta de pedidos.

## Como funciona (Fluxo da aplicação)
### Cliente: 
- Um cliente (frontend, Insomnia, curl) faz requisições HTTP para a API. Neste projeto foi utilizado o Indomnia para testar os endpoints (arquivo `requests_insomnia.yaml`).

### Tabela de produtos (products): 
- **INDEX**: O usuário pode listar os produtos via `GET /products`
- **CREATE**: O usuário pode criar um produto via `POST /products` (Enviando nome e preço)
- **UPDATE**: O usuário pode atualizar o nome e o preço de um produto via `PUT /products/:id`
- **DELETE**: O usuário pode deletar um produto via `DELETE /products/:id`

### Tabela de mesas (tables) 
- **INDEX**: O usuário listar as mesas via `GET /tables`


### Tabela de sessões de mesa (tables-sessions):
- **OPEN**: O usuário pode abrir uma sessão de mesa via `POST /tables-sessions` (Enviando o ID da mesa)
- **INDEX**: O usuário pode listar as sessões de mesa via `GET /tables-sessions`
- **CLOSE**: O usuário pode fechar uma sessão de mesa via `PATCH /tables-sessions/:id/close`

### Tabela de pedidos (orders):
- **CREATE**: O usuário pode criar um pedido via `POST /orders` (Enviando o ID da sessão de mesa, o ID do produto e a quantidade)
- **INDEX BY TABLE SESSION**: O usuário pode listar os pedidos de uma sessão de mesa via `GET /orders/table-session/:table_session_id`
- **SHOW BY TABLE SESSION**: O usuário pode consultar o total gasto em uma sessão de mesa via `GET /orders/table-session/:table_session_id/total`

- **Pedidos**: com a sessão aberta, o app cria pedidos vinculados à sessão (`POST /orders`) e atualiza/consulta seu status (`GET /orders`).
- **Persistência**: os dados são persistidos em SQLite via Knex (`src/database/restaurant.db`) e as mudanças estruturais são aplicadas por migrations.

### 💻 Tecnologias utilizadas
- **Node.js** 
- **TypeScript** 
- **Express**
- **Knex** (SQLite)
- **Zod** (validação)
- **Insomnia** (requisições de teste)

## 📁 Estrutura de pastas / Organização

- [src](src): código-fonte principal
  - [src/controllers](src/controllers): controladores das rotas
  - [src/database](src/database): configuração do Knex, migrations e seeds
    - [src/database/migrations](src/database/migrations): migrations do banco
    - [src/database/seeds](src/database/seeds): seeds iniciais
    - [src/database/types](src/database/types): tipos TypeScript para as tabelas
    - [src/database/knex.ts](src/database/knex.ts#L1): instância do Knex
    - [src/database/restaurant.db](src/database/restaurant.db): arquivo SQLite gerado após rodar as migrations
  - [src/routes](src/routes): definição de rotas
  - [src/middlewares/error-handling.ts](src/middlewares/error-handling.ts#L1): tratamento de erros
  - [src/utils/app-error.ts](src/utils/app-error.ts#L1): utilitário de erros
  - [src/server.ts](src/server.ts#L1): ponto de entrada do servidor
- Arquivos na raiz:
  - [package.json](package.json#L1)
  - [knexfile.ts](knexfile.ts#L1) arquivo de configuração do Knex para SQLite
  - [requests_insomnia.yaml](requests_insomnia.yaml) conjunto de requisições para importar no Insomnia
  - [tsconfig.json](tsconfig.json#L1) configuração do TypeScript

## Como rodar (desenvolvimento)

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar em modo dev (o projeto usa `tsx` para executar TypeScript diretamente)
```bash
npm run dev
```

### 3. Executar migrations (gera o arquivo SQLite em `src/database/restaurant.db`)

```bash
npm run knex -- migrate:latest
```

### 4. Rodar seeds (opcional — insere dados iniciais)

```bash
npm run knex -- seed:run 
```

Observação: o `knexfile.ts` já está configurado para usar SQLite com o arquivo `./src/database/restaurant.db`, por isso pode ser omitido nos scripts.

### 5. Testar os endpoints

Substitua a URL/porta conforme sua configuração (padrão no projeto: `src/server.ts`).

**Testes**
- Este repositório não contém um suíte de testes automatizados. Para testar manualmente, importe o conjunto de requisições no Insomnia usando o arquivo [requests_insomnia.yaml](requests_insomnia.yaml) (raiz do projeto) e execute os endpoints após aplicar migrations e seeds.



