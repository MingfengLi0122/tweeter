$(document).ready(function() {
  //append array of tweets data into the #tweets-container
  const renderTweets = function(data) {
    $("#tweets-container").empty();
    for (const tweet of data) {
      const tweetElement = createTweetElement(tweet);
      $("#tweets-container").prepend(tweetElement);
    }
  }
  //set tweet object in database to tweet articles in HTML
  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="userName">
        <img src="${escape(tweet.user.avatars)}">
        <span>${escape(tweet.user.name)}</span>
        </div>
        <span class="handle"><b>${escape(tweet.user.handle)}</b></span>
      </header>
         <p><b>${escape(tweet.content.text)}</b></p>
      <footer>
          <span class="time"><b>${escape(timeago.format(tweet.created_at))}</b></span>
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
      return $(".errorMessage").text("🥵  Your tweet is empty. 🥵 ").slideDown("slow").css("display", "flex");
    }
    if ($("#tweet-text").val().length > 140) {
      return $(".errorMessage").text("🥵  Your tweet is toooooo long. 🥵 ").slideDown("slow").css("display", "flex");;
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
  // slideup the error message when user starts typing
  $("form.tweetSubForm").on("keydown", function(event) {
    $(".errorMessage").slideUp("slow");
  })
  //prevent malicous input by implementing escape function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  loadTweets();
});

