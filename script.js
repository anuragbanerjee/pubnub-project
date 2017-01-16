var username;
if (localStorage.username != undefined) {
    username = localStorage.username;
} else {
    username = prompt("Enter a username");
    localStorage.setItem("username", username);
}

function notify(message) {
  if (message == undefined) {return}
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
    return;
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message.title, {body: message.body});
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message.title, {body: message.body});
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

notify();

pubnub = new PubNub({
    publishKey : 'pub-c-eb044979-c8ac-4355-b4ab-2ea14e9b767d',
    subscribeKey : 'sub-c-7c1c7364-dacc-11e6-b6b1-02ee2ddab7fe',
    uuid: username
})

jQuery.getScript("js/chat.js")