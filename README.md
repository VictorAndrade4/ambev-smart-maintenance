# Bem vindo ao Smart Maintenance!

Olá, nós da Cervejaria Sete Lagoas temos o prazer em compartilhar o projeto de book de CIL online, conhecido como projeto Smart Maintenance

# Procedendo a instalação

Primeiro passo para a utilização do Smart Maintenance é a criação e configuração do banco de dados MongoDB. Para tal, pode seguir este rápido tutorial.
https://medium.com/reprogramabr/conectando-no-banco-de-dados-cloud-mongodb-atlas-bca63399693f#:~:text=Primeiro%20passo%20%C3%A9%20criar%20uma,%2C%20pois%20demora%20para%20carregar..

- Além disso certifique-se de ter instalado o git bash ou semelhante.

## Instalando o backend
	
 - Certifique-se de instalar o node na versão 10 ou superior. https://nodejs.org/pt-br/download/
 - Clone o repositório https://github.com/ambev7labs/SmartMaintenence-Backend (Backend da aplicação).
- Abra o git bash e execute o comando *yarn install*
- Aguarde finalizar a instalação


### Linkando o banco de dados ao backend.

- Após instalado o backend, abra a estrutura em SmartMaintenence-Backend\src\database\index.js	
- Insira o link de acesso para acesso ao seu banco de dados MongoDB

### Subindo o código para a nuvem com Heroku

Para subir o código para um servidor em nuvem, basta seguir o tutorial a seguir:
 - https://medium.com/code-prestige/deployando-seu-projeto-em-node-js-no-heroku-b49a6ae7dbc3
 Lembre-se que o framework utilizado por nós é o Node.js
 
 ## Instalando o Front-end
- Acesse o projeto https://github.com/ambev7labs/SmartMaintenence-FrontEnd
- clone o repositório https://github.com/ambev7labs/SmartMaintenence-FrontEnd
- Abra o git bash e execute o comando *yarn install*
- Aguarde finalizar a instalação
### Linkando o Front-end ao backend
- Após instalado o frontend, abra a estrutura em SmartMaintenence-FrontEnd\src\components\App.tsx	
- Na linha `axios.defaults.baseURL` insira a url da aplicação criada no Heroku ou outro servidor
### Subindo o projeto para nuvem com Vercel
Para subir o código para um servidor em nuvem, basta seguir o tutorial a seguir:
 - https://medium.com/@lgoesmontes/como-fazer-o-deploy-do-meu-site-em-3-passos-com-o-vercel-f3619cab4d0b
 Lembre-se que o framework utilizado na nossa aplicação é React.

Enjoy!
