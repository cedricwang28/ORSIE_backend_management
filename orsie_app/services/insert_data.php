<?php

header("Access-Control-Allow-Origin: *");
// file with connection to the database
require_once("./inc/connect_pdo.php");
// file for sending email
require_once("./send_mail_template.php");


// grabbing the data from the URL through the get method
$name_last = $_POST["name_last"];
$name_first = $_POST["name_first"];
$email = $_POST["email"];
$organization_name = $_POST["organization_name"];
$guest_type = $_POST["a_type"];
$email_consent = $_POST["consent"];
$city = $_POST["city"];
$province = $_POST["province"];
$event_name = $_POST["event_name"];

// setting default organization name
if ($organization_name == "" && $guest_type != "Guest") {
	$organization_name = "Durham College";
}

if ($guest_type == "Guest" && $email_consent == "") {
	$email_consent = "No";
}

$errorCode["id"] = -1;
$errorCode["message"] = "Service Connected";

$name_last = addslashes($name_last);
$name_first = addslashes($name_first);
$email = addslashes($email);
$organization_name = addslashes($organization_name);
$guest_type = addslashes($guest_type);
$email_consent = addslashes($email_consent);
$city = addslashes($city);
$province = addslashes($province);
$event_name = addslashes($event_name);

$name = $name_first . " " . $name_last;

// query to search for existing entry with same email
$query_search = "SELECT id, a_name
FROM dc_events_data
WHERE email='$email'
AND event_name='$event_name'
ORDER BY a_name";

// counting no of matched entries
$match_found = 0;
foreach($dbo->query($query_search) as $row) {
	$match_found++;
};

$errorCode["match_found"] = $match_found;

// register only if no duplicate entry
if (!$match_found > 0) {
	if (!empty($name_last) && !empty($name_first)) {
		try {
			// the query to insert data
			$query = "INSERT INTO dc_events_data
			SET a_name='$name',
			email='$email',
			organization_name='$organization_name',
			guest_type='$guest_type',
			email_consent='$email_consent',
			city='$city',
			province='$province',
			event_name='$event_name' ";
	
			// executing the query to add the record to the database
			$dbo -> query($query);
			$errorCode["id"] = 0;
			$errorCode["message"] = "Insert Successful: $query";
			
			// sending email
			$email_status = sendMailTemplate($name_first, $name_last, $email);
			$errorCode["email_status"] = $email_status;
		} catch (PDOException $e) {
			$errorCode["id"] = -2;
			$errorCode["message"] = "Insert failed: '$e'";
		}
	} else {
		$errorCode["id"] = 2;
		$errorCode["message"] = "No name sent.";
	}
} else {
	$errorCode["id"] = 3;
	$errorCode["message"] = "Duplicate entry";
}

// creating a variable $data
// converting the array data to JSON using the function
$data = json_encode($errorCode);
header("Content-Type: application/json");
print($data);
?>