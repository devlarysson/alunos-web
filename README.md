# Alunos WEB

App feito em [React] que acessa a [alunos-api][alunos-api] através de [GraphQL].

## Tecnologias utilizadas

- [Node][nodejs]
- [React][react]
- [Docker][docker]
- [GraphQL][graphql]

## Como usar

Para clonar e executar a aplicação, você vai precisar do [Git][git], [Docker][docker] + [docker-compose][docker-compose].

## Instalando API

```bash
# clone este repositório
$ git clone git@github.com:devlarysson/alunos-web.git

# entre no diretório da aplicação
$ cd alunos-web

# construa e inicie seu container
$ docker-compose up --build

Rodando na porta 80
```

## Testes

```bash
# testes unitários
$ npm run test
```

[nodejs]: https://nodejs.org/
[react]: https://pt-br.reactjs.org/
[docker]: https://www.docker.com/
[docker-compose]: https://docs.docker.com/compose/
[git]: https://git-scm.com/
[graphql]: https://graphql.org/
[alunos-api]: https://github.com/devlarysson/alunos-api