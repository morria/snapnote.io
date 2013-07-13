<?php

$url = 'http://images.snapnote.io/'
  . wordwrap($_GET['id'], 2, '/', true)
  . '.png';

include '../templates/view.php';
