#BEGIN COMMON
FROM ubuntu:14.04

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN locale-gen en_US en_US.UTF-8
ENV LANG en_US.UTF-8
RUN echo "export PS1='\e[1;31m\]\u@\h:\w\\$\[\e[0m\] '" >> /root/.bashrc

#Runit
RUN apt-get install -y runit
CMD export > /etc/envvars && /usr/sbin/runsvdir-start
RUN echo 'export > /etc/envvars' >> /root/.bashrc

#Utilities
RUN apt-get install -y vim less net-tools inetutils-ping wget curl git telnet nmap socat dnsutils netcat tree htop unzip sudo software-properties-common jq psmisc libfontconfig1
#END COMMON

#Node
RUN wget -O - http://nodejs.org/dist/v6.9.1/node-v6.9.1-linux-x64.tar.gz | tar xz
RUN mv node* node && \
    ln -s /node/bin/node /usr/local/bin/node && \
    ln -s /node/bin/npm /usr/local/bin/npm
ENV NODE_PATH /usr/local/lib/node_modules
RUN npm config set loglevel info

#Point to internal npm reqistry to enable internal module installs
ADD .npmrc /app/.npmrc

#Install dependencies
ADD package.json /app/package.json
RUN cd /app && \
    npm install
#Build
ADD . /app
RUN cd /app && \
    npm run build

#Add runit services
ADD docker/sv /etc/service
