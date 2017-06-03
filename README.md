snapnote.io
===========

Snapnote is a web app for annotating and sharing images hosted at http://snapnote.io and covered by [the MIT license](https://github.com/morria/snapnote.io/blob/master/LICENSE).

Tour of Source
==============

The root of the Javascript app is at [www/js/main.js](https://github.com/morria/snapnote.io/blob/master/www/js/main.js) which loads the main Snapnote library from [www/js/io/snapnote/app/SnapNote.js](https://github.com/morria/snapnote.io/blob/master/www/js/io/snapnote/app/SnapNote.js). The top-level HTML file is [www/index.php](https://github.com/morria/snapnote.io/blob/master/www/index.php).

Core graphics are handled by [EaselJS](http://www.createjs.com/#!/EaselJS) with extensions rooted at [www/js/easeljs/display](https://github.com/morria/snapnote.io/tree/master/www/js/easeljs/display).

Saved annotated images are stored as a PNG in an S3 bucket via [Storage::post()](https://github.com/morria/snapnote.io/blob/master/phplib/Storage.php#L30-L37).

Building and Deploying
======================

Run ./[deploy.sh](https://github.com/morria/snapnote.io/blob/master/deploy.sh) to build the project and deploy it to `target`.

Once built, you can create a docker image and run it via `docker build -t snapnote .`

Once the container is built, you can run it via the following.

```
docker run -it -p80:80 -e "AWS_ACCESS_KEY_ID=..." -e "AWS_SECRET_ACCESS_KEY=..." -e "AWS_BUCKET_NAME=..." --rm snapnote
```
