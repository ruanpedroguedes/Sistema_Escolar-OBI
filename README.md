

---

# OBI - Plataforma de Gestão e Comunicação Escolar

## Descrição

A **OBI** é uma aplicação web desenvolvida para facilitar a gestão e comunicação entre alunos, professores e coordenações. A plataforma centraliza informações cruciais, proporcionando uma comunicação eficiente e um gerenciamento mais organizado das atividades escolares, melhorando a experiência de todos os envolvidos.

---

## Funcionalidades

- **Gerenciamento de Usuários**: Criação e administração de perfis para alunos, professores e coordenadores.
- **Gestão de Aulas e Atividades**: Ferramentas para agendamento, acompanhamento e gerenciamento de aulas, tarefas e outras atividades escolares.
- **Relatórios e Feedback**: Geração de relatórios detalhados e coleta de feedback para aprimorar o processo educacional.

---

## Tecnologias Utilizadas

![nodejs logo](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge)  
![mongodb logo](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)  
- **Node.js**: Back-end da aplicação, gerenciando a lógica do servidor e a comunicação com o banco de dados.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar informações dos usuários e dados da aplicação.
- **React**: Biblioteca JavaScript para criação de interfaces dinâmicas e responsivas.
- **HTML, CSS e JavaScript**: Tecnologias para estruturação e estilização da interface da aplicação.

---

## Dependências

- **express**: Framework para servidores web e APIs RESTful.
- **mongoose**: Interface para interagir com o MongoDB.
- **cors**: Para habilitar requisições de diferentes origens.
- **morgan**: Registra detalhes sobre cada requisição HTTP.
- **dotenv**: Carrega variáveis de ambiente para configuração da aplicação.

---

## Estrutura de Pastas

    server/
    ├── config            # Configurações e utilitários (Ex: conexões com o banco de dados)
    ├── controllers       # Controladores para gerenciar a lógica do servidor (Ex: login de usuário)
    ├── middleware        # Middlewares para tratamento de erros e autenticação
    ├── models            # Modelos de dados (Mongoose)
    ├── routes            # Definição das rotas da API
    ├── utils             # Funções utilitárias (Ex: validação de dados)

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js
- MongoDB
- Yarn ou npm

### Passos para Execução

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/obi-plataforma.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd obi-plataforma
    ```
3. Instale as dependências:
    ```bash
    yarn install
    # ou
    npm install
    ```
4. Inicie o servidor:
    ```bash
    yarn start
    # ou
    npm start
    ```

---

## Participantes

Grupo 5:
- **ERICK CARRASCO OLIVEIRA**
- **JAIRO MARQUES MARINHO**
- **RUAN PEDRO PEREIRA GUEDES**
- **DANDARA GOUVEIA MENEZES CALUMBY**
- **LUCAS ALEXANDRE VICENTE FERREIRA**
- **PEDRO LUCAS MARQUES DA SILVA**
- **THIAGO MONTEIRO OLIVEIRA TENORIO**

---

Essa versão agora inclui uma estrutura mais detalhada de pastas, as dependências do projeto, e informações adicionais sobre as tecnologias utilizadas. Isso torna o README mais claro e profissional, além de facilitar a configuração e execução do projeto para quem for contribuir ou utilizar a aplicação.
