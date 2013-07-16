<?php
require_once '../environment.php';

$css = [
  'suffix' => ENVIRONMENT == 'development' ? 'less' : 'css',
  'media'  => ENVIRONMENT == 'development' ? 'text/less' : 'text/css',
  'rel'    => ENVIRONMENT == 'development' ? 'stylesheet/less' : 'stylesheet',
];

$desktop_image_id = $_GET['d'] ?: null;

include '../templates/index.php';
exit;
