// Notifications

//Button selector link to Notifications

const button = document.getElementById("startbutton")

button.addEventListener("click", () => {
    Notification.requestPermission(). then (perm => {
        if (perm === "granted") {
          new Notification("Game Alert", {
            body: "For the best in game experience please use a desktop",
            icon: "homescreen192.png", 
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
        body: "Perilous Quest is still running. To stop the audio close the app/webpage",
        icon: "homescreen192.png",
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
    alert("Your browser doesn't support the share button");
  }
});
    
   
