<?php

header("Access-Control-Allow-Origin: *");
require_once("./inc/connect_pdo.php");

$search_text = $_POST["search-text"];
$event_name = $_POST["event_name"];

$query = "SELECT id, a_name, organization_name, guest_type, email
FROM test_data 
WHERE id NOT IN (SELECT id from test_sign_in 
	WHERE sign_in_status = 1 AND event_name = '$event_name') 
AND (a_name LIKE '%$search_text%'
OR email LIKE '%$search_text%')
ORDER BY a_name";

//print("$query");

foreach($dbo->query($query) as $row) {
	$id = stripslashes($row["0"]);
	$a_name = stripslashes($row["1"]);
	$organization_name = stripslashes($row["2"]);
	$guest_type = stripslashes($row["3"]);
	$email = stripslashes($row["4"]);
	
	$attendee["id"] = $id;
	$attendee["a_name"] = $a_name;
	$attendee["organization_name"] = $organization_name;
	$attendee["guest_type"] = $guest_type;
	$attendee["email"] = $email;
	
	$attendees[] = $attendee;
}

ksort($attendees);

$data = json_encode($attendees);

header("Content-Type: application/json");

print($data);
?>