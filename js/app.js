'use strict'

$(document).ready(function(){
	/*--- Display information modal box ---*/
  	$('.what').click(function(){
    	$('.overlay').fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$('a.close').click(function(){
  		$('.overlay').fadeOut(1000);
  	});

  	$('a.new').click(newGame);

  	$('form').on('submit', function(e) {
  		testGuess();
  		return false;
  	});

  	newGame();


  	var targetNumber;	// Player tries to guess this number (between 1 and 100).
	var guessCount;		// Number of guesses made.
	var previousDifference;	// To determine if player is getting warmer or colder.

	function newGame() {
	// Reset everything.
		setFeedback('Make your Guess!');
		setGuessCount(0);
		$('ul#guessList').empty();
		$('#guessButton').slideDown();
		$('#userGuess').slideDown();
		$('#userGuess').val('').focus();

		previousDifference = null;

		// Pick random #.
		targetNumber = Math.floor(Math.random() * 100 + 1);	// in [1..100]
	}

	function setFeedback(msg) {
		$('h2#feedback').text(msg);
	}

	function setGuessCount(newCount) {
		guessCount = newCount;
		$('span#count').text(guessCount);
	}

	function testGuess() {
		var guess = $('input#userGuess').val();
		$('#userGuess').val('').focus();

		if (!/^\s*\d+\s*$/.test(guess) || guess < 1 || guess > 100) { // Regexp accepts only consecutive numerals.
			alert('Please enter a number between 1 and 100 inclusive.');
			return;
		}

		setGuessCount(guessCount + 1);
		$('ul#guessList').append('<li>' + guess + '</li>');

		var difference = Math.abs(targetNumber - guess);
		var msg = '';
		if (previousDifference !== null) {
			if (difference < previousDifference) {
				msg = ' Getting warmer.'
			} else if (difference > previousDifference) {
				msg = ' Getting colder.'
			}
		}
		if (difference == 0) {
			msg = 'You got it!';
			$('#guessButton').slideUp();
			$('#userGuess').slideUp();
		} else if (difference < 10) {
			msg = 'Very hot!' + msg;
		} else if (difference < 20) {
			msg = 'Hot!' + msg;
		} else if (difference < 30) {
			msg = 'Warm!' + msg;
		} else if (difference < 50) {
			msg = 'Cold!' + msg;
		} else {
			msg = 'Ice cold!' + msg;
		}
		setFeedback(msg);
		previousDifference = difference;
	}

});

