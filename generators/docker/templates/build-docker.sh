#!/bin/bash

docker build --no-cache $@ -f docker/Dockerfile -t <%= appName %> .
