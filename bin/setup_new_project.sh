#!/bin/bash

echo "What is the name of your application?"
read appname

echo "Where is your git repo? (eg git@github.com:dittonjs/NestStarterApp.git)"

read reponame

# replace the title of the README with new app name
sed -i "s/USU CS4610 Nest Starter App/$appname/" README.md

git add .
git commit -m "setup new project '$appname'"
git remote rename origin upstream
git remote add origin $reponame
git branch -M main
git push -u origin main


