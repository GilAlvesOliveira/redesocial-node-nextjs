# Rede Social em Node.js com Next.js

Bem-vindo ao projeto **Rede Social**, uma aplicação web desenvolvida com [Next.js](https://nextjs.org/) para criar uma rede social moderna. Este repositório contém o backend e as configurações necessárias para rodar localmente ou em produção.

## Descrição

Este projeto é uma API para uma rede social que utiliza Node.js, Next.js, Firebase e outras bibliotecas para gerenciar usuários, postagens e notificações push. O objetivo é fornecer uma base escalável para um aplicativo social.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior recomendada)
- [Git](https://git-scm.com/)# Rede Social em Node.js

Bem-vindo ao projeto **Rede Social**, uma API desenvolvida com [Next.js](https://nextjs.org/) para criar uma rede social moderna. Este repositório contém o backend com suporte a usuários, postagens e notificações push via Firebase, hospedado na [Vercel](https://vercel.com/).

---

## 📌 Descrição

Este é um backend para uma rede social que utiliza Node.js, Next.js, Firebase e outras bibliotecas para gerenciar funcionalidades como curtidas e notificações. O projeto está configurado para rodar localmente e em produção.

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior recomendada)
- [Git](https://git-scm.com/)
- Um editor de código (ex.: VS Code)
- Acesso ao [Firebase Console](https://console.firebase.google.com/) para configurar credenciais
- Conta na [Vercel](https://vercel.com/) para deploy (opcional)

---

## 📦 Instalação

Siga estas etapas para configurar o projeto localmente:

1. **Clone o repositório:**

```bash
git clone https://github.com/GilAlvesOliveira/redesocial-node-nextjs
cd redesocial-node-nextjs
```

2. **Instale as dependências:**

```bash
npm install mongoose
npm install md5
npm install --save-dev @types/md5
npm install --save-dev @types/jsonwebtoken
npm install moment
npm install next-connect
npm install multer
npm install --save-dev @types/multer
npm install cosmicjs @cosmicjs/sdk
npm install next-connect@0.13.0
npm install nextjs-cors
```

3. **Configure o ambiente:**

- Renomeie o arquivo `.env.example` para `.env` e preencha com suas credenciais.
- No Firebase, crie uma conta de serviço e baixe o `service-account-key.json`. Adicione seu conteúdo como valor da variável `FIREBASE_SERVICE_ACCOUNT_KEY` no `.env`.

---

## ⚙️ Configuração Adicional

### 🔐 Criando o Arquivo de Exemplo

Crie `service-account-key.json.example` com a seguinte estrutura:

```json
{
  "type": "service_account",
  "project_id": "seu-projeto-id",
  "private_key_id": "sua-chave-privada-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk@seu-projeto-id.iam.gserviceaccount.com",
  "client_id": "seu-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk%40seu-projeto-id.iam.gserviceaccount.com"
}
```

- Substitua os valores por placeholders.
- Adicione `service-account-key.json` ao `.gitignore`.

```bash
git add service-account-key.json.example
git commit -m "Adicionando service-account-key.json.example como exemplo"
git push origin main
```

---

## 🌱 Variáveis de Ambiente

### Local

Adicione ao `.env`:

```env
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

### Produção (Vercel)

- Vá em **Vercel Dashboard** > Seu Projeto > **Settings** > **Environment Variables**
- Adicione:

```
Name: FIREBASE_SERVICE_ACCOUNT_KEY
Value: (JSON completo do service-account-key.json em uma única linha)
Environment: Production
```

---

## ▶️ Uso

Após configurar tudo:

```bash
npm run dev
```

O projeto estará disponível em: [http://localhost:3000](http://localhost:3000)  
Exemplo de endpoint: `/api/like` (teste via Postman).

---

## 🚀 Deploy (Vercel)

1. Conecte seu repositório ao [Vercel](https://vercel.com).
2. Configure as variáveis de ambiente conforme descrito.
3. Faça push:

```bash
git push origin main
```

A Vercel realizará o deploy automaticamente. Verifique em **Deployments**.

---

## 🤝 Contribuindo

1. Faça um fork.
2. Crie uma branch:

```bash
git checkout -b feature/nova-funcionalidade
```

3. Faça alterações e commit:

```bash
git commit -m "Adiciona nova funcionalidade"
git push origin feature/nova-funcionalidade
```

4. Abra um Pull Request.

---

## 🐞 Reportando Problemas

Achou um bug ou quer sugerir melhorias?  
Abra uma issue com detalhes para análise.

---

## 📬 Contato

Para dúvidas ou suporte:  
📧 **gilalves.oliveira@outlook.com**

---