# MenuLive

## Descrição

A aplicação Menu Live tem como objetivo permitir que pequenos restaurantes organizem seus cardápios para que sejam acessados e utilizados pelos seus clientes de forma virtual.

## Funcionamento

A aplicação deve funcionar de tal modo onde restaurantes possam ser registrados e, após isso, o cardápio possa ser configurado atráves de um paínel, onde é possível definir comidas, bebidas, além de outros serviços que venham a ser oferecidos pelo estabelecimento.

## Fluxo

1. **Registro de um estabelecimento:** usuário preenche informações como nome, telefone, logo
2. **Configuração:** usuário pode definir os produtos que serão oferecidos
3. **Acesso:** clientes podem entrar na seção do estabelecimento, escolher seus produtos desejados e serem redircionados para finalização de pedido via WhatsApp

## Setup

```bash
$ pnpm install
```

## Rodar o projeto

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
