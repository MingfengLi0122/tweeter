$(document).ready(function(){
  //append array of tweets data into the #tweets-container
  const renderTweets = function(data) {
    $("#tweets-container").empty();
    for (let tweet of data) {
      let tweetElement = createTweetElement(tweet);
      $("#tweets-container").prepend(tweetElement);
    }
  }
  //set tweet object in database to tweet articles in HTML
  const createTweetElement = function(tweet) {
    let $tweet = $(`
    <article class="tweet">
      <header>
        <div class="userName">
        <img src="${tweet.user.avatars}">
        <span>${tweet.user.name}</span>
        </div>
        <span class="handle"><b>${tweet.user.handle}</b></span>
      </header>
        <p><b>${tweet.content.text}</b></p>
      <footer>
          <span class="time"><b>${timeago.format(tweet.created_at)}</b></span>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>  
      </footer>
    </article>  
    `);
    return $tweet;
  }
  // load tweets from the database by get request through AJAX
  const loadTweets = function(data) {
    $.ajax("/tweets", {method: "GET"})
    .then((tweets) => {
      renderTweets(tweets);
    })
    .catch((err) => {
      console.log("Error message:", err);
    })
  }
  // listen to sumbit event and send post request through AJAX to post a new tweet
  $("form.tweetSubForm").on("submit", function(event) {
    event.preventDefault();
    if (!$("#tweet-text").val()) {
      alert("Your tweet can not be empty!");
      return;
    }
    if ($("#tweet-text").val().length > 140) {
      alert("Your tweet exceeds the maximum characters!");
      return;
    } 
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize()
    })
    .then((tweet) => {
      $("#tweet-text").val("");
      $(".counter").val(140);
      loadTweets(tweet);
    })
    .catch((err) => {
      console.log("Error message: ", err);
    })
  })
  loadTweets();
});

