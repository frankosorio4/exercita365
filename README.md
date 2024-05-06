# Exercita365

O Exercita365 é uma plataforma que facilita o gerenciamento de exercícios e locais para atividades físicas serem praticadas. Os usuários podem cadastrar novos locais de exercícios, encontrar pontos próximos em um mapa interativo (ou lista), visualizar informações sobre os exercícios em cada ponto e registrar suas próprias contribuições para o sistema. O seu perfil chamou a atenção dos gestores da plataforma, para criar o MVP (Minimum Viable Product) da aplicação Front-End do software, que deverá ser construída utilizando a biblioteca React.

## Tecnologias utilizadas
- React
  
![image](https://github.com/frankosorio4/exercita365/assets/141787907/e897ed9b-5731-4394-be1f-f9e264b03f25)

- js

![image](https://github.com/frankosorio4/exercita365/assets/141787907/31ebbf41-3abd-4ea6-b1e9-89c024305c59)

- Vite

![image](https://github.com/frankosorio4/exercita365/assets/141787907/fcd22b89-54f1-4083-bbd6-da4b4e564caf)

- Material MUI

![image](https://github.com/frankosorio4/exercita365/assets/141787907/04207da9-136c-4cf3-ad4a-ad377ca0b527)

## Como executar

- Clone o repositório.

- Abra o terminal no repositório descarregado e instale as seguintes bibliotecas:
  1. ```npm install```
  2. ```npm install react-router-dom```
  3. ```npm install react-hook-form```
  4. ```npm install -g json-server```
  5. ```npm install @mui/material @emotion/react @emotion/styled```

- Para iniciar:
  
  Iniciar os servidores *vite* e *Json-server*. Abra o repositório no VScode e no terminal dele inicie os comandos:
  1. ```npm run dev```
  2. ```json-server --watch ./data/db.json```

  Tem que executar cada comando em terminais diferentes.
     
## Melhorias

Este repositório é de uma App que tem o esquema básico de gestionar Locais para exercitar-se. Por isso tem coisas que podem ser melhoradas.
- Criar uma API que faça a conexão com um banco de dados.
- Implementar uma melhor forma de validação de dados y segurança.
- Melhorar os estilos dos componentes e das páginas, em geral.
- Implementar responsividade para telefones y tablets.
- Fazer validação dos de Latitude y Longitude no cadastro dos locais.
- Implementação do mapa para la ubicação dos locais.
- Implementação da função de editar usuário.
- Validação para que o usuário só possa editar os locais cadastrados por ele.
- Opção para o usuário colocar uma imagem do local a cadastrar.
