$(document).ready(function() {
  playGame();
  function playGame() {

















//create alphabet
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

//create words for guesses

	var choosenWord = ['bagpipes', 'dwarves', 'dog', 'love', 'dance', 'swing', 'banjo', 'scientist', 'fireworks', 'flag', 'picnic', 'happy', 'fruit', 'salt', 'scotch', 'dig', 'candy', 'cash', 'heart', 'art', 'hot', 'short', 'charter', 'orchestra', 'table'];

//choose word randomly	

	var selectedWord = Math.floor(math.random() * choosenWord.length);
		console.log(choosenWord)
//create underscores based on word length


	

