<?php
require_once '../environment.php';

$css = [
  'suffix' => ENVIRONMENT == 'development' ? 'less' : 'css',
  'media'  => ENVIRONMENT == 'development' ? 'text/less' : 'text/css',
  'rel'    => ENVIRONMENT == 'development' ? 'stylesheet/less' : 'stylesheet',
];

include '../templates/index.php';
exit;
