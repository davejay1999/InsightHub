#!/bin/bash

# Define the port used by your server
PORT=3000

echo "Checking for running Node.js or nodemon processes..."

# Use lsof to find the PID of the process using port 3000 and kill it
PID=$(lsof -ti:$PORT)
if [[ ! -z $PID ]]; then
  echo "Killing process on port $PORT with PID $PID"
  kill -9 $PID
fi

echo "Starting the server with nodemon..."
nodemon server.js

echo "Server started successfully."

