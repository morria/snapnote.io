<?php

$url = 'http://images.snapnote.io/'
  . wordwrap($_GET['id'], 2, '/', true)
  . '.png';

$share_url =
 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

include '../templates/view.php';
