const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public", )
var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

var {generateMessage} = require("./utils/message");

app.use(express.static(publicPath));

io.on("connection", (socket) => {
	console.log("New user connected");
	var user = "New user";

	socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat, please be respectful"))

	socket.broadcast.emit("newMessage", generateMessage("Admin", `${user} joined`));

	socket.on("createMessage", (message) => {
		io.emit("newMessage", {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});

	});

	socket.on("disconnect", () => {
		console.log("User disconnected from server");
	});
})

server.listen(port, () => {
	console.log(`Started on port ${port}`);
})

module.exports = {app};