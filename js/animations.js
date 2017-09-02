$(document).ready(function(){
  // Attach timestamps on DOM ready
  $('time.timeago').timeago();

  $('#tweet-submit').hide();
  $('#char-count').hide();

  // Tweet Compose enlarge on click, show tweet-submit and char-count
  $('.tweet-compose').on('click', function(){
    $(this).css('height', '5em');
    $('#tweet-submit').show();
    $('#char-count').show();
  });

  // Stats fadeIn on tweet click
  $('#stream').on('click','.tweet', function(){
    $(this).find('.stats').fadeIn();
  });

  // Tweet Actions, show on mouseenter
  $('#stream').on('mouseenter','.tweet', function(){
    $(this).find('.tweet-actions').css('display','block');
  });
  // Tweet Actions, hide on mouseleave
  $('#stream').on('mouseleave','.tweet', function(){
    $(this).find('.tweet-actions').css('display','none');
  });

  // Set count length to 140
  $('#char-count').text('140');
  // Updates twitter characters on each key press
  $('.tweet-compose').keyup(function(){
    var val = $(this).val().length;
    var charlength = 140 - val;
    $('#char-count').text(charlength);

      if(charlength <= 10){
        $('#char-count').css('color','red');
      }
      if(charlength > 10) {
        $('#char-count').css('color', '#999');
      }
      if(charlength < 0){
        $('#tweet-submit').attr('disabled', 'disabled');
      }
      else if(charlength >= 0) {
        $('#tweet-submit').removeAttr('disabled');
      }
  });

  // Prepend tweet to page on submit click
  $("#tweet-submit").on("click", function() {
      var tweetText = $("textarea.tweet-compose").val();
      // Remove text from tweet compose div
      $("textarea.tweet-compose").val('');
      // Set current time and date
      var date = $.timeago(new Date());
      // Clone current current tweet on page
      var newTweet = $(".tweet:first-of-type").clone();
      // Set new tweet by replacing element values from cloned tweet
      newTweet.find("p.tweet-text").text(tweetText);
      newTweet.find("img.avatar").attr("src", "img/alagoon.jpg");
      newTweet.find(".username").text("@none");
      newTweet.find(".fullname").text("Your Name Here");
      newTweet.find(".time").text(date);
      newTweet.find(".num-retweets, .num-favorites").text("0");
      newTweet.fadeIn();
      $("#stream").prepend(newTweet);
      // Reset count length to 140 and color on page
      $('#char-count').text('140');
      $('#char-count').css('color', '#999');
    });
});
