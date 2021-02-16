const router=require('express').Router();
const bcryptjs=require('bcryptjs')
const {addUser,findBy}=require('./users_model');
const jwt=require('jsonwebtoken');
const secrets=require('../config/secret');
const {isValid, restricted}= require('./middleware');

router.get('/',(req,res)=>{
    res.send('hiii from auth router')
})

//register request -> hash password and update db
router.post('/register', async (req,res,next)=>{
    const credentials= req.body
    if (isValid(credentials)){
    //if valid credentials
    //get rounds frm env variable
    const rounds= process.env.BCRYPT_ROUNDS || 8;
    //hash password and set value
    const hash= bcryptjs.hashSync(credentials.password,rounds);
    credentials.password=hash;
    
    try {
      //add user to db
      const [registeredUser]= await addUser(credentials) 
      const token=generateToken(registeredUser); 
      res.status(201).json({message: "Register Success",data: registeredUser,token})
    } catch (err) {
       next(err)
    }
    }else{
        res.status(400).json({message: "Please provide username and alphanumeric password"})
    }
    
})
//login request-hashCompare in restrict middleware to confirm password match
router.post('/login', async(req,res,next)=>{
try {
    const {username,password}=req.body;
    const user= await findBy(username)
    if (user && bcryptjs.compareSync(password,user.password)){
        const token=generateToken(user); 
        res.status(200).json({message: `welcome ${user.username}`,userId:user.id,token})
    }else{
        res.status(401).json({message:"You shall not pass!,Invalid Credentials"})
    }
} catch (err) {
    next(err)
}
})

router.get('/logout',(req,res)=>{
    if(req?.headers?.authorization){
        //how to logout when using token
         req.decodedJWT="";
         res.status(200).json({message: "you are logged out"})
    }else{
        res.end();
    }
})

function generateToken(user){
   //has claims and info about user obj (or watever you want !) 
   const payload= {
       subject:user.id,
       username:user.username,
       department:user.department,
   }

   const options={
    expiresIn:"1h" //token expired in
    }

    //generate signature with payload,options and secret
   const secret= secrets.jwtSecret;
   return jwt.sign(payload,secret,options)
}

 
module.exports=router;