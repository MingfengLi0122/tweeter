// form toggle even listner
$(document).ready(function() {
  $("nav .newTweet").on("click", function() {
    if($("form.tweetSubForm").is(":hidden")) {
        $("form.tweetSubForm").slideDown("slow");
        //add focus function to textarea
        $("form.tweetSubForm").find("#tweet-text").focus();
    } else {
        $("form.tweetSubForm").slideUp("slow");
    }
  });
});
 