#!/bin/sh

rm -rf staging
mkdir staging

# web
mkdir -p staging/www
cp www/.htaccess.live staging/www/.htaccess
cp www/* staging/www/
cp -R www/img staging/www/

# Compress all CSS
mkdir -p staging/www/css/
cp -R www/css/fonts staging/www/css/
cp -R www/css/font.css staging/www/css/
lessc www/css/style.less -x --yui-compress > staging/www/css/style.css
lessc www/css/view.less -x --yui-compress > staging/www/css/view.css
mkdir -p staging/www/css/mobile/
lessc www/css/mobile/view.less -x --yui-compress > staging/www/css/mobile/view.css
lessc www/css/mobile/tablet.less -x --yui-compress > staging/www/css/mobile/tablet.css
lessc www/css/mobile/mobile.less -x --yui-compress > staging/www/css/mobile/mobile.css

# Compress JS
cp -R www/js staging/www
mkdir -p staging/www/js/vendor
cp www/js/vendor/require.js staging/www/js/vendor/
node /usr/lib/node_modules/requirejs/bin/r.js -o build.js name=main out=staging/www/js/main.min.js
node /usr/lib/node_modules/requirejs/bin/r.js -o build.js name=view out=staging/www/js/view.min.js

# PHP Libs
cp -R phplib staging/
cp -R templates staging/

# Configs
cd staging
ln -s phplib/conf/production.php environment.php

cd -
rm -rf target && mv staging target

