$(document).ready(function() {

  const charCount = function(event) {

    const charLeft = 140 - $(this).val().length;
    // find class="counter" through traversing the tree, set it to value equal to charLeft
    const counter = $(this).siblings('div').children('.counter');
    counter.text(charLeft);

    // add or remove class="red" if character limit is exceeded
    if (charLeft < 0) {
      counter.addClass('red');
      $('.counter').text(charLeft);
    } else if (charLeft >= 0) {
      counter.removeClass('red');
      $('.counter').text(charLeft);
    }
  }

  $('textarea').keyup(charCount);
  $('textarea').on('input', charCount);

  $('form').submit(function() {
    const charLeft = 140 - $('textarea').val().length;
    $('.counter').text(charLeft);
  })
});