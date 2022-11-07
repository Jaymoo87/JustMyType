$('document').ready(function (){
    //null start to create condition that the game starts when typing starts instead of when the page loads 
    let start = null;
    
    const sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
                     'Too ato too nOt enot one totA not anot tOO aNot',
                     'oat itain oat tain nate eate tea anne inant nean',
                    'itant eate anot eat nato inate eat anot tain eat',
                    'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    //sentences
    let sentenceArray = 0;
    //letters
    let sentenceLetter = 0;
    // sentence letter in each sentence...maybe***
    let letter = sentences[sentenceArray][sentenceLetter];
    //variable created for div id="sentence"
   const sentencediv = $('#sentence');
   //variable created to reference array position
   let displaysentence = sentences[0];
    //variable created to count errors in the game
   errorcount = 0;



    //what happens when typing starts
   $(document).keypress(function (e) {
        
    if (start){

        start = $.now()
    }

       let letter = sentences[sentenceArray][sentenceLetter];
   
        if (e.key === letter) {

            sentenceLetter++;

            $('#target-letter').text(letter);
            //moves the yellow block div left 17.5px
            $('#yellow-block').css('left', '+=17.5');
            // adds a span with a glyphicon (bootstrap) check mark for a matching letter.
            $('#feeback').append('<span> class= "glyphicon glyphicon-ok-circle"></span>')
        
        
        } else {
            //some process as above, but red X glyphicon for not matching a letter.
            sentenceLetter++;
            $('#target-letter').text(letter);
            $('#yellow-block').css('left', '+=17.5');
            $('#feeback').append('<span> class= "glyphicon glyphicon-remove-circle"></span>')
            //increase errorcount
            errorcount++;

        };

        
    });


    $('#keyboard-upper-container').hide();
    //Uppercase keyboard and show() on shiftKey down
    $(document).keydown(function(e){
        //shiftKey has its own built in jQuery reference/property, nice to know.
        if (e.shiftKey == true) {
            $('#keyboard-upper-container').show();
            $('#keyboard-lower-container').hide();
        

}; 

});
   // Uppercase keyboard hide() and  on shiftKey up
   $(document).keyup(function(e){
        //shiftKey has its own built in jQuery reference/property, nice to know.
       if (e.shiftKey == false) {
           $('#keyboard-lower-container').show();
           $('#keyboard-upper-container').hide();
       };
       
      }); 
});

console.log($.now());

$(document).keypress(function (e) {
    // defines what key is pressed and applies the matching id. (e.which)
    let $keystroke = $("#" + e.which);
    //highlight pressed key
    $($keystroke).css("background-color", "yellow");
    
    //remove highlight on keyup
    $(document).keyup(function (e) {
       
        $($keystroke).css("background-color", "#f5f5f5");
    });
});

let end = $.now()