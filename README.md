# 🎮 NULLA Bot - Bot de Apostas e Filas para Discord

Bot profissional de apostas e filas para Discord com MongoDB, Discord.js, Express e React Dashboard.

## 📋 Features

- **Sistema de Filas**: Crie filas automáticas por canal com valores dinâmicos (R$ 0.10 → R$ 100.00)
- **Sistema de Apostas**: Converta filas em apostas e acompanhe o histórico
- **Ranking**: Acompanhe os melhores apostadores com ranking em tempo real
- **Dashboard React**: Visualize filas, apostas, ranking e histórico
- **API REST**: Express com rotas completas para gerenciar dados
- **Histórico Completo**: Log de todas as ações dos usuários

## 🚀 Quick Start (Local)

### Requisitos
- Node.js 20+
- MongoDB (local ou Atlas)
- Discord Bot Token

### 1. Clone e Configure

```bash
git clone https://github.com/Vitor0018/bot-aposta-privado.git
cd bot-aposta-privado
```

### 2. Defina variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DISCORD_TOKEN=seu_token_aqui
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
PORT=4000
VITE_API_URL=http://localhost:4000
```

### 3. Instale dependências

```bash
npm install
cd nulla && npm install
```

### 4. Inicie o projeto

**Modo desenvolvimento** (bot + API + dashboard):
```bash
npm run dev
```

**Apenas bot** (produção):
```bash
npm start
```

## 🌐 Deploy no Railway

### Pré-requisitos
- GitHub account
- Railway account (https://railway.app)
- Discord Bot Token
- MongoDB Atlas connection string

### Passo 1: Configurar no Railway

1. Acesse https://railway.app
2. Crie um novo projeto
3. Conecte com seu repositório GitHub
4. Railway detectará o `Dockerfile` automaticamente

### Passo 2: Adicionar Variáveis de Ambiente

No dashboard do Railway, vá para **Variables** e configure:

```
DISCORD_TOKEN=seu_bot_token
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
PORT=4000
```

### Passo 3: Deploy

Clique em "Deploy" ou faça push para a main branch:

```bash
git push origin main
```

Railway fará rebuild automático.

## 📝 Comandos do Bot

### Administração
- `!gerarfilas` - Gera cards de filas para o canal
- `!limpar` (alias `!limparfilas`) - Remove todas as filas do banco de dados
- `!status` - Mostra status das filas e apostas do canal
- `!editar <chave> <valor>` - Ajusta emojis ou cor das filas (`emoji_normal`, `emoji_premium`, `emoji_sair`, `color`)

### Filas (Botões)
- 🧊 Gelo Normal - Entra em fila normal
- 🧊 Gelo Infinito - Entra em fila premium
- 🟥 Sair da fila - Sai da fila

### Apostas
- `!criaraposta` - Cria aposta a partir de fila fechada
- `!apostar` - Entra em aposta aberta
- `!cancelaraposta` - Sai da aposta
- `!finalizaraposta @usuario` - Encerra aposta e define vencedor

### Informações
- `!ranking` - Top 10 jogadores
- `!historico` - Últimas 20 ações
- `!help` - Lista todos os comandos

## 🏗️ Estrutura do Projeto

```
aura0.3/
├── nulla/
│   ├── bot/
│   │   ├── commands/        # Comandos do bot
│   │   ├── events/          # Eventos (messageCreate, interactionCreate, etc)
│   │   ├── services/        # Lógica auxiliar
│   │   ├── index.js         # Entrada do bot
│   │   └── config.js        # Configurações
│   ├── api/
│   │   ├── models/          # Schemas Mongoose
│   │   ├── server.js        # Express server
│   │   └── database.js      # Conexão MongoDB
│   ├── dashboard/           # React + Vite
│   └── package.json
├── Dockerfile               # Docker config
├── railway.json            # Railway config
├── .env.example            # Template de env
└── .gitignore

```

## 📚 API REST

A API roda em `http://localhost:4000` (ou URL do Railway).

### Endpoints Disponíveis

**Filas:**
- `GET /filas` - Lista todas as filas
- `POST /filas` - Cria fila
- `PUT /filas/:id` - Atualiza fila
- `DELETE /filas/:id` - Deleta fila

**Apostas:**
- `GET /apostas` - Lista apostas
- `POST /apostas` - Cria aposta
- `PUT /apostas/:id` - Atualiza aposta
- `DELETE /apostas/:id` - Deleta aposta

**Usuários:**
- `GET /usuarios` - Lista usuários
- `POST /usuarios` - Cria usuário
- `PUT /usuarios/:id` - Atualiza usuário

**Histórico:**
- `GET /historico` - Lista histórico
- `POST /historico` - Cria entry
- `DELETE /historico/:id` - Deleta entry

**Admin:**
- `POST /reset` - Limpa TODA base de dados (usar com cuidado!)

## 🎨 Dashboard React

O dashboard está em `http://localhost:3000` (dev) e exibe:
- Filas ativas
- Apostas em andamento
- Ranking dos jogadores
- Histórico de ações

## 🔧 Troubleshooting

### Bot não conecta no Discord
```
❌ DISCORD_TOKEN não configurada
```
**Solução:** Gere um novo token em https://discord.com/developers/applications

### MongoDB não conecta
```
❌ MONGO_URI não configurada
```
**Solução:** Crie um cluster em https://www.mongodb.com/cloud/atlas

### Bot crasha ao digitar comando
Verifique os logs com:
```bash
npm run dev
# Veja se há erros de conexão MongoDB
```

## 📄 Licença

ISC

## 👤 Autor

Pedro Medeiros

---

**Precisa de suporte?** Abra uma issue no GitHub!
