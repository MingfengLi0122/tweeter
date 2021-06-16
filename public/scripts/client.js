/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  //append array of tweets data into the tweetes
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
        <span class="handle">${tweet.user.handle}</span>
      </header>
        <p>${tweet.content.text}</p>
      <footer>
          <span class="time">${timeago.format(tweet.created_at)}</span>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>  
      </footer>
    </article>  
    `);
    return $tweet;
  }
  renderTweets(data)

  $("form.tweetSubForm").on("submit", function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize()
    })
    .catch((err) => {
      console.log("Error message: ", err);
    })
  })
});

