const User = require('../models/User');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHnadler = require('../err_utils/errorHandler');

module.exports.login = async (req, res)=>{

  const conditate = await User.findOne({userEmail:req.body.userEmail});
  if(conditate){
    //there is user
    const passwordRezult = bcrypt.compareSync(req.body.userPassword, conditate.userPassword);
    if(passwordRezult){
      //the password is matching hash codes
      const token = jwt.sign({
        userEmail:conditate.userEmail,
        userId:conditate._id,
        role: conditate.role,
      }, 'secret_key', {expiresIn: 60*600}); //1 hour
      res.status(200).json({
        token: `Bearer ${token}`,
        role: conditate.role
        // th rule to send token to front
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

module.exports.register = async (req,res) => {
  const conditate = await User.findOne({userEmail:req.body.userEmail});
  console.log(conditate, 'uuuuuuuuuuuuuuu');
  if(conditate){
    //there is user with that email
    res.status(409).json({
      message:"try another email its busy"
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const userPassword = req.body.userPassword;
    const user = new User({
      userName: req.body.userName,
      userEmail:req.body.userEmail,
      userPassword: bcrypt.hashSync(userPassword, salt) // when save in database save in hash
    });
    try{
      await user.save();
      const token = jwt.sign({
        userEmail: user.userEmail,
        userId: user._id,
        role: user.role,
      }, 'secret_key', {expiresIn: 60*60});
      res.status(201).json({
        token: `Bearer ${token}`,
        role: user.role
      });
    } catch(e){
      errorHnadler(res, e);
    }
  }
}

module.exports.getAllUsers = async function(req, res){
  try {
    const data = await User.findAsync({}, {userName:1, userEmail:1, role:1});
    res.status(201).json(data);
  } catch (e) {
    errorHnadler(res, e);
    }
}

module.exports.getAllUsers = async function(req, res){
  try {
    const data = await User.findAsync({}, {userName:1, userEmail:1, role:1});
    res.status(201).json(data);
  } catch (e) {
    errorHnadler(res, e);
    }
}


module.exports.getUsersLimitbyStr = async function(req, res){
  console.log(req.body);
  try {

  } catch (e) {
    errorHandler(res, e);
  }
}
