$(document).ready(function () {
  //null start to create condition that the game starts when typing starts instead of when the page loads
  let start = null;

  const sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate",
  ];

  //sentences
  let sentenceIndex = 0;
  //letters
  let letterIndex = 0;
  // sentence letter in each sentence...maybe***
  let letter = sentences[sentenceIndex][letterIndex];
  //variable created for div id="sentence"
  const sentencediv = $("#sentence");
  //variable created to reference array position
  let displaysentence = sentences[0];
  //variable created to count errors in the game
  errorcount = 0;
  //used to set up the first sentence when the page loads.
  //also used within the keypress function to change to the next sentence.

  //nextSentence();

  sentencediv.append(sentences[0]);

  //what happens when typing starts
  $(document).keypress(function (e) {
    if (start === null) {
      // redefines the start time of the game to the time when typing started.
      start = $.now();
    }
    //moves the yellow block div left 17.5px (Thanks Amanda)
    // sentence letter in each sentence
    //increases letter count to move along to the next expected letter.

    $("#yellow-block").css("left", "+=17.5px");
    $("#target-letter").text(letter);
    letter = sentences[sentenceIndex][letterIndex];
    loggamestate();

    if (e.key === letter) {
      letterIndex++;
      //alert("it matches");
      // adds a span with a glyphicon (bootstrap) check mark for a matching letter.
      $("#feedback").append(
        "<span class= 'glyphicon glyphicon-ok-circle'></span>"
      );
    } else {
      letterIndex++;
      //alert("it doesn't match");
      //some process as above, but red X glyphicon for not matching a letter.
      $("#feedback").append(
        "<span class= 'glyphicon glyphicon-remove-circle'></span>"
      );
      //increase errorcount
      errorcount++;
    }

    //Sentences
    //sets condition for sentences to change. Array and displaysentence are ===.
    if (letterIndex === displaysentence.length) {
      //move to the next index position of the sentenceArray
      sentenceIndex++;
      letterIndex = 0;
    }

    if (sentenceIndex == 5) {
      endGame();
    } else {
      //clears the #sentence div(used variable) when the array reaches [5] and then reset the yellow block
      sentencediv.empty();
      displaysentence = sentences[sentenceIndex];
      // reset at the end of the sentenceArray.
      nextSentence();
      $("#yellow-block").css("left", "15px");
      letter = sentences[sentenceIndex][letterIndex];
      $("#target-letter").text(letter);
      $("#feedback").empty();
    }
  });

  loggamestate();
  function loggamestate() {
    console.log({ sentenceIndex, letterIndex, letter });
  }

  function endGame() {
    //clear out all text and prepare to points to display
    alert("Game Over, let's see how you did.");
    $("#feedback").empty();
    $("#target-letter").empty();
    let end = $.now();
    end;

    //.join(' ') joins an array of strings into 1 string with a space between each item
    // .split(' ') removes the argument (a space in this case) and returns the array index excluding the spaces.
    //.length returns the length of the modified array.
    // dynamic code allows for any amount of array items to use the same equation.
    let wordcount = sentences.join(" ").split(" ").length;
    // point logic broken down into minutes to calculate words per minute.
    let wordspm = (wordcount * (end - start)) / 1000 / 60 - 2 * errorcount;

    //points message and button to reset game
    $("#feedback").append(
      "<span>" + "Points:" + wordspm + "words per minute" + "</span>",
      '<button id= "reset">Reset</button>'
    );
    $("#reset").click(function () {
      //reloads whole document.
      location.reload();
    });
  }

  function nextSentence() {
    sentencediv.append(sentences[sentenceIndex]);
    $("#target-letter").text(letter);
  }

  $("#keyboard-upper-container").hide();
  //Uppercase keyboard and show() on shiftKey down
  $(document).keydown(function (e) {
    //shiftKey has its own built in jQuery reference/property, nice to know.
    if (e.shiftKey == true) {
      $("#keyboard-upper-container").show();
      $("#keyboard-lower-container").hide();
    }
  });
  // Uppercase keyboard hide() and  on shiftKey up
  $(document).keyup(function (e) {
    //shiftKey has its own built in jQuery reference/property, nice to know.
    if (e.shiftKey == false) {
      $("#keyboard-lower-container").show();
      $("#keyboard-upper-container").hide();
    }
  });
});

//console.log($.now());

$(document).keypress(function (e) {
  // defines what key is pressed and applies the matching id. (e.which)
  let $keystroke = $("#" + e.which);
  //highlight pressed key
  $($keystroke).css("background-color", "yellow");

  //remove highlight on keyup
  $(document).keyup(function () {
    $($keystroke).css("background-color", "#f5f5f5");
  });
});
