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
      }, 'secret_key', {expiresIn: 60*60}); //1 hour
      res.status(200).json({
        token: `Bearer ${token}`,
        userId: conditate._id,
        userName: conditate.userName,
        userEmail: conditate.userEmail,
        role: conditate.role
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
  const conditate = await User.findOne({userEmail:req.body.userEmail});
  if(req.body.userPassword !==req.body.userPasswordConfirm){
    res.status(409).json({
      message: "the password and Comfirm password daesn't matching"
    });
  } else if(conditate){
    //there is user with that email
    res.status(409).json({
      message:"try another email its busy"
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.userPassword;
    const user = new User({
      userName: req.body.userName,
      userEmail:req.body.userEmail,
      userPassword: bcrypt.hashSync(password, salt) // when save in database save in hash
    });
    try{
      await user.save();
      const token = jwt.sign({
        userEmail: user.email,
        userId: user._id,
        role: user.role,
      }, 'secret_key', {expiresIn: 60*60});
      res.status(201).json({
        token: `Bearer ${token}`,
        userId: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        role: user.role
      });
    } catch(e){
      errorHnadler(res, e);
    }
  }
}
