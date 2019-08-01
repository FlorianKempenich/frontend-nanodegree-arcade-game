#!/bin/bash

IMG=arcade-game
CONTAINER=arcade-game-container

PORT=7001

docker build -t ${IMG} .
docker stop ${CONTAINER}
docker rm ${CONTAINER}
docker run \
    --name ${CONTAINER} \
    --restart=always \
    -p ${PORT}:80 \
    -d \
    ${IMG}
