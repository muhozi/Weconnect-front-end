#!/bin/sh
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh  # This loads NVM
git checkout master
git pull origin master
nvm use
yarn
yarn build
