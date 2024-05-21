/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const $form = $(".form-inline");

  const $textArea = $('#tweet-text');

  $(".non-valid-tweet-alert").hide();
  $(".no-content-alert").hide();

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Adjust <article class="tweet"> filling it out with the selected object's data.
  const createTweetElement = function (obj) {
    let $tweet = `
  <article class="tweet">
        <header class="tweet-header">
          <div class="tweet-name">
            <img
              src=${obj.user.avatars}
              class="tweet-avatar-image" alt="">
            <p>${obj.user.name}</p>
          </div>
          <p class="tweet-handle">${obj.user.handle}</p>
        </header>
        <div class="div-content">
          <p>
            ${escape(obj.content.text)}
          </p>
        </div>
        <footer class="below-tweet">
          <p>
            ${timeago.format(obj.created_at, 'en_US')}
          </p>
          <div class="tweet-icons">
            <button class="flag-button">
              <i class="fa-solid fa-flag"></i>
            </button>
            <button class="retweet-button">
              <i class="fa-solid fa-retweet"></i>
            </button>
            <button class="heart-button">
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
        </footer>
      </article>
  `

    return $tweet;
  };

  // Loops through tweets, calls createTweetElement for each tweet and takes return value and appends it to the tweets container
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  };

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (data) => {
        console.log(data);
        renderTweets(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadTweets();

  $form.on("submit", (event) => {
    event.preventDefault();



    // Edge cases
    if ($textArea.val().length > 140) {
      // alert('Your post is too long! It should be 140 characters or less.');
      $(".non-valid-tweet-alert").slideDown(500).delay(3000).slideUp(500);
    } else if ($textArea.val().trim().length === 0) {
      console.log($textArea.val().trim());
      // alert('Nothing to post! Post can\'t be blank');
      $(".no-content-alert").slideDown(500).delay(3000).slideUp(500);
    } else {
      // grab data from the form
      const data = $form.serialize();

      // post data to tweet
      $.ajax({
        method: "POST",
        url: '/tweets',
        data: data,
        success: () => {
          console.log('SUCCESS!!!')
          $('.tweet-container').empty();
          $textArea.val('');
          loadTweets();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  });
});