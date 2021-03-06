/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('.errormsg').hide();
$('form').hide();

$(document).ready(function() {

  // stringify user input before parsing in to prevent XSS
  const escape = function(str) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };

  const createTweetElement = function(tweet) {
    let user = tweet.user;
    let $tweet = `
      <article>
        <header class="tweet">
          <div class="user">
            <img src="${user.avatars}" />
            <h4>${user.name}</h4>
          </div>
          <h4 id="handle">${user.handle}</h4>
        </header>
        <div class="tweet-container">
          <p class="tweet">${escape(tweet.content.text)}</p>
        </div>
        <footer class="tweet">
          <div>${moment(tweet.created_at).fromNow(true)} ago</div>
          <div class=icons>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
    return $tweet;
  };

  const renderTweets = function(tweets) {
    // empty all child nodes to only prepend the new tweet
    $('#tweets-container').empty();
    
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.getJSON('/tweets')
      .then((tweets) => {
        renderTweets(tweets);
      });
  };

  // initial load of all tweets in db
  loadTweets();

  // toggle form arrow to display form and animation
  const toggle = $('#toggleform');
  toggle.on('click', function() {
    $('form').slideDown(400);
  });

  const animateArrow = function() {
    toggle.animate({
      bottom: "-=10"
    }, 1000, function() {
      toggle.animate({
        bottom: "+=10"
      }, 1000, animateArrow());
    });
  };

  animateArrow();

  // ajax post request on successful tweet submission
  const $form = $('#new-tweet-form');
  const $errorMsg = $('.errormsg');

  $form.on('submit', (event) => {
    event.preventDefault();

    const serialized = $form.serialize();
    const $input = $('textarea').val();

    if (!$input) {
      $errorMsg.hide(350);
      $('#emptyfield').slideDown(700);
    } else if ($input.length > 140) {
      $errorMsg.hide(350);
      $('#maxchar').slideDown(700);
    } else {
      $errorMsg.hide(350);
      // empty input field upon submission
      $form.trigger('reset');
      // send post request with query string format
      $.post(`/tweets`, serialized)
        .then(() => {
          loadTweets();
        });
    }
  });
});