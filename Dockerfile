# Stage 1: Build the React application
FROM node:16-alpine as build

ARG VITE_APP_ENV
ARG VITE_CORE_BE_URL=https://techevents-api-dev-6yykz7rdnq-uc.a.run.app
ARG VITE_FIREBASE_CONFIG
ARG VITE_AZURE_UPLOAD_SAS_TOKEN
ARG VITE_AZURE_DOWNLOAD_SAS_TOKEN
ARG VITE_AZURE_GENERIC_UPLOAD_SAS_TOKEN
ARG VITE_AZURE_STORAGE_ACCOUNT
ARG VITE_AZURE_GENERIC_STORAGE_ACCOUNT
ARG VITE_AZURE_STORAGE_CONTAINER
ARG VITE_SENTRY_DSN
ARG SENTRY_ORG
ARG SENTRY_PROJECT_NAME

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

COPY patches /app/patches

RUN pnpm install --ignore-scripts

COPY . .

RUN pnpm run build

# Stage 2: Serve the React application from Nginx
FROM nginx:1.19.0-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
