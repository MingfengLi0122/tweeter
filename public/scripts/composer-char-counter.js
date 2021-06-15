/* set the counter to detect left characters */
$(document).ready(function() {
  const input = document.querySelector("input");
  $("#tweet-text").on("input", function(e) {
    let chars = $(this).val().length;
    let charsLeft = 140 - chars;
    let counter = $(this).parent().next("div").children(".counter").text(charsLeft);
    if (charsLeft < 0) {
      counter.addClass("redText");
    } else {
      counter.removeClass("redText");
    }
  })
});