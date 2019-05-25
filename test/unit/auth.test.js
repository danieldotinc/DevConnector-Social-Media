const { User } = require("../../models/user");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  it("should populate req.user with the paylod of a valid JWT", () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      name: "daniel",
      avatar: "https://github.com/danieldotinc.jpg"
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});
