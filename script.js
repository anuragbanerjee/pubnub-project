pubnub = new PubNub({
    publishKey : 'pub-c-eb044979-c8ac-4355-b4ab-2ea14e9b767d',
    subscribeKey : 'sub-c-7c1c7364-dacc-11e6-b6b1-02ee2ddab7fe'
})

var name = prompt("What's your name?");

function publishMessage(message) {
    if (message == undefined) {
        message = "Hello world!"
    }

    var publishConfig = {
        channel : "chat",
        message : {
            username: name,
            text: message
        },
    }

    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
        if (status.error == false) {
            console.log("Published successfully: " + message);
        }
    })
}

pubnub.addListener({
    status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
            // publishMessage(prompt());
        }
    },
    message: function(message) {
        $("h1").html(message.message.username + ": " + message.message.text);
        console.log("New Message!!", message);
    },
    presence: function(presenceEvent) {
        // handle presence
    }
})
console.log("Subscribing..");
pubnub.subscribe({
    channels: ['chat']
});

$("body").on("click", function () {
    publishMessage(prompt())
})