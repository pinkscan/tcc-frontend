#!/bin/sh

# API_URL padrão caso não venha nada
: "${API_URL:=http://localhost:4000}"

# aplica variáveis no template
envsubst < /usr/share/nginx/html/config.js.template \
         > /usr/share/nginx/html/config.js

exec "$@"
