<?php
require_once('../phplib/Storage.php');

header('Access-Control-Allow-Methods', 'POST');
header('Access-Control-Allow-Origin', 'http://snapnote.io');

(new Storage())->post();
