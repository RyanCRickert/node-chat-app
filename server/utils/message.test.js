const expect = require("expect");

var {generateMessage} = require("./message");
var {generateLocationMessage} = require("./message");

describe("generateMessage", () => {
	it("should generate the correct message object", () => {
		var from = "Bob";
		var text = "Some message";
		var message = generateMessage(from, text);

		expect(typeof message.createdAt).toEqual("number");
		expect(message).toMatchObject({from,text});
	});
});

describe("generateLocationMessage", () => {
	it("should generate the correct location object", () => {
		var from = "Bob";
		var lat = 15;
		var long = 19;
		var url = "https://www.google.com/maps?q=15,19";
		var message = generateLocationMessage(from, lat, long);

		expect(typeof message.createdAt).toEqual("number");
		expect(message).toMatchObject({from, url});
	});
});