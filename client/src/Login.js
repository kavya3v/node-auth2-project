import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Form,Input,Label,Button,FormGroup} from 'reactstrap';
import axios from 'axios';

function Login(){
const history=useHistory();
const [credentials,setCredentials]=useState({
    username:"",
    password:"",
})

const [loginError,setLoginError]=useState("");

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
    axios.post('http://localhost:8000/api/auth/login',credentials)
    .then(res=>{
        console.log('res in login=',res)
        setLoginError("")
        const token=res.data.token;
        window.localStorage.setItem('token',token);
        const id= res.data.userId
        history.push(`${id}/users`);
    })
    .catch(err=>{
        console.log('error in login',err)
        setLoginError(err.message)
    })
}

return(
    <div>
        <h3>Please Login!</h3>
        <Form className="login" onSubmit={handleSubmit}>
        <FormGroup className="text-left">
        <Label htmlFor="username" className="mt-2 pt-2" >Username</Label>
            <Input name="username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            className="pb-2"
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
 
           <Button color="primary">Login</Button> 
        </Form>
        <p className="error">{loginError}</p>
    </div>
)
}
export default Login;