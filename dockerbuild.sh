#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt || exit $?

cp ./Dockerfile ./dist/

cd dist
npm install --production || exit $?

echo Building docker image
docker build -t grimurd09/tictactoe . || exit $?

echo "Done"
