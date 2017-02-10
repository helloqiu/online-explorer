FROM node:7.5.0-slim

RUN npm i online-explorer -g \
    && mkdir /web-files \
    && echo "Asia/Shanghai" > /etc/timezone

WORKDIR /web-files

CMD online-explorer --host 0.0.0.0 -p 3000
