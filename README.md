# USU CS4610 Nest Starter App

## Description
A starter app with Postgres, NestJS, and React

## Cloning the project
IMPORTANT Windows users should setup WSL first before cloning. See [WSL_SETUP.md](/WSL_SETUP.md)
This app is designed to used as a starting point for another application so you will want to clone the project into a folder that matches your app. Run

```bash
git clone git@github.com:dittonjs/NestStarterApp.git <YourAppName>
```

Replace your app name with the name of your app, for example

```bash
git clone git@github.com:dittonjs/NestStarterApp.git SpyChat
```

Next, go create a remote repository in github (or gitlab, or bitbucket, it doesn't matter) for your new application.

Finally, run
```bash
bash ./bin/setup_new_project.sh
```
and follow the prompts. This script will link the repo to your new repo while maintaining a reference to the starter app repo. This way, if we make changes to the starter app repo, you can still get those changes.

## Pulling Updates from Starter App

To retrieve changes from the starter app run
```bash
git pull upstream main
```
## Prerequisites
### VSCode
I know there are bunch of editors but trust me, VS Code will make your life easier, mostly becuase it is what I use and if you have issues I can help you. If you use something else IT WILL BE YOUR RESPONSIBILITY TO MAKE SURE IT IS CONFIGURED PROPERLY.

Look [here](/VSCODE.md) for information about which extensions and settings we will use.

### WSL
If you are on Windows you will need to install WSL2 you must be on windows 10 or higher.
You can find the instructions on how to set this up [here.](/WSL_SETUP.md)

### asdf-vm
Tool versions are managed using `asdf-vm`. You will need to have `asdf-vm` installed first. You can install it by following the instructions [here.](/ASDFVM_SETUP.md)

## Setup
Make sure your have navigated to the project directory in your terminal.

### Tool versions
Install the tool versions by running
```bash
asdf install
```

### Install yarn
We will use `yarn` instead of `npm` for package managment. To install yarn run
```bash
npm install -g yarn
```

### .env
Create a file in the `server` directory called `.env` and copy the contents of `.env.example`.

Make sure you create a new file instead of renaming the `.env.example` file.

In your new `.env` file update the values for each key as you would like

### Dependencies
Web-based software is actually multiple pieces of software working together. The client application, which runs in the browser is a different application entirely than the server application that runs on computer. As such they have different dependencies.

To install the server dependencies, navigate to the server directory and run
```bash
yarn # this is the same thing as `yarn install`
```

To install the client dependencies, navigate to the client directory and run
```bash
yarn
```

Any time you add a new dependency you need to remember to navigate to the directory for the application that needs the new dependency.

### Database
This application uses Postgres - a relational database that uses SQL. To setup the database navigate to the `server` directory and run
```bash
yarn db:setup
```
This will create the database, run the migrations, and run the seeds for you.

### Migrations
This project uses an ORM called Prisma and it automatically generates migration files for you. After you have made changes to the `server/prisma/schema.prisma` file you need to run:

```bash
yarn db:migrate
```
this will generate a new migration (if needed), and run any pending migrations.

If a team member adds a migrations you will need to run the migrate command to make the changes to your local database as well.

### Seeds
Seeds allow you to pre-populate your database with data. By default this application prepopulates the `Roles` and the Admin `User` into your database.

If you make changes to the seeds file at `server/prisma/seeds.ts` the make sure that, in the event seeds are run multiple times, you don't end up with duplicate data.

To run the seeds
```bash
yarn db:seed
```

### SSL
**Only do this step if you intend on developing your app in an environment where you need SSL (like canvas or other embedded platforms).**

In your `server/.env` file set
```
USE_SSL=true
```

Create a ssl key and certificate and place them in the root directory

```bash
openssl req -x509 -newkey rsa:4096 -keyout private-key.pem -out public-cert.pem -sha256 -nodes
```
Enter `US` for the country code. Where this key will only be used for development you can leave all of the rest of information blank.

## Running the app
YOU NEED TO RUN EACH OF THESE COMMANDS IN A SEPARATE TERMINAL TAB / WINDOW

To start the server run
```bash
yarn start:dev
```

To start the client run
```bash
yarn client:watch
```
