#!/bin/sh

s3put -a $AWS_ACCESS_KEY_ID -s $AWS_SECRET_KEY -b snapnote.io -p /var/www/snapnote.io/www www/**/*
