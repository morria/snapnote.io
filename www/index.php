<?php
require_once '../environment.php';

$css = [
  'suffix' => ENVIRONMENT == 'development' ? 'less' : 'css',
  'media'  => ENVIRONMENT == 'development' ? 'text/less' : 'text/css',
  'rel'    => ENVIRONMENT == 'development' ? 'stylesheet/less' : 'stylesheet',
];

$desktop_image_id = $_GET['d'] ?: null;

$host_name = $_SERVER['HTTP_HOST'];

$is_mac =
  preg_match('/Mac/', $_SERVER['HTTP_USER_AGENT']);

$is_chrome =
  preg_match('/Chrome/', $_SERVER['HTTP_USER_AGENT']);

$is_ohsnap =
  preg_match('/ohsnap\.io/', $host_name);

include '../templates/index.php';
exit;
