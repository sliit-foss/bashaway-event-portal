# Stage 1: Build the React application
FROM node:16-alpine as build

# Install pnpm globally
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
