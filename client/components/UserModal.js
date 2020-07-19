import React, { useState, useEffect } from 'react';
import {
    Modal as Mod,
    Button,
    Form
} from 'react-bootstrap';

import { loginUser } from '../api';

const token = localStorage.getItem('token');

const UserModal = ({ show, setShow, setIsUserLoggedIn }) => {

    const handleClose = () => setShow(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = event => setUsername(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)

    const handleSubmit = (event) => {
        
        event.preventDefault();

        console.log(`logging user`);

        const data = loginUser({username, password});  
      
       if (data) {
            setIsUserLoggedIn(true); // set global state for isUserLoggedIn
            setUsername("");
            setPassword("");
            setShow(false); 
       }
    }

    return (
        <Mod show={show} onHide={handleClose}>
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
        </Mod>
    );
};


export default UserModal;