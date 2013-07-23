<?php
require_once '../environment.php';

$css = [
  'suffix' => ENVIRONMENT == 'development' ? 'less' : 'css',
  'media'  => ENVIRONMENT == 'development' ? 'text/less' : 'text/css',
  'rel'    => ENVIRONMENT == 'development' ? 'stylesheet/less' : 'stylesheet',
];

$desktop_image_id = $_GET['d'] ?: null;

$is_mac =
  preg_match('/Mac/', $_SERVER['HTTP_USER_AGENT']);

include '../templates/index.php';
exit;
