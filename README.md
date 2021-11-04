# Nest Starter App

## Description
A starter app with LTI1p0 enabled for NestJS

## Setup
Create a file in the root called `.env` and copy the contents of `.env.example`

## SSL
Create a ssl key and certificate an place them in the root directory

```bash
$ openssl req -x509 -newkey rsa:4096 -keyout private-key.pem -out public-cert.pem -sha256 -nodes
```
Where this key will only be used for development you can leave all of the information blank.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
