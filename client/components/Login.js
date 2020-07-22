import React, { useState} from 'react';
import {
    Modal as Mod,
    Button,
    Form,
    Col
} from 'react-bootstrap';

import { loginUser } from '../api';

const Login = ({ setToken, setShow, setIsUserLoggedIn, user, setUser }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = event => setUsername(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)

    const handleSubmit = async (event) => {
        
        event.preventDefault();

        try {
            
            const data  = await loginUser({username, password});  

            console.log(data);
    
            setIsUserLoggedIn(true); 
            localStorage.setItem("token", data.token);
            setUser( data.user );
            setToken( data.token );
            console.log(user);
            setUsername("");
            setPassword("");
            setShow(false); 
        
        } catch (error) {

            console.log(error.message);
        }
            
    }

    return (

            <>
            <Mod.Header closeButton>
                <Mod.Title>Login</Mod.Title>
            </Mod.Header>
            <Mod.Body>
            <Form>
                <Form.Row>
                <Form.Group as = {Col}>
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control 
                      placeholder="Enter username"
                      onChange={handleUsernameChange}
                      value={username}
                    />
                </Form.Group>
                <Form.Group as = {Col}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                       type="password"
                       placeholder="Password"
                       onChange={handlePasswordChange}
                       value={password}
                       />
                </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
                </Button>
            </Form>
            </Mod.Body>
            </>

    );
}

export default Login;   