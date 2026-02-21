# Deploy no Fly.io

## Pré-requisitos

1. **Criar conta no Fly.io**
   - Acesse [fly.io](https://fly.io) e crie uma conta gratuita
   - Ative a autenticação por email

2. **Instalar Fly CLI**
   - Windows: `choco install flyctl` ou baixe em [fly.io/docs/getting-started/installing-flyctl/](https://fly.io/docs/getting-started/installing-flyctl/)
   - macOS: `brew install flyctl`
   - Linux: `curl -L https://fly.io/install.sh | sh`

3. **Verificar instalação**
   ```bash
   flyctl version
   ```

## Passos para Deploy

### 1. Login no Fly.io
```bash
flyctl auth login
```
Será aberto um navegador para autenticação. Faça login com sua conta.

### 2. Criar a aplicação no Fly.io
```bash
flyctl launch
```

Durante o processo:
- **App Name**: deixe como `nulla-bot` (ou escolha outro)
- **Region**: escolha `gru` (São Paulo) ou a região mais próxima
- **Database**: responda `No` (usaremos MongoDB Atlas)
- **Existir Dockerfile?**: responda `Yes`

### 3. Configurar variáveis de ambiente
```bash
flyctl secrets set DISCORD_TOKEN="seu_token_aqui"
flyctl secrets set MONGO_URI="sua_mongo_uri_aqui"
```

Para verificar os secrets configurados:
```bash
flyctl secrets list
```

### 4. Deploy inicial
```bash
flyctl deploy
```

O Fly.io irá:
- Fazer build da imagem Docker
- Fazer push para o registro do Fly.io
- Iniciar a aplicação em 1 máquina (VM compartilhada, gratuita)

### 5. Verificar logs
```bash
flyctl logs
```

### 6. Acessar a aplicação
```bash
flyctl status
```

Mostrará a URL da aplicação e o status das instâncias.

## Comandos úteis

### Redeploy após mudanças
```bash
git push origin main
flyctl deploy
```

Ou automaticamente com GitHub Actions (opcional).

### Escalar (aumentar instâncias)
```bash
flyctl scale count 2
```

### Parar a aplicação
```bash
flyctl scale count 0
```

### Usar Free Tier
- 1 VM compartilhada gratuita (3 GB RAM, 1 CPU)
- 3 GB de armazenamento persistente
- Certificado SSL automático

> Nota: Bot em Node.js + MongoDB Atlas usa muito pouco, cabe tranquilamente no free tier!

### Adicionar PostgreSQL (opcional, se precisar de persistência local)
```bash
flyctl postgres create
```

## Monitoramento

- Dashboard: [fly.io/dashboard](https://fly.io/dashboard)
- Logs em tempo real: `flyctl logs -f`
- Métricas: visíveis no painel web

## Remover aplicação
```bash
flyctl apps destroy nulla-bot
```

## Documentação oficial
- [Fly.io Deployment Guide](https://fly.io/docs/getting-started/launch/)
- [Node.js on Fly.io](https://fly.io/docs/languages-and-frameworks/nodejs/)
