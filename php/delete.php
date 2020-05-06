<?php
// Remote from NG app (on Personal Computer)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST');

if (isset($_GET['filename'])) {
    $target = './img/' . $_GET['folder'] . '/' . $_GET['filename'];
    if (unlink($target)) {
        print json_encode('File ' . $_GET['filename'] . ' has been deleted!');
    }
}
