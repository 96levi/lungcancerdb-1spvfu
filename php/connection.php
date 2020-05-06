<?php
// Create connection
$server = "112.213.89.143";
$user = "raisingh_levi";
$password = "elv.Null@";
$dbname = "raisingh_db";

$mysqli =  mysqli_connect($server, $user, $password, $dbname);
if (mysqli_connect_errno()) {
    print json_encode("Failed to connect to MySQL");
    die();
}
?>