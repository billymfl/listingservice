#!/bin/bash

# run: npm test or npm test TEST_NAME

if [ -z $1 ]; then set $1 '.'; fi

NODE_ENV=test \
HOST=0.0.0.0 \
PORT=88 \
REDIS_URL=0.0.0.0 \
MONGO_URL=0.0.0.0 \
nyc mocha --exit --grep $1