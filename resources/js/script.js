// Card data
const cardColorsArray = [{
    'name': 'orange',
    'img': './resources/images/orange.png',
  },
  {
    'name': 'pink',
    'img': './resources/images/pink.png',
  },
  {
    'name': 'cyan',
    'img': './resources/images/cyan.png',
  },
  {
    'name': 'blue',
    'img': './resources/images/blue.png',
  },
  {
    'name': 'red',
    'img': './resources/images/red.png',
  },
  {
    'name': 'green',
    'img': './resources/images/green.png',
  },
  {
    'name': 'magenta',
    'img': './resources/images/magenta.png',
  },
  {
    'name': 'brown',
    'img': './resources/images/brown.png',
  },
  {
    'name': 'yellow',
    'img': './resources/images/yellow.png',
  },
  {
    'name': 'lime',
    'img': './resources/images/lime.png',
  },
  {
    'name': 'gray',
    'img': './resources/images/gray.png',
  },
  {
    'name': 'violet',
    'img': './resources/images/violet.png',
  },
];

//use concatenation to appens the same array to the cardColorsArray twice
var gameGrid = cardColorsArray.concat(cardColorsArray).sort(function () {
  return 0.5 - Math.random();
});

//initialize variables
var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

//append section element to the html doc
var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

//loop through all images and shuffle
gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;

//apply css styles to all elements
  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

//check if the card matches
var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

//reset the game
var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

//On click event, if colors match, then apply .selected to the div else rotate back
grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
