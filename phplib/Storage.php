<?php

require_once 'sdk.class.php';

class Storage {
    const STATUS_OK = 200;
    const BUCKET_NAME = 'images.snapnote.io';

    private $amazonS3 = null;


    public function __construct() {
        $this->amazonS3 = new AmazonS3();
        $this->amazonS3->disable_ssl_verification(false);
        header('Content-type: application/json');
    }

    private function getFilenameForId($id) {
        return wordwrap($id, 2, "/", true).'.png';
    }

    public function postImage() {
      $blob =
        base64_decode(str_replace(' ','+', file_get_contents('php://input')));

      $hash = 'd'.substr(preg_replace('/[^a-zA-Z0-9]/', '', base64_encode(md5($blob, true))), 0, 5);
      return $this->put($hash, $blob);
    }

    public function post() {
      $blob =
        base64_decode(substr(str_replace(' ','+', file_get_contents('php://input')),
          strlen('data:image/png;base64,')));

      $hash = '0'.substr(preg_replace('/[^a-zA-Z0-9]/', '', base64_encode(md5($blob, true))), 0, 5);
      return $this->put($hash, $blob);
    }

    /**
     * Store an object
     */
    public function put($id, $blob) {
        // Don't store anything if we don't have data or if its
        // over 10Mb
        if(strlen($blob) < 1 ||
           strlen($blob) > 10485760) {
             return [
               'status' => 500,
               'id' => $id,
               'success' => false,
             ];
        }

        $filename = $this->getFilenameForId($id);

        $response =
            $this->amazonS3->create_object(self::BUCKET_NAME,
                $filename,
                array('body' => $blob,
                      'contentType' => 'image/png'));

        if($response->status != 200) {
          return [
              'status' => $response->status,
              'id' => $id,
              'success' => false
            ];
        }
        else {
          return [
              'status' => 200,
              'id' => $id,
              'success' => true
            ];
        }
    }
}
