# USU CS4610 Nest Starter App

## Description
A starter app with Postgres, NestJS, and React

## Cloning the project
IMPORTANT Windows users should setup WSL first before cloning. See [WSL_SETUP.md](/WSL_SETUP.md)
This app is designed to used as a starting point for another application so you will want to clone the project into a folder that matches your app. Run
```bash
git clone git@github.com:dittonjs/NestStarterApp.git <YourAppName>
```
a
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
Create a file in the root called `.env` and copy the contents of `.env.example`.

Make sure you create a new file instead of renaming the `.env.example` file.

In your new `.env` file update the values for each key as you would like

### Dependencies
To install the both server and client dependencies run
```bash
yarn # this is same thing as `yarn install`
```
Notice that the `client` folder has its own `package.json` file and its own `node_modules`. If you add dependencies for the client make sure to `cd` into the `client` directory before doing `yarn add`

### Database
This application uses Postgres. To setup the database run
```bash
yarn db:setup
```
This will create the database, run the migrations, and run the seeds for you.

### Migrations
Any time you want make changes to your database schema you will need to generate a migration file
```bash
yarn db:migration:create AddContextToRoles # replace this name with a name that describes your migration
```
Open that migration file and make the changes. Then, when you are ready
```bash
yarn db:migrate
```
will run any pending migrations.

If a team member adds a migrations you will need to run the migrate command to make the changes to your local database as well.

### Seeds
Seeds allow you to pre-populate your database with data. By default this application prepopulates the `Roles` and the Admin `User` into your database.

If you make changes to the seeds file at `server/database/seeds.ts` the make sure that, in the event seeds are run multiple times, you don't end up with duplicate data.

To run the seeds
```bash
yarn db:seed
```

### SSL
**Only do this step if you intend on developing your app in an environment where you need SSL (like canvas or other embedded platforms).**

In your `.env` set
```
USE_SSL=true
```

Create a ssl key and certificate and place them in the root directory

```bash
openssl req -x509 -newkey rsa:4096 -keyout private-key.pem -out public-cert.pem -sha256 -nodes
```
Enter `US` for the country code. Where this key will only be used for development you can leave all of the rest of information blank.

## Running the app
To start the server run
```bash
yarn start:dev
```

To start the client run
```bash
yarn client:watch
```
YOU NEED TO RUN EACH OF THESE COMMANDS IN A SEPARATE TERMINAL TAB / WINDOW

## Setup Heroku
We will deploy all our projects to Heroku. Heroku is a cloud platform that is easy and free to use. You will only need to run these step once for each computer you are working on this semester.

### Create an account
On heroku.com create an account.

### Install Heroku CLI
If you don't have the heroku CLI installed you can install it by running. You should only need to do this once on each computer you are working on.

```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

### Login to CLI
To log into the CLI run
```bash
heroku login
```
and follow the prompts. After a while, you maybe be prompted to login again which is fine.



## Deploy Setup
Follow these steps to setup your app for deploy, you should only have to do this once per application

### Create app in heroku
1. Go to your heroku dashboard and create a new application.

2. Once your app has been created you will need to enable the Postgres addon. Select the `Resources` tab and search for `Heroku Postgres` addon.

3. On the screen that pops up make sure `Hobby Dev` is selected (that is the free option) and click the submit order button.

4. Click on the `Settings` tab, select the `Reveal Config Vars` button, and verify you have an entry for `DATABASE_URL`.

### Setup config vars
You will need to add entries in Heroku for each of the production config vars in the `.env` file.

To do this go the `Settings` tab in your app on heroku and click `Reveal Config Vars`. Fill out the key and value for each entry.

**DO NOT MANUALLY SET THE `PORT`, `USE_SSL`, `NODE_ENV`, OR `DATABASE_URL` VARS.** These will be managed for you by Heroku

You should generate new values for the `ENCRYPTION_KEY`, `REFRESH_ENCRYPTION_KEY`, and `ADMIN_PASSWORD` vars. I recommend using a real email address for your `ADMIN_EMAIL`.

All vars should be named the exact same as they are in the `.env` file.

### Link to Heroku
You publish to Heroku using `git`. Run the following command to add the heroku remote
```bash
heroku git:remote -a <your app name>
```
If your app name in Heroku was `spy-chat` then you would run
```bash
heroku git:remote -a spy-chat
```

## Deploying
We finally made it! To deploy your app to Heroku run
```bash
git push heroku main
```
and thats it!
