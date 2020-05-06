<?php

function GET_ALL_CLINIC($stt, $date0, $date1)
{
    include_once('connection.php');
    $query = 'SELECT dateHos FROM dz_clinic WHERE stt=' . $stt . ' AND dateHos >= ' . $date0 . ' AND dateHos <= ' . $date1 . ';';
    $result = mysqli_query($mysqli, $query);
    $res = [];
    while ($a =  mysqli_fetch_object($result)) {
        array_push($res, $a);
    };
    print json_encode($res);
}

function CHECK_WORKUP($table, $stt, $dateHos)
{
    include_once('connection.php');
    $query = 'SELECT * FROM dz_' . $table . ' WHERE stt=' . $stt . ' AND dateHos=' . $dateHos . ';';
    $result = mysqli_fetch_object(mysqli_query($mysqli, $query));
    print json_encode($result);
}

function RETURN_IMAGE($folder, $stt, $dateHos, $date)
{
    include_once('connection.php');
    $query = 'SELECT * FROM dz_image WHERE stt=' . $stt . ' AND dateHos=' . $dateHos . ' AND date=' . $date . ' AND folder="' . $folder . '";';
    $result = mysqli_fetch_object(mysqli_query($mysqli, $query));
    if ($result) {
        print json_encode($result);
    } else {
        $query1 = 'SELECT @record := MAX(record)+1 FROM dz_image';
        $newStt = mysqli_fetch_array(mysqli_query($mysqli, $query1));
        print json_encode($newStt[0]);
    }
}
function READ_SQL($table)
{
    include_once('connection.php');
    $query = 'SELECT * FROM dz_' . $_GET['table'] . ';';
    $mysql_result = mysqli_query($mysqli, $query);
    $data = [];
    while ($fetchData = mysqli_fetch_object($mysql_result)) {
        array_push($data, $fetchData);
    };
    print json_encode($data);
}

function READ_SQL_STT($table, $stt)
{
    include_once('connection.php');
    $query = 'SELECT * FROM dz_' . $table . ' WHERE stt=' . $stt . ';';
    $result = mysqli_fetch_object(mysqli_query($mysqli, $query));
    print json_encode($result);
}

function RETURN_NEW_STT($table)
{
    include_once('connection.php');
    $query = 'SELECT @stt := MAX(stt)+1 FROM dz_' . $table;
    $newStt = mysqli_fetch_array(mysqli_query($mysqli, $query));
    print json_encode($newStt[0]);
}

function RETURN_PRE_WORKUP_DATA($table, $stt, $dateHos, $date)
{
    include_once('connection.php');
    $query = 'SELECT * FROM dz_' . $table . ' WHERE stt=' . $stt . ' AND dateHos=' . $dateHos . ' AND date=' . $date . ';';
    $mysql_result = mysqli_query($mysqli, $query);
    $fetchData = mysqli_fetch_object($mysql_result);
    print json_encode($fetchData);
}

function RETURN_PRE_CLINIC($table, $stt, $dateHos)
{
    include_once('connection.php');
    $query = 'SELECT * FROM dz_' . $table . ' WHERE stt=' . $stt . ' AND dateHos=' . $dateHos . ';';
    $mysql_result = mysqli_query($mysqli, $query);
    $fetchData = mysqli_fetch_object($mysql_result);
    print json_encode($fetchData);
}

function RETURN_DAY_CLINIC($table, $stt)
{
    include_once('connection.php');
    $FinalResult = [];
    $query = 'SELECT dateHos FROM dz_' . $table . ' WHERE stt= ' . $stt . ';';
    $result = mysqli_query($mysqli, $query);
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($FinalResult, $row);
    }
    print json_encode($FinalResult);
}

function RETURN_DAY_WORKUP($table, $stt, $dateHos)
{
    include_once('connection.php');
    $FinalResult = [];
    $query = 'SELECT date FROM dz_' . $table . ' WHERE stt= ' . $stt . ' AND dateHos=' . $dateHos . ';';
    $result = mysqli_query($mysqli, $query);
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($FinalResult, $row);
    }
    print json_encode($FinalResult);
}

function RETURN_NEW_RECORD($table)
{

    include_once('connection.php');
    $query = 'SELECT @record := MAX(record)+1 FROM dz_' . $table;
    $newRecord = mysqli_fetch_array(mysqli_query($mysqli, $query));
    print json_encode($newRecord[0]);
}

function ADD_NEW_RECORD($table, $data)
{
    include_once('connection.php');
    $queryBody = ConvertSQL($data);
    $query = 'INSERT INTO dz_' . $table . ' (' . $queryBody['keys'] . ') VALUES (' . $queryBody['values'] . ');';
    mysqli_query($mysqli, $query);
}


