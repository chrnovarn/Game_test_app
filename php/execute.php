<?php
session_start();

ini_set('display_errors', 'On');

//Including the gameClass
require_once("gameClass.php");

$gameA = new Game();
$gameA = unserialize($_SESSION['myGame']);

if(!empty($_POST))
{

    //executing the swap method
    //$victory return (true==WIN ||False==NOWIN).
    $victory = $gameA->swapItem($_POST["indexCell"],$_POST["indexAux"]);

    //getting score
    $score = $gameA->getScore();

    //Storing CLASS mygame
    $_SESSION['myGame'] = serialize($gameA);

    //Creating the response structure
    $jsonencode["success"] = true;
    $jsonencode["victory"] = $victory;
    $jsonencode["score"] = $score;
    echo json_encode($jsonencode);
}
else{
    //Creating the response structure
    $jsonencode["success"] = false;
    $jsonencode["victory"] = false;

    //getting score
    $score = $gameA->getScore();
    $jsonencode["score"] = $score;
    $jsonencode["data"] = "SOME ERROR OCCURRED";

    echo json_encode($jsonencode);
}

?>

