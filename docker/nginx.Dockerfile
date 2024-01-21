FROM nginx

COPY ./nginx /etc/nginx

VOLUME /usr/share/nginx/html
VOLUME /etc/nginx