FROM node:7.5.0-alpine

ADD index-dev.js /online-explorer/
ADD src/explorer.js /online-explorer/src/
ADD package.json /online-explorer/
ADD front-end /online-explorer/front-end

RUN cd /online-explorer/front-end \
    && npm i --silent\
    && npm run build \
    && cd /online-explorer \
    && npm i \
    && npm run build \
    && npm link \
    && rm -rf front-end \
    && rm index-dev.js \
    && mkdir /web-files \
    && echo "Asia/Shanghai" > /etc/timezone

WORKDIR /web-files

CMD online-explorer --host 0.0.0.0 -p 3000
