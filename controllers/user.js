const User = require('../models/User');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHnadler = require('../err_utils/errorHandler');

module.exports.login = async (req, res)=>{
  const conditate = await User.findOne({email:req.body.email});
  if(conditate){
    //there is user
    const passwordRezult = bcrypt.compareSync(req.body.password, conditate.password);
    if(passwordRezult){
      //the password is matching hash codes
      const token = jwt.sign({
        email:conditate.email,
        userId:conditate._id,
        role: conditate.role,
      }, 'secret_key', {expiresIn: 60*60}); //1 hour
      res.status(200).json({
        token: `Bearer ${token}`,
        conditate// th rule to send token to front
      });
    } else {
      res.status(401).json({
        message:"the pasword not matching"
      });
    }
  } else {
    //no user whith that
    res.status(404).json({
      message: 'there is no user with such email'
    });
  }
}

module.exports.register = async function (req,res){
  const conditate = await User.findOne({email:req.body.email});
  if(conditate){
    //there is user with that email
    res.status(409).json({
      message:"try another email its busy"
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      username: req.body.username,
      email:req.body.email,
      password: bcrypt.hashSync(password, salt) // when save in database save in hash
    });
    try{
      await user.save();
      const token = jwt.sign({
        email: user.email,
        userId: user._id,
        role: user.role,
      }, 'secret_key', {expiresIn: 60*60});
      res.status(201).json({
        user,
        token: `Bearer ${token}`,
      });
    } catch(e){
      errorHnadler(res, e);
    }
  }
}
