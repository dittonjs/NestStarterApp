# USU CS4610 Nest Starter App

## Description
A starter app with Postgres, NestJS, and React

## Cloning the project
This app is designed to used as a starting point for another application so you will want to clone the project into a folder that matches your app. Run
```bash
$ git clone git@github.com:dittonjs/NestStarterApp.git <YourAppName>
```
a
Replace your app name with the name of your app, for example
```bash
$ git clone git@github.com:dittonjs/NestStarterApp.git SpyChat
```

Next, go create a remote repository in github (or gitlab, or bitbucket, it doesn't matter) for your new application.

Finally, run
```bash
$ bash ./bin/setup_new_project.sh
```
and follow the prompts. This script will link the repo to your new repo while maintaining a reference to the starter app repo. This way, if we make changes to the starter app repo, you can still get those changes.

## Pulling Updates from Starter App

To retrieve changes from the starter app run
```bash
$ git pull upstream main
```
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
We will use `yarn` instead of `npm` for package managment. To install yarn run
```bash
$ npm install -g yarn
```

### .env
Create a file in the root called `.env` and copy the contents of `.env.example`.

Make sure you create a new file instead of renaming the `.env.example` file.

In your new `.env` file update the values for each key as you would like

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
This application uses Postgres. To setup the database run
```bash
$ yarn db:setup
```
This will create the database, run the migrations, and run the seeds for you.

### Migrations
Any time you want make changes to your database schema you will need to generate a migration file
```bash
yarn db:migration:generate AddContextToRoles # replace this name with a name that describes your migration
```
Open that migration file and make the changes. Then, when you are ready
```bash
$ yarn db:migrate
```
will run any pending migrations.

If a team member adds a migrations you will need to run the migrate command to make the changes to your local database as well.

### Seeds
Seeds allow you to pre-populate your database with data. By default this application prepopulates the `Roles` and the Admin `User` into your database.

If you make changes to the seeds file at `server/database/seeds.ts` the make sure that, in the event seeds are run multiple times, you don't end up with duplicate data.

To run the seeds
```bash
$ yarn db:seed
```

### SSL
**Only do this step if you intend on developing your app in an environment where you need SSL (like canvas or other embedded platforms).**

In your `.env` set
```
USE_SSL=true
```

Create a ssl key and certificate and place them in the root directory

```bash
$ openssl req -x509 -newkey rsa:4096 -keyout private-key.pem -out public-cert.pem -sha256 -nodes
```
Enter `US` for the country code. Where this key will only be used for development you can leave all of the rest of information blank.

## Running the app
To start the server run
```bash
$ yarn start:dev
```

To start the client run
```bash
$ yarn client:watch
```

## Test
**WORK IN PROGRESS**

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
