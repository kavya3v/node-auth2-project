const usersDb= require('../database/dbConfig');

module.exports={addUser,findBy,getUserById,findUsers}

async function addUser(credentials){
 const [newUserId]= await usersDb("users").insert(credentials)
 const newUser= await getUserById(newUserId)
 return newUser;
}

async function getUserById(userId){
 const user= await usersDb("users").where("id",userId).select("username","id","department")
 return user;
}

async function findBy(username){
    console.log('usrname',username)
    const user= await usersDb("users").where("username",username).first();
    console.log('user',user)
    return user;
}

async function findUsers(department){
    const users= await usersDb("users")
                .select("username","id","department")
                .where("department",department)
    return users;
}