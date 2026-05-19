FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps
COPY . .

ARG PORT=18212
ARG VITE_APP_DEF_LANG_CODE
ARG VITE_APP_VERSION

ENV EXPOSE_PORT=${PORT}
ENV VITE_APP_DEF_LANG_CODE=${VITE_APP_DEF_LANG_CODE}
ENV VITE_APP_VERSION=${VITE_APP_VERSION}

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE ${EXPOSE_PORT}
CMD ["nginx", "-g", "daemon off;"]
