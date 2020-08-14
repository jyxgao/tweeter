$(document).ready(function() {

  $('textarea').keydown(function(event) {
    const charLeft = 139 - $(this).val().length;
    // find class="counter" through traversing the tree, set it to value equal to charLeft
    const counter = $(this).siblings('div').children('.counter');
    counter.text(charLeft);

    // add or remove class="red" if character limit is exceeded
    if (charLeft < 0) {
      counter.addClass('red'); 
    } else if (charLeft >= 0) {
      counter.removeClass('red');
    }
  });  

});