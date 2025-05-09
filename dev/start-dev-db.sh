#!/bin/sh

COMPOSE_FILE="./dev/docker-compose-dev.yml"

# Check if the Docker Compose stack is running
if docker compose -f $COMPOSE_FILE ps | grep -q "Up"; then
  echo "Local db is running. Stopping it..."
  docker compose -f $COMPOSE_FILE down
else
  echo "Local db is not running. Starting it..."
  docker compose -f $COMPOSE_FILE up -d
fi
