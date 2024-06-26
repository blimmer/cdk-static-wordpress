ARG BASE_WORDPRESS_IMAGE
ARG PHP_INI
ARG PHP_VERSION

# This stage is used to install plugin dependencies using composer. We use a docker multi-stage build to ensure all
# these extra dependencies do not end up in the final layer.
# TODO: support gravitron
FROM --platform=linux/amd64 php:$PHP_VERSION as compile

ARG wp2static_version
ARG wp2static_s3_addon_version

WORKDIR /deps

# TODO: see if we can disable this by using a non-root user
# See https://getcomposer.org/doc/faqs/how-to-install-untrusted-packages-safely.md
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install system dependencies
RUN apt-get update && \
    apt-get install --no-install-recommends -y wget zip unzip && \
    rm -fr /var/lib/apt/lists/*

# Install composer
RUN wget https://raw.githubusercontent.com/composer/getcomposer.org/main/web/installer -O - -q | php -- --quiet && \
    mv /deps/composer.phar /usr/local/bin/composer

# Download wp2static source code, install composer dependencies and build production plugin bundle
RUN curl -Lf https://github.com/WP2Static/wp2static/archive/refs/tags/${wp2static_version}.zip -o /deps/serverless-wordpress-wp2static.zip && \
    unzip /deps/serverless-wordpress-wp2static.zip && \
    cd /deps/wp2static-${wp2static_version} && \
    composer install && \
    composer build serverless-wordpress-wp2static && \
    mv $HOME/Downloads/serverless-wordpress-wp2static.zip /deps/serverless-wordpress-wp2static.zip

# Download wp2static-s3-addon source code, install composer dependencies and build production plugin bundle
RUN curl -Lf https://github.com/leonstafford/wp2static-addon-s3/archive/refs/tags/${wp2static_s3_addon_version}.zip -o /deps/serverless-wordpress-s3-addon.zip && \
    unzip /deps/serverless-wordpress-s3-addon.zip && \
    cd /deps/wp2static-addon-s3-${wp2static_s3_addon_version} && \
    composer install && \
    composer build serverless-wordpress-s3-addon && \
    mv $HOME/Downloads/serverless-wordpress-s3-addon.zip /deps/serverless-wordpress-s3-addon.zip

# Start over with a fresh wordpress layer
ARG BASE_WORDPRESS_IMAGE
FROM --platform=linux/amd64 $BASE_WORDPRESS_IMAGE as wordpress

ARG PHP_INI

ARG wp2static_version
ENV WP2STATIC_VERSION=$wp2static_version
ARG wp2static_s3_addon_version
ENV WP2STATIC_S3_ADDON_VERSION=$wp2static_s3_addon_version

COPY ["wp-cli.phar", "/tmp/"]
COPY docker-entrypoint.sh /usr/local/bin/
RUN apt-get update && apt-get install -y sudo jq awscli mariadb-client && chmod +x /usr/local/bin/docker-entrypoint.sh && chmod +x /tmp/wp-cli.phar && mv /tmp/wp-cli.phar /usr/local/bin/wp \
&& rm -rf /var/lib/apt/lists/*

# Copy over built plugins for the compile layer
COPY --from=compile /deps/serverless-wordpress-wp2static.zip /tmp/serverless-wordpress-wp2static.zip
COPY --from=compile /deps/serverless-wordpress-s3-addon.zip /tmp/serverless-wordpress-s3-addon.zip

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" && \
    bash -c 'echo -e "$PHP_INI" > "$PHP_INI_DIR/conf.d/php.ini"'
