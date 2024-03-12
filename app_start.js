// Notifications

window.onload = function(){
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
  }

//Button selector link to Notifications

const button = document.querySelector ("button")

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
