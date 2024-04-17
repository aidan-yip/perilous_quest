// Clock

function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if(hh == 0){
      hh = 12;
  }
  if(hh > 12){
      hh = hh - 12;
      session = "PM";
   }

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
   ss = (ss < 10) ? "0" + ss : ss;
    
   let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("clock").innerText = time; 
  let t = setTimeout(function(){ currentTime() }, 1000);
}

currentTime();

// Date

const date = new Date();
const dateWithoutTime = date.toDateString();

    document.getElementById("date").innerHTML = "Hey there! Today is " + dateWithoutTime;


// Notifications


//Button selector link to Notifications

const button = document.getElementById("startbutton")

button.addEventListener("click", () => {
    Notification.requestPermission(). then (perm => {
        if (perm === "granted") {
          new Notification("Game Alert", {
            body: "For the best in game experience please use a desktop",
            icon: "./public/icons/homescreen192.png", 
            tag: "desktop",
            vibrate: [200, 100, 200], 
          })
        }
    })
})

//Music Alert trigger when window not focused

let notification

document.addEventListener ("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      notification = new Notification ("Music Alert", { 
        body: "Perilous Quest is still running. To stop the audio close the app",
        icon: "./public/icons/homescreen192.png",
        tag: "Come Back",
      })
    } else {
        notification.close()
    }

})  

//Click to start button

    function visitPage(){
        window.location='./public/perilous_quest/index.html';
    }

//Share button

const shareData = {
  title: "Perilous Quest",
  text: "Share Perilous Quest with a friend!",
  url: "https://perilous-quest.netlify.app",
};

const btn = document.getElementById("sharebutton");
const resultPara = document.querySelector(".result");

// Share must be triggered by "user activation"

btn.addEventListener("click", async () => {
  try {
    await navigator.share(shareData);
  } catch (err) {
    alert("Share button not supported");
  }
});

//Cursor trail

(function($) {

  var baseCssClass = "cursor-trail",
      addPoint = function(pageX, pageY, cssClass, timeToGrow, timeToShrink, scale) {
          // Create a new point located at the mouse position
          var point = $("<div>", {
              "class": cssClass,
              css: {
                  left: pageX,
                  top: pageY
              }
          }).appendTo('body');

          // now make the point grow, then shrink and finally disappear
          point
              .transition({ scale: scale }, timeToGrow)
              .transition({ scale: 1 }, timeToShrink, function() { point.remove(); });
      };

  $.fn.cursorTrail = function(options) {
      // assign defaults for those options not supplied
      options = $.extend({
          timeToGrow: 200,
          timeToShrink: 200,
          scale: 1,
          "class": ""
      }, options);

      // add the base css class all cursor trail points need.
      var actualCssClass = baseCssClass;
      if (options["class"]) {
          actualCssClass += " " + options["class"];
      }

      return this.bind("mousemove", function(ev) {
          addPoint(ev.pageX, ev.pageY, actualCssClass, options.timeToGrow, options.timeToShrink, options.scale);
      });
  };
}(jQuery));

// jQuery.transit has a bug in older IE versions, so switch to jQuery animate
if (!$.support.transition) {
  $.fn.transition = $.fn.animate;
}

$("#background").cursorTrail({
  "class": "yellow-trail"
});


