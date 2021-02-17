import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Form,Input,Label,Button,FormGroup} from 'reactstrap';
import axios from 'axios';

function Register(){
const history=useHistory();
const [credentials,setCredentials]=useState({
    username:"",
    password:"",
    department:""
})

const handleChange=(e)=>{
    e.persist();
    setCredentials({...credentials,
    [e.target.name]:e.target.value})
}

const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('on submit=',credentials)
    callPost(e);
}

function callPost(e){
    axios.post('http://localhost:8000/api/auth/register',credentials)
    .then(res=>{
        console.log('res in regis=',res)
        //on successful post , store token in local storage and route to users page
        const token=res.data.token;
        window.localStorage.setItem('token',token);
        //grab userid and route to/:id/users
        const id= res.data.data.id
        history.push(`${id}/users`);
    })
    .catch(err=>{
        console.log('error in regis',err)
    })
}

return(
    <>
        <h3>Please Register!</h3>
        <Form className="register" onSubmit={handleSubmit}>
        <FormGroup className="text-left">
        <Label htmlFor="username"  >Username</Label>
            <Input name="username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            />
        </FormGroup>

        <FormGroup className="text-left">
        <Label htmlFor="password">Password</Label>
            <Input name="password"
            type="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            />
        </FormGroup>

        <FormGroup className="text-left">
        <Label htmlFor="department" className="mt-3 mr-3">Department</Label>
           <select name="department"
           id="department"
           value={credentials.department}
           onChange={handleChange}>
                <option value="IT">IT</option>
                <option value="finance">Finance</option>
                <option value="frontdesk">Front Desk</option>
                <option value="architect">Architect</option>
           </select>
           </FormGroup>   
           <Button color="primary">Register!</Button> 
        </Form>
    </>
)
}
export default Register;