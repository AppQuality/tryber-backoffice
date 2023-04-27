#!/bin/bash
set -euo pipefail

# enable and start docker service
systemctl enable docker.service
systemctl start docker.service
echo "Started and enabled docker service"
echo "Starting deploy of $APPLICATION_NAME"
# login to ecr
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 163482350712.dkr.ecr.eu-west-1.amazonaws.com

# read docker image version from manifest
DOCKER_IMAGE=$(cat "/home/ec2-user/crowd-backoffice/docker-image.txt")
DOCKER_COMPOSE_FILE="/home/ec2-user/$APPLICATION_NAME/docker-compose.yml"
INSTANCE_ID=$(wget -q -O - http://169.254.169.254/latest/meta-data/instance-id)
ENVIRONMENT=$(aws ec2 describe-tags --filters "Name=resource-id,Values=$INSTANCE_ID" "Name=key,Values=environment"  --output=text | cut -f5)

# pull docker image from ecr
docker pull 163482350712.dkr.ecr.eu-west-1.amazonaws.com/$DOCKER_IMAGE

echo "Creating folders..."
mkdir -p /var/docker/keys
mkdir -p /home/ec2-user/$APPLICATION_NAME
echo "Created!"


echo "Checking if $DOCKER_COMPOSE_FILE exists..."
if test -f "$DOCKER_COMPOSE_FILE"; then
    echo "Checking if app is running..."
    set +e
    IS_RUNNING=$(docker ps -a | grep $DOCKER_IMAGE| wc -l)
    set -e
    echo "Is running: $IS_RUNNING"
    if [ "$IS_RUNNING" -eq "1" ]; then
        echo "Container is running! Stopping..."
        docker-compose -f $DOCKER_COMPOSE_FILE down
        echo "Stopped!"
    fi
fi

echo "Creating template..."
echo "
version: '3'
services:
  app:
    image: 163482350712.dkr.ecr.eu-west-1.amazonaws.com/$DOCKER_IMAGE
    restart: always
    ports:
      - '80:80'
    environment:
      - PORT=80
    logging:
      driver: awslogs
      options:
        awslogs-region: eu-west-1
        awslogs-group: "tryber-backoffice-${ENVIRONMENT}-${ENVIRONMENT}"
        awslogs-stream: ${INSTANCE_ID}
        awslogs-create-group: 'true'
" > $DOCKER_COMPOSE_FILE

echo "Starting container..."
docker-compose -f $DOCKER_COMPOSE_FILE up -d
