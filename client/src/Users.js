import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import UserCard from './UserCard';
import {axiosWithAuth} from './utils/axiosWithAuth';

function Users(){
 const [users,setUsers]=useState([]);
 console.log('users=',users);
 useEffect(()=>{
    axiosWithAuth().get('http://localhost:8000/api/users/')
    .then(res=>{
        console.log('res in get=',res)
        setUsers(res.data)
    })
    .catch(err=>{
        console.log('error in get',err)
    })

 },[])

return(
    <div>
        <h3>Welcome Users!</h3>
    {users.length=== 0 ? "Please wait..." : 
    users.map(item=> <UserCard key={item.id} user={item}/>)
    }        
    </div>
)
}
export default Users;