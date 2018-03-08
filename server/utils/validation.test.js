const expect = require("expect");

var {isRealString} = require("./validation");

describe("isRealString", () => {
	it("should reject non string values", () => {
		var string = isRealString(4651);

		expect(string).toBe(false);
	});

	it("should reject string with only spaces", () => {
		var string = isRealString("    ");

		expect(string).toBe(false);
	});

	it("should allow string with non-space characters", () => {
		var string = isRealString("   This is correct");

		expect(string).toBe(true);
	});
});