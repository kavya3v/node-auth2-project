const jwt=require('jsonwebtoken');
const secrets=require('../config/secret');

module.exports={isValid,restricted}

function isValid(user){
    return Boolean(user.username && user.password && typeof user.password === "string");
}

//restricted function - to verify the token from req!!!!
function restricted(req,res,next){
//grab the token from req header - to be in the Authorization token
console.log('auth in restricted=',req.headers.authorization);
const token=req.headers?.authorization?.split(" ")[1]; //gets rid of bearer space
if(token){
  //verify against the secret - with the third param as call back that gives error and decodedToken
  jwt.verify(token,secrets.jwtSecret,(err,decodedToken)=>{
    if(err){
      res.status(401).json({message:"auth error! you can't touch!"})
    }else{//authorized user! here
      //save the decoded token in request - for other functions
      req.decodedJWT=decodedToken;
      next()
    }
 })
}else{
  res.status(401).json({message: "Auth Error ! You can't pass!"})   
 }
}