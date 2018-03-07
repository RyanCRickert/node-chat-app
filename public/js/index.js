var socket = io();

socket.on("connect", function() {
	console.log("Connected to server");
});

socket.on("disconnect", function() {
	console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
	var formattedTime = moment(message.createdAt).format("h:mm a");
	var li = $("<li></li>");
	li.text(`${message.from} ${formattedTime}: ${message.text}`);

	$("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
	var formattedTime = moment(message.createdAt).format("h:mm a");
	var li = $("<li></li>");
	var a = $("<a target='_blank'>My current location</a>");

	li.text(`${message.from} ${formattedTime}: `);
	a.attr("href", message.url);
	li.append(a);
	$("#messages").append(li);
})

$("#message-form").on("submit", function (e) {
	e.preventDefault();

	var messageTextBox = $("[name=message]")

	socket.emit("createMessage", {
		from: "User",
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val("");
	});
});

var locationButton = $("#send-location-btn")
locationButton.on("click", function () {
	if(!navigator.geolocation) {
		return alert("Geolocation not supported by your browser.");
	}

	locationButton.attr("disabled", "disabled");

	navigator.geolocation.getCurrentPosition(function (position) {
		setTimeout(function(){locationButton.removeAttr("disabled");}, 10000);
		socket.emit("createLocationMessage", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function () {
		setTimeout(function(){locationButton.removeAttr("disabled");}, 10000);
		alert("Unable to fetch location.")
	})
})