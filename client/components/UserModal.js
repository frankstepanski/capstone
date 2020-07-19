import React, { useState, useEffect } from 'react';
import {
    Modal as Mod,
    Button,
    Form
} from 'react-bootstrap';

import '../api';
import { loginUser } from '../api';
const token = localStorage.getItem('token');

const UserModal = ({ show, setShow }) => {

    const handleClose = () => setShow(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = event => setUsername(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)

    const handleSubmit = () => {
        console.log(`logging user`);
        
        const headers = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`}

        const data = loginUser(username, password, headers);    
        console.log(data);
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