# Dockerfile
# Etapa 1: Build de la aplicación
FROM node:18-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine AS production

# Copiar archivos de build desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remover la configuración por defecto de nginx
RUN rm /etc/nginx/conf.d/default.conf.bak 2>/dev/null || true

# Exponer puerto (puerto por defecto de Render)
EXPOSE 5173

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]