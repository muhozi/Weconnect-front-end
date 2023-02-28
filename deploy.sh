#!/bin/sh
git checkout master
git pull origin master
nvm use
yarn
yarn build