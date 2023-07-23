# Projeto SATIE

Este projeto foi desenvolvido com a tecnologia ReactJS.

## Front-end

O código fonte do front-end pode ser encontrado no repositório do GitHub: https://github.com/HenriqueRL55/Frontend_Prae

## Back-end

O código fonte do back-end pode ser encontrado no repositório do GitHub: https://github.com/vfdutra/prae-backend

A API SATIE (PRAE) foi criada usando AdonisJS 5 com TypeScript e usa PostgreSQL como seu banco de dados.

### Começando

Para iniciar a API a partir do repositório do GitHub, clone-o para o diretório de sua preferência. Em seguida, execute o comando `npm install` para instalar as dependências do projeto. Depois disso, execute o comando `node ace serve --watch` para iniciar um servidor local na porta de sua preferência (o padrão é 3333). http://localhost:3333/.

### Configurando o Banco de Dados

No repositório, há um arquivo chamado `.env-example` que contém alguns parâmetros pré-preenchidos e outros que precisam ser preenchidos. Copie este arquivo e cole-o em um novo arquivo chamado `.env`. Em seguida, preencha os valores necessários para o seu banco de dados. Por padrão, o módulo usado é `pg` para PostgreSQL. Se você quiser usar um tipo diferente de servidor, precisará executar o comando `node ace configure @adonisjs/lucid` e selecionar a opção `mysql`.

### Usando a API

Depois de completar todos esses requisitos, você poderá usar a API. Há um arquivo anexado chamado `Insomnia.json` que pode ser importado para o software Insomnia para testar APIs. Este arquivo contém todas as rotas fornecidas pela API, juntamente com alguns parâmetros para teste.

### Criando um Usuário Administrador

É possível criar um usuário administrador por meio da API, uma opção que não está disponível na camada do Front-End do projeto. Isso pode ser feito diretamente pela chamada da rota, utilizando `type = 1`, ou criando o usuário pelo Front-End e modificando manualmente o tipo de usuário no banco de dados.

### Implantação

Atualmente, é possível implantar o código usando o Vercel (https://prae-henriquerl55.vercel.app), pois a API ainda está hospedada no Heroku. No entanto, a API será retirada do Heroku até o final de julho devido ao fim do período de utilização gratuita.

## Instalação das dependências

Para instalar as dependências do projeto, execute:

```
npm install
```

Agora você pode iniciar um servidor web local executando:

```
npm start
```

Em seguida abra http://localhost:3000 para visualizá-lo no navegador.

## Configuração da API

Na pasta api.js está definido a rota na apiUrl. Será necessário modificar ao utilizar um novo deploy para o Back-end.

## Scripts disponíveis

Neste projeto você pode executar os seguintes scripts:

Script | Descrição
------ | ----------
npm start | Executa o aplicativo no modo de desenvolvimento.
npm test | Inicia o executor de testes no modo de observação interativo.
npm run build | Compila o aplicativo para produção na pasta build.
npm run eject | Este comando removerá a dependência única de compilação do seu projeto.

## Login

Para efetuar o login, utilize seu email e senha.

## Registro

Para se registrar, preencha os seguintes campos:
- Nome
- Email
- Senha
- Tipo de Usuário
- Curso

Após clicar em registrar, você será redirecionado para a página de login após 2 segundos.

## Usuário Comum

Para usuários comuns, é possível visualizar as páginas Acervo, Sobre e Interesses Próprios.

### Acervo

Na página Acervo, é possível buscar livros pelo título e navegar pelas páginas. Há uma limitação de 8 livros por página.

Dentro do acervo, é possível salvar um livro como favorito ao clicar na estrela. A estrela dourada indica que o livro está favoritado. Ao clicar na estrela dourada, ela fica cinza, desfavoritando o livro. A estrela cinza indica que o livro não está favoritado.

### Sobre

Na página Sobre, é possível visualizar um texto sobre a PRAE (SATIE).

### Interesses

A página Interesses mostra os livros favoritados pelo usuário comum. Caso não haja nenhum livro favoritado, aparecerá a mensagem: "Você não possui nenhum livro favorito."

Dentro dessa página, é possível visualizar seus livros favoritos e também desfavoritá-los.

## Usuário Administrador

O usuário administrador possui 4 formas de navegar, sendo duas diferentes do usuário comum.

### Acervo

Na página Acervo, é possível fazer busca por nome do livro e navegar pelas páginas. Dentro do acervo do administrador, não há estrela para favoritar, apenas uma visualização de como está o acervo.

### Sobre

Na página Sobre, é possível visualizar um texto sobre a PRAE (SATIE).

### Cadastro

Na página Cadastro, é possível cadastrar novos livros, editar e excluir livros. Essa página é dividida entre criação de livros e um acervo ao lado mostrando todos os livros cadastrados, sendo possível editar e excluir.

### Interesses

A página Interesses do administrador é diferente da do usuário comum. Ao invés de mostrar seus livros favoritados, mostra um dashboard onde é possível gerenciar a troca de livros pelos usuários. É possível buscar por livros de acordo com seu status e também pelo nome do livro ou nome do usuário.

Ao clicar em um livro na página Interesses, aparece uma tela sobre esse "Interesse de troca por um usuário". Nessa tela estão informações como o nome do usuário que quer realizar a troca, a categoria do livro e o curso que esse usuário faz parte.

Abaixo dessas informações há um campo onde é possível alterar o status desse livro em específico. As opções são: Pendente, Aceito, Negado, Aceito - Vale e Cancelado. Ao mudar o status desse livro, clique em enviar para finalizar o processo de troca.

Na opção Aceito, aparece um campo adicional onde é possível colocar o livro que será utilizado como troca pelo usuário. A pergunta é: "Qual livro será adicionado ao acervo?" Coloque o nome do livro e clique em enviar para adicionar um novo livro ao acervo.

Ao clicar em um livro que possui Status "Aceito", ele terá um campo adicional mostrando qual foi o livro adicionado ao acervo pelo usuário.

## Possíveis melhorias

- Verificar o registro por matrícula.
- Na página Interesses do usuário comum, mostrar ao usuário o status do seu livro favoritado.
- Na página Interesses do administrador, ao realizar o processo de troca (mudar status), impedir que o status dessa troca seja modificado novamente, criando um disable.

## Créditos

Projeto SATIE foi constrúido por Henrique Lengruber e Vinicius Dutra.

## Licença

Código liberado sob a licença MIT.