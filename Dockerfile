FROM php:7.1-apache
RUN mv /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/rewrite.load
COPY conf/snapnote.io.conf /etc/apache2/sites-enabled/000-default.conf
COPY target /var/www/snapnote.io
