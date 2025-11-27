# ---------- STAGE 1: build ----------
FROM node:20-alpine AS build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# A build NÃO usa mais API_URL
RUN pnpm build

# ---------- STAGE 2: nginx ----------
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copia build
COPY --from=build /app/dist .

# adiciona template de config
COPY config.js.template /usr/share/nginx/html/config.js.template

# instala envsubst
RUN apk add --no-cache gettext

# entrypoint para gerar config.js em runtime
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
