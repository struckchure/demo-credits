FROM node:current-slim

RUN apt-get update && \
    apt install -y sudo

RUN adduser --disabled-password --gecos '' lendsqr
RUN adduser lendsqr sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER lendsqr

WORKDIR /home/lendsqr/code/

ENV PATH="/home/lendsqr/.local/bin:${PATH}"

RUN mkdir /home/lendsqr/.node-modules
RUN npm config set prefix /home/lendsqr/.node-modules

RUN sudo chmod -R 777 .
COPY --chown=lendsqr:lendsqr . .

RUN yarn
