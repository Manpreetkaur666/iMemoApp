const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

//ROUTE 1:  Create a user using :POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('email','Enter a valid name').isEmail(),
    body('password','Passwords must be atleast 5 caharacters').isLength({ min: 5 }),
], async(req,res)=>{
    //check errors, if yes return bad request with errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check whether user email exists already.
    try {
        //finf if user already exist
        let user = await User.findOne({email: req.body.email});

        const salt = bcrypt.genSaltSync(10);
        const securePassword = bcrypt.hashSync(req.body.password,salt);

        //create a user if doesn't esists and send a successfull message!.
        if(!user){
                user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
              });
            
            const data = {
                user:{
                    id: user.id
                }
              }
    
              var authToken = jwt.sign(data, JWT_SECRET);
              success = true;
              return res.json({success, authToken})

            // return res.send("You have successfully created your account!")
        }
        
        //return error message if user already exists with status code.
        return res.status(400).json({success: "false", error: "Sorry! user with this email already exists."})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong! Please try Again!")
    }
   
})

/******************************************AUTHENTICATE*********************************************/


//ROUTE 2 : Authenticate the user using :POST "/api/auth/login".
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').exists(),
], async(req,res)=>{
    //check errors, if yes return bad request with errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //using destructring get email and password from user
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
          return res.status(400).json({error: "Please try to login with correct credentials!"})
        }

        //compare user password using bcrypt
        const passwordCompare = bcrypt.compareSync(password, user.password);
        //if password doesn't match throw an error
        if(!passwordCompare){
          success = false;
          return res.status(400).json({success, error: "Please try to login with correct credenrials!"})
        }
        //if password is correct using jWT send the authentication Token
        const data = {
            user:{
                id: user.id
            }
          }
          var authToken = jwt.sign(data, JWT_SECRET);
          success = true;
          return res.json({success, authToken})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong! Please try Again!")
    }
})


/******************************************GET USER DETAILS*********************************************/


//ROUTE 3 : Get details of logged in user :POST "/api/auth/getuser".Login Required

router.post('/getuser',fetchuser, async(req,res)=>{
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
} catch (error) {
    console.error(error.message);
        res.status(500).send("Something went wrong! Please try Again!")
}
})
module.exports = router