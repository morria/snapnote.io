<?php

require_once 'Bootstrap.php';

use Google\Cloud\Storage\Bucket;
use Google\Cloud\Storage\StorageClient;
use Google\Cloud\Storage\StorageObject;
use Google\Cloud\Core\Exception\ServiceException;

class Storage {
    const STATUS_OK = 200;

    // The name of the bucket to write images to
    private $bucket = null;

    public function __construct() {

        $project_id = getenv("PROJECT_ID");
        $bucket_name = getenv("BUCKET_NAME");

        $options = ['projectId' => $project_id];

        if (getenv('KEY_FILE')) {
            $options['keyFile'] = json_decode(getenv('KEY_FILE'), true);
        }

        $storage = new StorageClient($options);

        $this->bucket = $storage->bucket($bucket_name);
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

      header('Content-type: application/json');
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

        try {
            $object =
                $this->bucket->upload(
                    $blob, [
                        'name' => $filename
                    ]
                );
        } catch (ServiceException $e) {
          header('Content-type: application/json');
          return [
              'status' => 500,
              'success' => false,
              'exception' => (string)$e,
            ];
        }

        header('Content-type: application/json');
        return [
            'status' => 200,
            'id' => $id,
            'success' => true
        ];
    }
}
