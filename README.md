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
To install the dependencies run
```bash
$ yarn # this is same thing as `yarn install`
```

### Database
Create the database
```bash
$ pc_ctl start # this starts postgres
$ createdb neststarterappdevelopement # creates a postgres database
```

Run the migrations
```bash
yarn db:migrate
```

Migrations need to be run again everytime a new migration is created

### SSL
Create a ssl key and certificate an place them in the root directory

```bash
$ openssl req -x509 -newkey rsa:4096 -keyout private-key.pem -out public-cert.pem -sha256 -nodes
```
Where this key will only be used for development you can leave all of the information blank.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
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
