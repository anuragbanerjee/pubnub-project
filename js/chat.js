// var name = prompt("What's your name?");
var name = username;
$("#current_user").text("Logged in as: " + username);

function publishChatMessage(message) {
    if (message == undefined || message == null) {
        return;
    }

    var publishConfig = {
        channel : "chat-prod",
        message : {
            username: username,
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

// chat listener
pubnub.addListener({
    status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
            console.log("connected");
        }
    },
    message: function(message) {
        var new_message = $("<span />");
        new_message.addClass("message");
        if (message.publisher == username) {
            new_message.addClass("outgoing");
        } else {
            new_message.addClass("incoming");
            notify({
                title: message.message.username,
                body: message.message.text
            });
        }
        new_message.html("<small>" + message.message.username + "</small><br>" + message.message.text);
        var message_container = $("<div/>").append(new_message);
        $("#message-list").append(message_container);
        $('#message-list').scrollTop($('#message-list')[0].scrollHeight);
    },
    presence: function(presenceEvent) {
        // if (presenceEvent.occupancy == 1) {
        //     $("header").text("1 person here");
        // } else {
        //     $("header").text(presenceEvent.occupancy + " people here");
        // }
        // console.log('presence event came in: ', presenceEvent)
    }
});

pubnub.hereNow(
    {
        channels: ["chat-prod"]
    },
    function (status, response) {
        if (response.totalOccupancy == 1) {
            $("header").text("1 person here");
        } else {
            $("header").text(response.totalOccupancy + " people here");
        }
    }
);

pubnub.subscribe({
    channels: ['chat-prod'],
    withPresence: true
});

$("#message-input").on("keypress", function (e) {
    if (e.which == 13) {
        publishChatMessage($("#message-input").val());
        $("#message-input").val("");
    }
})