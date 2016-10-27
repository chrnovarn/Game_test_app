<?php

//Starts the session
session_start();

//Parameter to show the errors
ini_set('display_errors', 'On');

//Including the gameClass
require_once("gameClass.php");

//Instanciate the class
$gameA = new Game();

//Creating the response structure
$jsonencode = array();
$jsonencode["success"] = true;
$jsonencode["data"]=$gameA->getList();

//Storing the game class in a session
$_SESSION['myGame'] = serialize($gameA);

//Sending the response converted in a Json Object
echo json_encode($jsonencode);

?>

