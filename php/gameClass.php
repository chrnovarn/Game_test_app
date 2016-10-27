<?php
ini_set('display_errors', 'On');
class Game {

	private $listaScore = array();	//LIST OF RANDOM ELEMENTS
	private $score ;		//SCORE IN GAME



	// CONTRUCTOR OF THE CLASS
    public function __construct(){
        $this->listaScore= $this->generateRandom();
        $this->score=100;
     }

	 // CHECKING IF THE ELEMENTS ARE IN THE PERFECT POSITION TO FINSIH GAME
     public function check(){
		 // Check if the list is completly sorted
          for($a=0;$a < 25;$a++){
              if($this->listaScore[$a] != ($a+1) ){
                  return false;
				 }
		  }
		  return true;
     }
     // GENERATE A LIST OF 25 RANDOM NUMBERS
     public function generateRandom(){
         $numbers = range(1, 25);
         shuffle($numbers);

         // To make agile the testing
         /*
         for($a=0;$a < 23;$a++){
             $numbers[$a]=($a+1);
         }
         $numbers[24]=24;
         $numbers[23]=25;
         */
         return $numbers;
     }
	 // RESTART THE GAME
     public function getScore(){
		 return $this->score;
     }
	 // GET THE LIST
	 public function getList(){

		 return $this->listaScore;
	 }
	 // SWAP 2 POSITIONS OF THE LIST
	 public function swapItem($elem_a,$elem_b){
		 /* Storing the first selected element in a temporal variable*/
		$temp=$this->listaScore[$elem_a];

		/* Swaping the elements in the list*/
		$this->listaScore[$elem_a]=$this->listaScore[$elem_b];
		$this->listaScore[$elem_b]=$temp;
		// decrease de score in 1.
		$this->score = $this->score-1;

        //Check Victor

        return $this->check();
	}

}
?>
