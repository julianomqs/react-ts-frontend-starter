FROM node:12.16.1-slim

RUN apt-get update && \
  apt-get install -y curl git && \
  apt-get autoremove -y

USER node

RUN mkdir -p /home/node/.npm
