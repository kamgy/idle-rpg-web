# Stage 1: Build the Vite app
FROM node:18 as builder 

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Caddy
FROM caddy:2.6.4-alpine

WORKDIR /srv

COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
