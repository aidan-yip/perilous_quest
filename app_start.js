// Notifications

window.onload = function(){
    Notification.requestPermission(). then (perm => {
      if (perm === "granted") {
        new Notification("Perilous Quest", {
          body: "For the best in game experience please use a desktop",
          icon: "homescreen192.png",
          tag: "desktop",
          vibrate: [200, 100, 200], 
        })
      }
  })
  }

const button = document.querySelector ("button")

button.addEventListener("click", () => {
    Notification.requestPermission(). then (perm => {
        if (perm === "granted") {
          new Notification("Perilous Quest", {
            body: "For the best in game experience please use a desktop",
            icon: "homescreen192.png", 
            tag: "desktop",
            vibrate: [200, 100, 200], 
          })
        }
    })
})

let notification

document.addEventListener ("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      notification = new Notification ("Perilous Quest", { 
        body: "Perilous Quest is still running. To stop the audio close the app/webpage",
        icon: "homescreen192.png",
        tag: "Come Back",
      })
    } else {
        notification.close()
    }

})
