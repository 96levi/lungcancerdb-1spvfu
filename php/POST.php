<?php
// Remote from NG app (on Personal Computer)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST');

//fetch.php
include_once('s.php');
$data = json_decode(file_get_contents('php://input')); // array contain keys and value
$sttIndex = 'stt';
switch ($_GET['action']) {
    case 'READ':
        if (isset($_GET['stt'])) {
            READ_SQL_STT($_GET['table'], $_GET['stt']);
        } else {
            READ_SQL($_GET['table']);
        }
        break;
    case 'ADD':
        if (isset($data->$sttIndex)) {
            ADD_NEW_RECORD($_GET['table'], $data);
        } else {
            RETURN_NEW_STT($_GET['table']);
        }
        break;
    case 'RETURN_RECORD':
        RETURN_NEW_RECORD($_GET['table']);
        break;
    case 'GET_RECORD':
        # code...
        break;
    case 'GET_DAY_CLINIC':
        RETURN_DAY_CLINIC($_GET['table'], $_GET['stt']);
        break;
    case 'GET_DAY_WORKUP':
        RETURN_DAY_WORKUP($_GET['table'], $_GET['stt'], $_GET['dayHos']);
        break;
    case 'READ_PRE_CLINIC':
        RETURN_PRE_CLINIC($_GET['table'], $_GET['stt'], $_GET['dateHos']);
        break;
    case 'CHANGE':
        RETURN_CHANGE($_GET['table'], $data);
        break;
    case 'GET_WORKUP_DATA':
        if (isset($_GET['date'])) {
            RETURN_PRE_WORKUP_DATA($_GET['table'], $_GET['stt'], $_GET['dateHos'], $_GET['date']);
        } else {
            RETURN_NEW_RECORD($_GET['table']);
        }
        break;
    case 'READ_IMAGE':
        RETURN_IMAGE($_GET['folder'], $_GET['stt'], $_GET['dateHos'], $_GET['date']);
        break;
    case 'CHECK_WORKUP':
        CHECK_WORKUP($_GET['table'], $_GET['stt'], $_GET['dateHos']);
        break;
    case 'GET_ALL_CLINIC':
        GET_ALL_CLINIC($_GET['stt'], $_GET['date0'], $_GET['date1']);
        break;

    default:
        # code...
        break;
}
