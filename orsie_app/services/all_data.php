<?php


// NEED TO SEND POST OF id

header("Access-Control-Allow-Origin: *");
date_default_timezone_set('America/Toronto');

require_once("./inc/connect_pdo.php");

$query = "SELECT id, a_name
FROM test_data";
//print("$query");
foreach($dbo->query($query) as $row) {
	$id = stripslashes($row["0"]);
	$a_name = stripslashes($row["1"]);
	
	$attendee["id"] = $id;
	$attendee["a_name"] = $a_name;
	
	$attendees[] = $attendee;
}

// $newData["data"] = $attendees;

$data = json_encode($attendees);

header("Content-Type: application/json");

print($data);
?>
