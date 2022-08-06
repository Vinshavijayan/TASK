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









exports.getAllUserData = (req,res)=>{
    User.find().then(result =>{
        if(!result){
            res.status('404').json({
                message:"cannot get result"
            })

        }else{
            res.status('200').json(result)
        }
    }).catch(err=>console.log(err))
}




exports.getUserDatabyID= (req,res)=>{
    User.findById(req.params.id).then(result=>{
        if(!result){
            res.status('404').json({
                message:'cannot find data by id'
            })
        }else{
            res.status('200').json(result)
        }
    }).catch(err=>console.log(err))
}




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