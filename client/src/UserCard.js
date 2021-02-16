import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Card, CardTitle, CardBody} from 'reactstrap';

function UserCard({user}){
    
return(
    <div>
        <Card>
            <CardTitle>UserName: {user.username}</CardTitle>
            <CardBody>Department: {user.department}</CardBody>
        </Card> 
    </div>
)
}
export default UserCard;