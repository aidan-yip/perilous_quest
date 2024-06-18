// Offline Alert

window.addEventListener("offline", function (event) {
  alert("You're offline please reconnect to Wi-Fi to play Perilous Quest.");
});

//Cursor trail

(function ($) {
  var baseCssClass = "cursor-trail",
    addPoint = function (
      pageX,
      pageY,
      cssClass,
      timeToGrow,
      timeToShrink,
      scale
    ) {
      // Create a new point located at the mouse position
      var point = $("<div>", {
        class: cssClass,
        css: {
          left: pageX,
          top: pageY,
        },
      }).appendTo("body");

      // now make the point grow, then shrink and finally disappear
      point
        .transition({ scale: scale }, timeToGrow)
        .transition({ scale: 1 }, timeToShrink, function () {
          point.remove();
        });
    };

  $.fn.cursorTrail = function (options) {
    // assign defaults for those options not supplied
    options = $.extend(
      {
        timeToGrow: 200,
        timeToShrink: 200,
        scale: 1,
        class: "",
      },
      options
    );

    // add the base css class all cursor trail points need.
    var actualCssClass = baseCssClass;
    if (options["class"]) {
      actualCssClass += " " + options["class"];
    }

    return this.bind("mousemove", function (ev) {
      addPoint(
        ev.pageX,
        ev.pageY,
        actualCssClass,
        options.timeToGrow,
        options.timeToShrink,
        options.scale
      );
    });
  };
})(jQuery);

// jQuery.transit has a bug in older IE versions, so switch to jQuery animate
if (!$.support.transition) {
  $.fn.transition = $.fn.animate;
}

$("#background").cursorTrail({
  class: "blue-trail",
});

//Navbar

window.onscroll = function () {
  scrollFunction();
  play_art();
};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.getElementById("navbar").style.backgroundColor = "#00000080";
  } else {
    document.getElementById("navbar").style.backgroundColor = "transparent";
  }
}

//Play art music

function play_art() {
  let art = document.getElementById("art");
  art.play();
  console.log("Played art");
}

//Mobile menu

const list_menu = document.getElementById("list_menu");
const menu_button = document.getElementById("menu_button");
const menu_button_span = document.getElementById("menu_button_span");

menu_button.onclick = show_menu;

function show_menu() {
  if (list_menu.style.display === "flex") {
    list_menu.style.display = "none";
    menu_button_span.innerText = "menu";
    menu_button.setAttribute("title", "Menu");
  } else {
    list_menu.style.display = "flex";
    menu_button_span.innerText = "close";
    menu_button.setAttribute("title", "Close");
  }
}

//Info alert

const info_alert = document.getElementById("info_alert");

info_alert.onclick = info_pop;

function info_pop() {
  alert(
    "Perilous Quest" +
      "\n\n" +
      "Version 1.0.0" +
      "\n\n" +
      "(Beta build 9.9.0-2024)" +
      "\n\n" +
      "Copyright © 2024 Aidan Yip. All rights reserved."
  );
}
