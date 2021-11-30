# Nest Starter App

## Description
A starter app with Postgres, NestJS, and React

## Prerequisites
### asdf-vm
Tool versions are managed using `asdf-vm`. You will need to have `asdf-vm` installed first.

## Setup
### Tool versions
Install the tool versions by running
```bash
$ asdf install
```

### Install yarn
We will use `yarn` instead of `npm` for package managment
```bash
$ npm install -g yarn
```

### .env
Create a file in the root called `.env` and copy the contents of `.env.example`

### Dependencies
To install the server dependencies run
```bash
$ yarn # this is same thing as `yarn install`
```

To install the client dependencies run
```bash
$ cd client && yarn && cd ..
```

### Database
Create the database
```bash
$ pg_ctl start # starts postgres
$ createdb neststarterappdevelopment # creates a postgres database
```

Run the migrations
```bash
yarn db:migrate
```

Migrations need to be run again everytime a new migration is created

### SSL
Create a ssl key and certificate and place them in the root directory

```bash
$ openssl req -x509 -newkey rsa:4096 -keyout private-key.pem -out public-cert.pem -sha256 -nodes
```
Enter `US` for the country code. Where this key will only be used for development you can leave all of the rest of information blank.

## Running the app
To start the server run
```bash
# watch mode
$ yarn start:dev
```

To start the client run
```bash
$ yarn client:watch
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
