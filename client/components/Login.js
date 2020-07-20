import React, { useState} from 'react';
import {
    Modal as Mod,
    Button,
    Form
} from 'react-bootstrap';

import { loginUser } from '../api';

const Login = ({ setShow, setIsUserLoggedIn, user, setUser }) => {
    console.log("login", user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = event => setUsername(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        console.log("submit hit");

        const data  = await loginUser({username, password});  

        if (data.token) {
          
            setIsUserLoggedIn(true); 
            localStorage.setItem("token", data.token);
            setUser( data.user );

            setUsername("");
            setPassword("");
            setShow(false); 
        
        } else {
            // login error
        }
    }

    return (

            <>
            <Mod.Header closeButton>
                <Mod.Title>Login</Mod.Title>
            </Mod.Header>
            <Mod.Body>
            <Form>
                <Form.Group>
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control 
                      placeholder="Enter username"
                      onChange={handleUsernameChange}
                      value={username}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                       type="password"
                       placeholder="Password"
                       onChange={handlePasswordChange}
                       value={password}
                       />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
                </Button>
            </Form>
            </Mod.Body>
            </>

    );
}

export default Login;   