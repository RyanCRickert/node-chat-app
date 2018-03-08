const expect = require("expect");

var {Users} = require("./users");

describe("Users", () => {
	var users;

	beforeEach(() => {	
		users = new Users();
		users.users = [{
			id: "1",
			name: "Bob",
			room: "example"
		}, {
			id: "2",
			name: "Bobby",
			room: "example2"
		}, {
			id: "3",
			name: "Bobbie",
			room: "example"
		}]
	})


	it("should add new user", () => {
		var users = new Users();
		var user = {
			id: "123",
			name: "Ryan",
			room: "Wow"
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it("should remove a user", () => {
		var remove = users.removeUser("2");

		expect(remove.id).toEqual("2");
		expect(users.users.length).toBe(2);
	});

	it("should not remove a user", () => {
		var remove = users.removeUser("6");

		expect(remove).toBeFalsy();
		expect(users.users.length).toBe(3);
	});

	it("should find a user", () => {
		var user = users.getUser("1");

		expect(user.id).toEqual("1");
	});

	it("should not find a user", () => {
		var user = users.getUser("5");

		expect(user).toBeFalsy();
	});

	it("should return names for example course", () => {
		var userList = users.getUserList("example");

		expect(userList).toEqual(["Bob", "Bobbie"]);
	});

	it("should return names for example2 course", () => {
		var userList = users.getUserList("example2");

		expect(userList).toEqual(["Bobby"]);
	});
});