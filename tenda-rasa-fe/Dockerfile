# Build stage
# node:18 gagal build (Vite 7/Rollup butuh crypto.hash, ada mulai Node 20.19+/22) - pakai
# versi yang sama dengan yang sudah terbukti jalan untuk `npm run dev` di lokal.
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Vite bake VITE_* ke bundle saat build, bukan dibaca runtime - jadi harus masuk
# lewat build arg, bukan cuma environment: di docker-compose.
ARG VITE_API_BACKEND
ARG VITE_API_WEBSOCKET
ARG VITE_PUBLIC_BUILDER_KEY
ENV VITE_API_BACKEND=$VITE_API_BACKEND
ENV VITE_API_WEBSOCKET=$VITE_API_WEBSOCKET
ENV VITE_PUBLIC_BUILDER_KEY=$VITE_PUBLIC_BUILDER_KEY

RUN npm run build

# Serve stage - static files via nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
