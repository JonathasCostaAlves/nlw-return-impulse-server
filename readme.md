#  Feedbacks Server
![Demo](./screenshots/feedbacks.png)
 
 
<img src="https://img.shields.io/github/license/JonathasCostaAlves/nlw-return-impulse-web" /> <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
 
</br>
 
## Índice
 
* [Sobre](#Sobre)
* [Demonstração](#Demonstração)
* [Resultados do Projeto](#Resultado-do-projeto)
* [Rodando a aplicação](#Rodando-a-aplicação)
* [Funcionalidades](#Funcionalidades)
* [Tecnologias](#Tecnologias)
* [Sobre o Evento](#Sobre-o-Evento)
* [Autor](#Autor)
 
</br>
 
## Sobre  
 
 
 
Projeto de um componente para feedback desenvolvido com node e express com TypeScript, integração de e-mail e outras tecnologias do mesmo ecossistema, podendo ser  utilizado em aplicações para obter retorno dos seus usuários de forma prática e dinâmica.
 
Esse é o coração da aplicação onde ficam as regras de negocio e o motor que faz tudo funcionar, recebendo as solicitações do front end e adicionando os feedbacks no banco de dados, enviando por email para a equipe e retornando o sucesso na trasação dos dados.
 
Toda aplicação foi desenvolvida na NLW Return, evento realizado pela Rocketseat composto por três módulos server, mobile e web. Nesse repositório está o que foi produzido no módulo server.
 
Seguem os links para os outros repositórios.
 
 
Web : https://github.com/JonathasCostaAlves/nlw-return-impulse-web

Mobile : <https://github.com/JonathasCostaAlves/nlw-return-impulse-mobile>
 
</br></br>
 
 
 
 
## Demonstração
 
</br>
 
 
![Demo](./screenshots/screenshot.gif) 
 
 
 
 
 
 
## Resultado do projeto
</br>
 
O projeto está funcionando e servindo o front end da aplicação [LINK](https://nlw-return-impulse-web-five-lyart.vercel.app/)

O projeto apresenta uma rota única, que espera receber um tipo de feedback, um comentario e um possível screenshot caso exista e assim persiste as informações no banco de dados, nesse caso foi utilizado o  Postgres e para envio de email o [mailtrap](https://mailtrap.io/) como servidor de teste.

 
</br></br>
 
 
:construction::rocket: Ainda em construção :rocket: :construction:
 
 
## Rodando a aplicação
 
Para rodar a aplicação no seu ambiente de desenvolvimento siga os passos abaixo.
 
 
#### Clone este repositório
```bash
$ git clone https://github.com/JonathasCostaAlves/nlw-return-impulse-server.git
```
#### Acesse a pasta do projeto no terminal/cmd
```bash
$ cd nlw-return-impulse-server
```
#### Execute a instalação das dependências
```bash
$ npm install
```

#### Ajustes necessários para rodar o servidor em modo de desenvolvimento


* Adicione o arquivo .env com a variavel 
  *  DATABASE_URL="sqlite"

![.env](./screenshots/env.jpg)

</br></br>

* Mude o datasource dentro do arquivo schema.prisma
    * Conforme imagem abaixo.
  
![prisma img](./screenshots/prisma.jpg)

</br></br>

* Delete a pasta migrates e execute o comando para gerar uma nova migrate
```bash
npx prisma migrate dev
```

#### Execute a aplicação em modo de desenvolvimento
```bash
$ npm run dev
```
Vai parecer essa mensagem no terminal.
    ![server running](./screenshots/running.jpg)
 

 
Agora sim tudo pronto!
 
 
## Funcionalidades
</br>
 
- [x] Validação de informações 
 
- [x] Envio de e-mail
 
- [x] Persistência de dados no banco

- [x] Teste com jest
 
 
## Tecnologias
</br>
 
As seguintes ferramentas foram usadas na construção do projeto:
 
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [Cors](https://www.prisma.io/)

 
## Sobre o Eventos
 
Geralmente os eventos da Rocketseat são muito intensos e repletos de novos conhecimentos, esse não foi diferente, desenvolver uma aplicação simples porém com boas práticas seguindo os princípios do SOLID  e utilizando TypeScript foi uma experiência sensacional.
 
No desenvolvimento dessa API foi utilizado o express para criação da rota de feedback, o Prisma como ORM para gerar e controlar as interações com o banco de dados, mas o que foi espetacular foram as aplicações dos princípios do SOLID em especial o princípio da inversão de dependências deixando a aplicação desacoplada e sua manutenção muito mais simples e eficiente, além dos teste com o jest.
 
Em resumo, foi demais poder participar dessa Next Level Week Return valeu <a href="https://www.rocketseat.com.br/" target="_blank"> RocketSeat </a>!
 
## Autor
   
 
 
 <img src="./screenshots/img-jonathas.png" alt="img-jonathas" width="250"></img>
 
 
   Me chamo Jonathas Costa sou Analista de sistemas e fascinado por tecnologia e desenvolvimento de soluções web, sempre buscando novos desafios e conhecimentos.
 
</br></br>
 
<a href="https://www.instagram.com/jonathascostadev/" >
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white">
 
</a>
 
<a href="https://www.linkedin.com/in/jonathas-costa-86210a21a/" >
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
 
</a>
 
<a href="https://mailito:jcalves182@gmail.com/" >
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white">
 
</a>
<a href="https://github.com/JonathasCostaAlves" >
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
 
</a>
 
 
 

