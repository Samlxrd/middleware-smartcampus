# SmartCampus - Middleware
Este é o middleware do projeto de sistema responsável pelo gerenciamento de ar-condicionado em salas de aula, desenvolvido como TCC em Ciência da Computação na Universidade Estadual de Santa Cruz, 2024.2.
Sua principal função é receber dados dos sensores (como presença e temperatura), armazená-los e processá-los para ações automáticas, como o desligamento de ar-condicionado em salas desocupadas.

## 🚀 Funcionalidades
- Receber dados de sensores IoT (presença, temperatura, etc.).
- Registrar as leituras dos sensores no banco de dados.
- Enviar comandos aos dispositivos (como o desligamento de ar-condicionado).
- Garantir comunicação segura com os sensores utilizando HMAC e timestamp.

## 📋 Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (Foi utilizado Node v20.15.0)
- PostgreSQL
- npm ou yarn

## 🛠️ Tecnologias Utilizadas
- Framework: Fastify
- Linguagem: Typscript
- Validação: Zod
- Banco de Dados: PostgreSQL
- ORM: Prisma

## 📂 Estrutura do Projeto
<pre>
src/  
├── database/             # Instância do banco de dados  
├── errors/               # Tratamento e personalização de erros  
├── leitura-sensor/       # Módulo de gerenciamento das leituras do sensor
├── middlewares/          # Middlewares para as requisições
├── sensor/               # Módulo gerenciamento dos sensores
├── status-sala/          # Módulo de gerenciamento dos status da sala
├── utils/                # Funções utilitárias (ex.: validação)  
└── server.ts             # Arquivo principal do servidor 
</pre>

## ⚙️ Configuração

1. Clone o repositório:
```
git clone https://github.com/Samlxrd/middleware-smartcampus
```
```
cd middleware-smartcampus
```

2. Instale as dependências:
```
npm install 
```
ou
```
yarn install 
```

3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto de acordo com o exemplo abaixo:
```
DATABASE_URL=<URL do Banco de Dados>
REQUEST_SECRET_KEY=<Chave Secreta Compartilhada>
```
PS: A variável *REQUEST_SECRET_KEY* deve ser a mesma no middleware e no sensor pois é a chave compartilhada entre ambos, responsável por gerar o hash para validar o sistema de comunicação Sensor-Middleware.

4. Migrações:
```
npx prisma migrate dev
```

5. Inicie o servidor:
```
npm run dev
```
PS: Lembre-se de verificar a porta que o servidor irá rodar, para evitar conflito com aplicações existentes em sua máquina.
