# Utilizamos la imagen de Node.js como base
FROM node:20 AS build

# Instalamos Angular CLI globalmente
RUN npm install -g @angular/cli@16

# Establecemos un directorio de trabajo para la aplicación
WORKDIR /app

# Copiamos el package.json y el package-lock.json para instalar dependencias
COPY package.json package-lock.json ./

# Instalamos las dependencias de la aplicación
RUN npm install

# Copiamos todos los archivos de la aplicación al contenedor
COPY . .

# Construimos la aplicación Angular para producción
RUN ng build --prod

# Etapa 2: Servimos la aplicación con Nginx
FROM nginx:alpine

# Copiamos los archivos construidos desde la etapa anterior
COPY --from=build /app/dist/your-angular-project /usr/share/nginx/html

# Exponemos el puerto en el que Nginx correrá
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
