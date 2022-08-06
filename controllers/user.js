const User = require("../models/user")
const {validationResult} = require('express-validator')
const user = require("../models/user")
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')


exports.signup = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg
    })
  }

  const user = new User(req.body)
  user.save((err, user) => {
    if(err) {
      return res.status(400).json({
        error: "Unable to add user......."
      })
    }

    return res.json({
      message: "Success...............",
      user
    })
  })
}


exports.signin = (req, res) => {
  const {email, password} = req.body

  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "Email was not found........."
      })
    }

    // Authenticate user
    if(!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match........."
      })
    }

    // Create token
    const token = jwt.sign({_id: user._id}, process.env.SECRET)

    // Put token in cookie
    res.cookie('token', token, {expire: new Date() + 1})

    // Send response
    const {_id, name,email} = user
    return res.json({
      token,
      user: {
        _id,
        name,
        email
      }
    })
    
  })
}

// get all users details

exports.getAllUserData=async(req,res,next)=>{
  const users=await User.find({})
  res.status(200).json({
      data:users
  })
}

// get user details by id

exports.getUserDatabyID = async (req, res, next) => {
  try {
   const id = req.params.id;
   const user = await User.findById(id);
   if (!user) return next(new Error('User does not exist'));
    res.status(200).json({
    data: user
   });
  } catch (error) {
   next(error)
  }
 }

// get user details by id and update


exports.getUserDatabyIDandUpdate=(req,res)=>{
    let data = {
        name : req.body.name,
        Email: req.body.Email,
        Password:req.body.Password
    }
    User.findByIdAndUpdate(req.params.id,data).then(result=>{
        if(!result){
            res.status('404').json({
                message:'cannot get data by id to update'
            })
        }else{
            res.status('200').json(result)
        }
    }).catch(err => console.log(err))
}

// get user  by id and delete


exports.getUserDatabyIdandDelete=(req,res)=>{
    User.findByIdAndDelete(req.params.id).then(result=>{
        if(!result){
            res.status('404').json({
                message:"cannot find data by id to delete"
            })
        }else{
            res.status('200').json({
                message:"deleted selected data succesfullyy"
            })
        }
        })
    
}



exports.signout = (req, res) => {
  res.clearCookie("token")
  return res.json({
    message: "User signout successfull........"
  })
}