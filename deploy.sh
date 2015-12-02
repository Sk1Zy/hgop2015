#!/bin/bash


# Variables
DOCKER_USER="grimurd09"
PROJECT_NAME="tictactoe"

# Push to docker
docker push $DOCKER_USER/$PROJECT_NAME

ssh vagrant@10.0.0.11 << EOF
    docker kill $PROJECT_NAME;
    docker rm $PROJECT_NAME;
    docker pull $DOCKER_USER/$PROJECT_NAME;
    docker run -p 8080:8080 -d --name "$PROJECT_NAME" -e "NODE_ENV=production" $DOCKER_USER/$PROJECT_NAME;
    docker ps;
EOF
