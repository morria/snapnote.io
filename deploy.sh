#!/bin/sh

rm -rf target

# web
mkdir -p target/www
cp www/.htaccess.live target/www/.htaccess
cp www/* target/www/
cp -R www/js target/www/
cp -R www/img target/www/

# Compress all CSS
mkdir -p target/www/css/
cp -R www/css/fonts target/www/css/
cp -R www/css/font.css target/www/css/
lessc www/css/style.less -x --yui-compress > target/www/css/style.css
lessc www/css/view.less -x --yui-compress > target/www/css/view.css
mkdir -p target/www/css/mobile/
lessc www/css/mobile/view.less -x --yui-compress > target/www/css/mobile/view.css
lessc www/css/mobile/tablet.less -x --yui-compress > target/www/css/mobile/tablet.css
lessc www/css/mobile/mobile.less -x --yui-compress > target/www/css/mobile/mobile.css

# PHP Libs
cp -R phplib target/
cp -R templates target/

# Configs
cd target
ln -s phplib/conf/production.php environment.php
