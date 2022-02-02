$(document).ready(function () {
  $.ajax({
    url: "images.json",
    dataType: "json",
    success: function (response) {
      const set = new Set();
      while (set.size < response.length) {
        set.add(Math.floor(Math.random() * response.length));
      }
      let images_arr = [];
      for (let i = 0; i < response.length; i++) {
        images_arr.push(response[[...set][i]]);
      }
      $.each(images_arr, function (index, value) {
        $("#game_container").append(
          '<div class="item">' +
            '<img class="game-image rounded border border-2 border-dark" src=' +
            value.url +
            ">" +
            '<img class="game-start-image rounded border border-2 border-dark" src="./images/memorygame.jpg">' +
            "</div>"
        );
      });
      $(".game-image").css("display", "none");
    },
  });
  let move_counter = $("#move_counter");
  let move_counter_text = move_counter.text();
  move_counter_text = 0;
  move_counter.text(0);
  let counter = 0;
  let first_chosen_card;
  let second_chosen_card;
  let NoCardsMatch = function (first_chosen_card, second_chosen_card) {
    first_chosen_card.css("display", "none");
    second_chosen_card.css("display", "none");
    first_chosen_card.next("img").css("display", "block");
    second_chosen_card.next("img").css("display", "block");
    counter = 0;
    first_chosen_card;
    second_chosen_card;
  };
  let MatchCardCheck = function (first_chosen_card, second_chosen_card) {
    if (first_chosen_card.attr("src") === second_chosen_card.attr("src")) {
      first_chosen_card.css("display", "block");
      second_chosen_card.css("display", "block");
      counter = 0;
      first_chosen_card;
      second_chosen_card;
    } else {
      setTimeout(() => {
        NoCardsMatch(first_chosen_card, second_chosen_card);
      }, 200);
    }
  };
  let ChosenCardFunc = function (chosen_card) {
    if (counter === 1) {
      first_chosen_card = chosen_card;
    }
    if (counter === 2) {
      second_chosen_card = chosen_card;
      MatchCardCheck(first_chosen_card, second_chosen_card);
    }
  };
  $(document).on("click", ".game-start-image", function () {
    $(this).css("display", "none");
    $(this).prev("img").css("display", "block");
    let chosen_card = $(this).prev("img");
    counter++;
    ChosenCardFunc(chosen_card);
    move_counter_text = move_counter_text + 1;
    move_counter.text(move_counter_text);
  });

  $(document).on("click", "#btn_reset", function () {
    $("#game_container").find(".game-start-image").css("display", "block");
    $("#game_container").find(".game-image").css("display", "none");
    move_counter.text(0);
    move_counter_text = 0;
  });
});
