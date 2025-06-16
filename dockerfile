FROM php:8.2-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    npm \
    nodejs \
    supervisor

# Instalar extensiones de PHP
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar el proyecto al contenedor
WORKDIR /var/www
COPY . .

# Instalar dependencias de Laravel y Vue
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# ✅ Copiar .env.example como .env
RUN cp .env.example .env

# Generar la clave de Laravel
RUN php artisan key:generate

# Permisos
RUN chown -R www-data:www-data /var/www
RUN chmod -R 755 /var/www

# Exponer el puerto
EXPOSE 8000

# Comando para correr Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
