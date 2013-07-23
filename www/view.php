<?php
require_once '../environment.php';

$css = [
  'suffix' => ENVIRONMENT == 'development' ? 'less' : 'css',
  'media'  => ENVIRONMENT == 'development' ? 'text/less' : 'text/css',
  'rel'    => ENVIRONMENT == 'development' ? 'stylesheet/less' : 'stylesheet',
];

$url = 'http://images.snapnote.io/'
  . wordwrap($_GET['id'], 2, '/', true)
  . '.png';

$share_url =
 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

$is_mac =
  preg_match('/Mac/', $_SERVER['HTTP_USER_AGENT']);

include '../templates/view.php';
