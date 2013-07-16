<?php
require_once('../phplib/Storage.php');

header('Access-Control-Allow-Methods', 'POST');
header('Access-Control-Allow-Origin', 'http://snapnote.io');

$response =
  (new Storage())->postImage();

print 'http://snapnote.io/'.$response['id'];
exit;
