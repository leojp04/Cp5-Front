# Access Control CP

Aplicacao React + Vite para o checkpoint de Front-end, com fluxo de autenticacao simples sobre um json-server local.

## Requisitos
- Node.js 18 ou superior
- npm (ou outro gerenciador compat�vel)

## Configuracao
1. Copie o arquivo `.env.example` para `.env` e ajuste `VITE_API_URL` se necessario.
2. Instale as dependencias com `npm install`.
3. Em um terminal, inicie o json-server: `npm run server` (usa `db.json` e porta 3001 por padrao).
4. Em outro terminal, suba o front-end com `npm run dev`.
5. Acesse `http://localhost:5173` no navegador.

## Scripts Disponiveis
- `npm run dev` � inicia o Vite em modo desenvolvimento.
- `npm run build` � gera o build de producao.
- `npm run preview` � serve o build gerado para validacao rapida.
- `npm run lint` � roda a verificacao do ESLint.
- `npm run server` � inicia o json-server usando o arquivo `db.json`.

## Autenticacao
- Login solicita nome de usuario e email, validando contra o endpoint `/usuarios` do json-server.
- A opcao "Lembrar de mim" guarda a sessao no `localStorage`; sem ela, a sessao permanece apenas no `sessionStorage`.
- A rota `/logout` limpa a sessao e redireciona automaticamente para `/login`.

## Equipe
Fabrício Henrique Pereira — RM 563237
Leonardo José Pereira — RM 563065
Pedro Henrique de Oliveira — RM 562312
