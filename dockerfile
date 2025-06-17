FROM php:8.2-fpm

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    npm \
    nodejs \
    supervisor

# Extensiones PHP necesarias
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establece el directorio de trabajo
WORKDIR /var/www

# Copia todos los archivos del proyecto
COPY . .

# Instala dependencias PHP y JS + build de assets
RUN composer install --no-dev --optimize-autoloader
RUN npm install
RUN npm run build

# Prepara el entorno
RUN cp .env.example .env && \
    php artisan key:generate

# Permisos
RUN chown -R www-data:www-data /var/www && \
    chmod -R 755 /var/www

# Exponer puerto
EXPOSE 8080

# Servidor Laravel (no recomendado en producción real, pero útil para Render simple)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
