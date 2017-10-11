$(document).ready(function() {
  playGame();
  function playGame() {
    var wordList = ["bedrock", "biome", "block", "cobblestone", "crafting", "crafting table", "creeper", "diamond", "dungeon", "emerald", "the end", "ender dragon", "enderman", "farming", "furnace", "inventory", "lapis lazuli", "mining", "mobs", "mojang", "nether", "obsidian", "overworld", "pickaxe", "portal", "redstone", "skeleton", "smelting", "spawn point", "spider", "spider jockey", "stronghold", "temple", "tools", "witch", "wither", "zombie", "zombie pigmen"];
    var wrongGuessImgs = ["assets/images/half-creeper.png", "assets/images/full-creeper.png", "assets/images/full-creeper-flash.png", "assets/images/full-creeper-flash.png", "assets/images/full-creeper-flash.png", "assets/images/full-creeper-flash.png"]
    var userGuess;
    var wrongGuessNum = -1;
    var guesses = [];
    var blankWord= [];
    var remainingGuesses = 6;
    var gameOver = false;
    var testWord = wordList[Math.floor(Math.random() * wordList.length)];
    var blankWordFill = document.getElementById("word");
    var instruction = document.getElementById("message");

    instruction.innerHTML = ("");

    blankWordFill.innerHTML = "";
    $("#letters-guessed").text("");
    $("#creeper").attr("src", "");

    // Converts the word to blank spaces so the player has to guess
    for (var i = 0; i < testWord.length; i++) {
      if (testWord[i] === " ") {
        console.log("D");
        blankWord.push("&nbsp");
        blankWordFill.innerHTML += " " + blankWord[i] + " ";
      } else {
        console.log("E");
        blankWord.push("_");
        blankWordFill.innerHTML += " " + blankWord[i] + " ";
      }
    }
    $("#numGuessRemain").text(remainingGuesses);

      // Checks and tracks which letters have been guessed
      function previousGuesses() {
        if (guesses.indexOf(userGuess) < 0) {
            guesses.push(userGuess);
          $("#letters-guessed").append(" " + userGuess.toUpperCase() + " ");
        }

      };

      function userTakesAGuess() {
        
          // Checks if the guessed letter is in the word.
          if (testWord.indexOf(userGuess) < 0) { // Letter is not in the word(s)
            console.log("A");
            if (guesses.indexOf(userGuess) < 0) { // If letter already guessed, skip this(do nothing)
              wrongGuessNum += 1;
              $("#creeper").attr("src", wrongGuessImgs[wrongGuessNum]);
              if (wrongGuessNum >= 1 && wrongGuessNum < (wrongGuessImgs.length-1)) {
                setTimeout(function() {
                  $("#creeper").attr("src", "assets/images/full-creeper.png");
                }, 1000);
              }
              remainingGuesses -= 1;
            }
            $("#numGuessRemain").text(remainingGuesses);
          } else {
            for (var l = 0; l<testWord.length; l++) {
              console.log("B");
              if (testWord[l] === userGuess) {
                console.log("C");
                blankWord[l] = testWord[l];
                var blankLetterFill = "";
                for (var j=0; j<blankWord.length; j++){
                  if (blankWord[j] === "&nbsp") {
                    console.log("G")
                    blankLetterFill += " " + blankWord[j] + " ";
                  } else {
                    blankLetterFill += " " + blankWord[j].toUpperCase() + " ";
                  }
                }
                blankWordFill.innerHTML = blankLetterFill;
              }
            }
            if (wrongGuessNum >= 1) {
              $("#creeper").attr("src", "assets/images/hurt-creeper.png");
              if (!(blankWord.indexOf("_") < 0)) {
                setTimeout(function() {
                  $("#creeper").attr("src", "assets/images/full-creeper.png");
                }, 500);
              }
            }
          }
        
      };

    document.onkeyup = function(event) {
        userGuess = event.key;
        console.log(event.keyCode);
        // Need another If for the game over
        if (!gameOver) {
          // Checks that the keypress is an alpha
          if ((event.keyCode > 64 && event.keyCode < 91) || // upper alpha (A-Z)
            (event.keyCode > 96 && event.keyCode < 123)) { // lower alpha (a-z))
          userTakesAGuess();
          previousGuesses();
          }
        }
        if (blankWord.indexOf("_") < 0) {
          instruction.innerHTML = ("YOU WIN!!<br>Press space to play again.");
          if (!gameOver && wrongGuessNum >= 1) {
            $("#creeper").attr("src", "assets/images/dead-creeper.png");
            setTimeout(function() {
              $("#creeper").attr("src", "assets/images/gunpowder.png");
            }, 1000);
          }
          gameOver = true;
          if (userGuess === " ") {
            playGame();
          }
        } else if (remainingGuesses === 0) {
          blankWordFill.innerHTML = "";
          for (var i = 0; i < testWord.length; i++) {
            if (testWord[i] === " ") {
              blankWordFill.innerHTML += " &nbsp ";
            } else {
              blankWordFill.innerHTML += " " + testWord[i].toUpperCase() + " ";
            }
          }
          instruction.innerHTML = ("You lose. :(<br>Press space to play again.");
          if (!gameOver) {
            var audioElement = document.createElement("audio");
            audioElement.setAttribute("src", "assets/sounds/creeper-sound.mp3");
            audioElement.play();
            setTimeout(function() {
              $("#creeper").attr("src", "assets/images/full-creeper.png");
              setTimeout(function() {
                $("#creeper").attr("src", "assets/images/full-creeper-flash.png");
                setTimeout(function() {
                  $("#creeper").attr("src", "assets/images/full-creeper.png");
                  setTimeout(function() {
                    $("#creeper").attr("src", "assets/images/creeper-explode.png");
                  }, 900);
                }, 900);
              }, 900);
            }, 900);
          }
          gameOver = true;
          if (userGuess === " ") {
            playGame();
          }
        }
      };

     
    };
       window.addEventListener('resize', function(){
        $(".hanged-inner").css("height", $(".game-inner").height());
      }, true);
  
});