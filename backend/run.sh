#!/bin/bash
docker build -t='mongo-movie' .
docker run -it --rm --link=mongo-movie:mongo-movie -p 5000:5000 -v $(pwd):/app mongo-movie
