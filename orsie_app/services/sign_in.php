<?php

header("Access-Control-Allow-Origin: *");
// file with connection to the database
require_once("./inc/connect_pdo.php");

// grabbing the data from the URL through the get method
$id = $_POST["id"];
$event_name = $_POST["event_name"];

$errorCode["id"] = -1;
$errorCode["message"] = "Service Connected";

$id = addslashes($id);
$event_name = addslashes($event_name);

if (!empty($id)) {
	try {
		$query = "INSERT INTO test_sign_in
		SET id='$id',
		sign_in_status = 1,
		event_name = '$event_name' ";

		// executing the query to update the record from the database
		$dbo -> query($query);
		$errorCode["id"] = 0;
		$errorCode["message"] = "Insert Successful: $query";
	} catch (PDOException $e) {
		$errorCode["id"] = -2;
		$errorCode["message"] = "Insert failed: '$e'";
	}
} else {
	$errorCode["id"] = 2;
	$errorCode["message"] = "No id sent.";
}

// creating a variable $data
// converting the array data to JSON using the function
$data = json_encode($errorCode);
header("Content-Type: application/json");
print($data);

?>