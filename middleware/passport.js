const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');


const options = {
  jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret_key'
}

module.exports = function(passport){
  passport.use(
    new JwtStrategy(options, async(payload, done)=>{//payloadi mej ynknum e en objecty vorov kazmvac e jwt
      try{
        // jwt.refresh(payload, 3600, options.secretOrKey);
        const user = await User.findById(payload.userId)
        if(user){
          done(null, user);

        } else {
          done(null, false);
        }
      } catch(e) {
        console.log(e);
      }
    })
  )

}
