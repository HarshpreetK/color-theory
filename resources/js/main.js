/**
  Author: Harshpreet Kaur
  Date: October 09,2018
  Description: This program sets up the environment of a match game using javascript and Jquery. Everytime a user reloads, it resets the environment.
  Input: User matches the colors, no keydown events allowed
  Output: if matches and all matches finish, winner; Else try again.
*/

/*New game begins
var NewGame = {};

$(document).ready(function(){
  var $game = $('#game');
  var setGame =  NewGame.getRandomColor();
  NewGame.renderCards(setGame, $game);
});


NewGame.getRandomColor = function(){
  All color values
  var colors = [];

  var allColors = [
    'yellow', 'green', 'blue', 'red', 'purple', 'orange'
  ];

  colors.push(allColors);
  colors.push(allColors);

    var randomColors = [];

    while(colors.length > 0){
      var randomIndex = $('.card').each(function() {
          $(this).css('background-color', colors[Math.floor(Math.random() * colors.length)]);
      });
      var randomIndex = Math.floor(Math.random()*colors.length);
      var randomColor = colors.splice(randomIndex, 1)[0];
      randomColors.push(randomColor);
    }
    return randomColors;
  };

    Converts card values to jQuery card objects and adds them to the supplied game
    object.
    Generates and returns an array of matching card values.

NewGame.renderCards = function(randomColors, $game){
  var renderColors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  $game.empty();
  $game.data('flippedCards', []);

  for (var colorsIndex = 0; colorsIndex < randomColors.length; colorsIndex++){
    var allColors = randomColors[colorsIndex];
    var color = renderColors[allColors - 1];
    var data = {
      allColors: allColors,
      color: color,
      isFlipped: false
    };

    var $cardElement = $('<div class="row">'
      +'<div class="col-lg-2 card"></div>'
      +'<div class="col-lg-2 card"></div>'
      +'<div class="col-lg-2 card"></div>'
      +'<div class="col-lg-2 card"></div>'
      +'<div class="col-lg-2 card"></div>'
      +'<div class="col-lg-2 card"></div>'
    +'</div>');
    $cardElement.data(data);
    $game.append($cardElement);
  }

  $('.card').click(function(){
    NewGame.flipCard($(this), $('#game'));
  });
};


check if a card is flipped and matches
  NewGame.flipCard = function($card, $game){
    if($card.data('isFlipped')){
      return;
    }
    $card.css('background-color', $card.data('color'))
    .text($card.data('colors'))
    .data('isFlipped', true);

    var flippedCards = $game.data('flippedCards');
    flippedCards.push($card);

    if(flippedCards.length === 2){
      if (flippedCards[0].data('colors') === flippedCards[1].data('colors')){
        var matchCss = {
          backgroundColor: '10, 10, 10'
        };
        flippedCards[0].css(matchCss);
        flippedCards[1].css(matchCss);
      } else {
        var card1 = flippedCards[0];
        var card2 = flippedCards[1];
        window.setTimeout (function(){
          card1.css('background-color','rgb(150, 0, 150)')
            .text('')
            .data('isFlipped', false);
          card2.css('background-color', 'rgb(150, 0, 150)')
            .text('')
            .data('isFlipped', false);
          }, 350);
        }

      $game.data('flippedCards', []);
      }
    };*/

    //Used to create a dynamic card array

    var card_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J'];
    var memory_values = [];
    var memory_card_numbers = [];
    var cards_flipped = 0;

    //Shuffle card method
    Array.prototype.memory_cards_shuffle = function(){
        var i = this.length, j, temp;
        while(--i > 0){
            j = Math.floor(Math.random() * (i+1));
            temp = this[j];
            this[j] = this[i];
            this[i] = temp;
        }
    }

    //reset and prepare Game
    function newGame(){
      cards_flipped = 0;
      var output = '';
        card_array.memory_cards_shuffle();
      for(var i = 0; i < card_array.length; i++){
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+card_array[i]+'\')"></div>';
      }
      document.getElementById('memory_board').innerHTML = output;
    }

    //check if card is flipped and matches or not matches
    function memoryFlipTile(tile,val){
      if(tile.innerHTML == "" && memory_values.length < 2){
        tile.style.background = '#FFF';
        tile.innerHTML = val;
        if(memory_values.length == 0){
          memory_values.push(val);
          memory_card_numbers.push(tile.id);
        } else if(memory_values.length == 1){
          memory_values.push(val);
          memory_card_numbers.push(tile.id);
          if(memory_values[0] == memory_values[1]){
            cards_flipped += 2;
            // Clear both arrays
            memory_values = [];
                  memory_card_numbers = [];
            // Check to see if the whole board is cleared
            if(cards_flipped == card_array.length){
              alert("Board cleared... generating new board");
              document.getElementById('memory_board').innerHTML = "";
              newGame();
            }
          } else {
            function flip2Back(){
                // Flip the 2 tiles back over
                var tile_1 = document.getElementById(memory_card_numbers[0]);
                var tile_2 = document.getElementById(memory_card_numbers[1]);
                tile_1.style.background = 'url(./resources/images/rgb.jpg) no-repeat';
                      tile_1.innerHTML = "";
                tile_2.style.background = 'url(./resources/images/rgb.jpg) no-repeat';
                      tile_2.innerHTML = "";
                // Clear both arrays
                memory_values = [];
                      memory_card_numbers = [];
            }
            setTimeout(flip2Back, 700);
          }
        }
      }
    }
