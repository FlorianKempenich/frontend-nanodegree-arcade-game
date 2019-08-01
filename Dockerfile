FROM nginx

WORKDIR /usr/share/nginx/html
COPY css css
COPY js js
COPY images images
COPY index.html .