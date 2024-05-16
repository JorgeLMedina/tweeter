/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Hardcoded objects
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1715651073765
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1715737473765
  }
];

//Returns the how many days ago the tweet was created
function daysAgo(fileTimestamp) {
  const currentDate = new Date();
  const fileDate = new Date(fileTimestamp);
  const differenceInMs = currentDate - fileDate;

  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  return `${differenceInDays} days ago`
}

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
            ${obj.content.text}
          </p>
        </div>
        <footer class="below-tweet">
          <p>
            ${daysAgo(obj.created_at)}
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
    $('.tweet-container').append($tweet);
  }
};

$(document).ready(function () {
  renderTweets(data);
});