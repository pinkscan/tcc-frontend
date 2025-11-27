#!/bin/sh

# Default API_URL when not provided
: "${API_URL:=/api}"

# Apply environment variables into the template at container startup
envsubst < /usr/share/nginx/html/config.js.template \
         > /usr/share/nginx/html/config.js

exec "$@"
