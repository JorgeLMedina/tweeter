$(document).ready(function () {
  function updateCounter() {
    let charCurrent = $(this).val().length;
    let charMaxNumber = 140;
    let charRemaining = charMaxNumber - charCurrent;
    $('.counter').text(charRemaining);

    if (charRemaining < 0) {
      $('.counter').addClass('negative');
    } else {
      $('.counter').removeClass('negative');
    }
  }

  $("#tweet-text").on("input", updateCounter);
});