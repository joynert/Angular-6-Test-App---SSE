<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function sendMsg($id, $msg) {
	echo "id: $id" . PHP_EOL;
	echo "data: $msg" . PHP_EOL;
	echo PHP_EOL;
	ob_flush();
	flush();
}

$serverTime = time();

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "POST") { 
	$data = json_decode(file_get_contents('php://input'))->data;
	$movie = $data->movieID;
	sendMsg($serverTime, 'Movie added to fav' );

}else{
	sendMsg($serverTime, 'server time: ' . date("h:i:s", time()) );
}

?>