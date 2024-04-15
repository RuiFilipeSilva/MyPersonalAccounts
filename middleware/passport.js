const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userSchema = require("../models/users.js");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET, // replace with your secret key
};
module.exports = (passport) =>
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      userSchema.findById(jwt_payload.data._id)
        .then((user) => {
            console.log(user);
          if (user) {
            return done(null, user);
          }
          return done(null, false, { message: "User not found" });
        })
        .catch((err) => {
            console.log(err);
          return done(err, false, { message: "Server error"});
        });
    })
  );
