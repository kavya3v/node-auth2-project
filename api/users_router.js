const router=require('express').Router();
const {restricted} = require('./middleware');
const {findUsers}=require('./users_model');

router.get('/',restricted, async (req,res,next)=>{
    //decodedJWT has the payload in the original token info
    const department= req.decodedJWT.department
    console.log('department=',department)
     try {
         const users= await findUsers(department);
         res.status(200).json(users);
     } catch (err) {
        next(err)
    }
})

module.exports=router;
