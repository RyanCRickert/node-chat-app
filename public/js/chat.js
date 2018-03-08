var socket = io();

function scrollToBottom () {
	//Selectors
	var messages = $("#messages");
	var newMessage = messages.children("li:last-child");
	//Heights
	var clientHeight = messages.prop("clientHeight");
	var scrollTop = messages.prop("scrollTop");
	var scrollHeight = messages.prop("scrollHeight");
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
};

socket.on("connect", function() {
	var params = $.deparam(window.location.search);

	socket.emit("join", params, function (err) {
		if (err) {
			alert(err);
			window.location.href = "/";
		}	else {

		}
	});
});

socket.on("disconnect", function() {
	console.log("Disconnected from server");
});

socket.on("updateUserList", function (users) {
	var ul = $("<ul></ul>");

	users.forEach(function (user) {
		ul.append($("<li></li>").text(user));
	})

	$("#users").html(ul);
})

socket.on("newMessage", function(message) {
	var formattedTime = moment(message.createdAt).format("h:mm a");
	var template = $("#message-template").html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$("#messages").append(html);
	scrollToBottom();
});

socket.on("newLocationMessage", function(message) {
	var formattedTime = moment(message.createdAt).format("h:mm a");
	var template = $("#location-message-template").html();
	var html = Mustache.render(template, {
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	})
	$("#messages").append(html);
	scrollToBottom();
})

$("#message-form").on("submit", function (e) {
	e.preventDefault();

	var messageTextBox = $("[name=message]")

	socket.emit("createMessage", {
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