function RETURN_CHANGE($table, $data)
{
    include_once('connection.php');
    $record = 'record';
    $queryBody = ConvertSQL_CHANGE($data);
    $query = 'UPDATE dz_' . $table . ' SET ' . $queryBody . ' WHERE dz_' . $table . '.record=' . $data->$record . ';';
    mysqli_query($mysqli, $query);
}

function ConvertSQL($data)
{
    $result = array();
    $result['keys'] = array();
    $result['values'] = array();
    foreach ($data as $key => $value) {
        array_push($result['keys'], $key);
        $myString = '"' . $value . '"';
        array_push($result['values'], $myString);
    }

    $row = ["keys" => '', "values" => ''];
    $row['keys'] = implode(',', $result['keys']);
    $row['values'] = implode(',', $result['values']);
    return $row;
}

function ConvertSQL_CHANGE($data)
{
    $res = array();
    $res['keys'] = array();
    $res['values'] = array();
    foreach ($data as $key => $value) {
        array_push($res['keys'], $key);
        $myString = '"' . $value . '"';
        array_push($res['values'], $myString);
    }
    $row = array_combine($res['keys'], $res['values']);
    $result = array();
    foreach ($row as $key => $value) {
        array_push($result, $key . '=' . $value);
    }

    return implode(',', $result);
}
/* Return MySQL data to JSON type
function ReturnSQL($mysqli, $query)
{
    $myArray = array();
    if ($result = mysqli_query($mysqli, $query)) {
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $myArray[] = $row;
        }
        echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
    }
}

function SubmitQuery($table, $action, $data)
{
    include('connection.php');
    $queryBody = ConvertSQL($data);
    $query;
    if ($action == 'ADD') {
        // Tips: implode() — Join array elements with a strin
        $query = 'INSERT INTO ' . $table . ' (' . $queryBody['keys'] . ') VALUES (' . $queryBody['values'] . ');';
    } else {
        $queryBody = ConvertSQL_CHANGE($data);
        $stt = "stt"; // select stt from $data ($data->$stt)
        $query = 'UPDATE '.$table.' SET '.$queryBody.' WHERE '.$table.'.stt='.$data->$stt.';';
    }
    echo $query;

    mysqli_query($mysqli, $query);
}

function SubmitQueryHos($table, $action, $data)
{
    include('connection.php');
    $queryBody = ConvertSQL($data);
    $query;
    if ($action == 'ADD') {
        // Tips: implode() — Join array elements with a strin
        $query = 'INSERT INTO ' . $table . ' (' . $queryBody['keys'] . ') VALUES (' . $queryBody['values'] . ');';
    } else {
        $queryBody = ConvertSQL_CHANGE($data);
        $record = 'record'; // select stt from $data ($data->$stt)
        $query = 'UPDATE '.$table.' SET '.$queryBody.' WHERE '.$table.'.record='.$data->$record.';';
    }
    mysqli_query($mysqli, $query);
}

function InsertQuery($table, $data)
{
    include('connection.php');
    $query1 = 'SELECT @stt := MAX(record)+1 FROM ' . $table;
    echo $query1;
    $newRecord = mysqli_fetch_array(mysqli_query($mysqli, $query1)); // use as $newRecord[0]
    $queryBody = ConvertSQL($data);
    // Tips: implode() — Join array elements with a strin
    $query = 'INSERT INTO ' . $table . ' (record,' . $queryBody['keys'] . ') VALUES ("' . $newRecord[0] . '",' . $queryBody['values'] . ');';
    print json_encode($query);
}


function ReturnSelectDate($stt, $table)
{
    $result = [];
    include('connection.php');
    $query = 'SELECT dateHos FROM ' . $table . ' WHERE stt = ' . $stt . ';';
    $mysqli_result = mysqli_query($mysqli, $query);
    while ($fetchData = mysqli_fetch_object($mysqli_result)) {
        array_push($result, $fetchData);
    };
    print json_encode($result);
}

function DeleteQuery()
{
}

// To covert data object -> SQL query for ADD action
function ConvertSQL($data)
{
    $result = array();
    $result['keys'] = array();
    $result['values'] = array();
    foreach ($data as $key => $value) {
        array_push($result['keys'], $key);
        $myString = '"' . $value . '"';
        array_push($result['values'], $myString);
    }

    $row = ["keys" => '', "values" => ''];
    $row['keys'] = implode(',', $result['keys']);
    $row['values'] = implode(',', $result['values']);
    return $row;
}

// To covert data object -> SQL query for CHANGE action
function ConvertSQL_CHANGE($data)
{
    $res = array();
    $res['keys'] = array();
    $res['values'] = array();
    foreach ($data as $key => $value) {
        array_push($res['keys'], $key);
        $myString = '"' . $value . '"';
        array_push($res['values'], $myString);
    }
    $row = array_combine($res['keys'], $res['values']);
    $result = array();
    foreach ($row as $key => $value) {
        array_push($result, $key . '=' . $value);
    }

    return implode(',', $result);
}
*/
