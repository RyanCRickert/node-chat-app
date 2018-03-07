const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public", )
var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
	console.log("New user connected");

	socket.emit("newMessage", {
		from: "Rabid",
		message: "Let's do this",
		createdAt: new Date()
	});

	socket.on("createMessage", (message) => {
		console.log("createMessage", message);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected from server");
	});
})

server.listen(port, () => {
	console.log(`Started on port ${port}`);
})

module.exports = {app};