const express= require('express')

const server=express();
const authRouter=require('./auth_router');
const usersRouter=require('./users_router');

const helmet=require('helmet');
const cors=require('cors');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth',authRouter);
server.use('/api/users',usersRouter);

server.get('/', (req,res)=>{
    res.json({message: 'hello from server!'})
})

server.use((error,req,res,next)=>{
    const statusCode=error.statusCode ? error.statusCode : 500;
    res.status(statusCode).json(error.message)
})

module.exports=server;