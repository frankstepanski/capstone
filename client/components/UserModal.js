import React, { useState } from "react";
import {
    Modal as Mod,
    Tab,
    Tabs
} from 'react-bootstrap';

import './Usermodal.css';
import Login from './Login';
import Register from './Register';

const UserModal = ({ show, setShow, setIsUserLoggedIn, user, setUser }) => {
    
    const [key, setKey] = useState('login'); // tab state
    const handleClose = () => setShow(false);
    const [error, setError] = useState({});
 
    return (
        <Mod 
            show={show} 
            onHide={handleClose}   
            size = {'lg'}
            centered = {true}
        >
            <Tabs
                id="login-register"
                activeKey={key}
                onSelect={(k) => { 
                        setKey(k)
                        setError({})
                }}
            >
                <Tab eventKey="login" title="Login">
                    <Login 
                       setShow = { setShow }
                       user = {user}
                       setUser = {setUser}
                       setIsUserLoggedIn = {setIsUserLoggedIn}
                       show = { show }
                       error = { error }
                       setError = { setError}
                    />
                </Tab>
                <Tab eventKey="register" title="Register">
                    <Register
                        show = { show } 
                        setShow = { setShow } 
                        setIsUserLoggedIn = { setIsUserLoggedIn } 
                        user = { user } 
                        setUser = { setUser} 
                        error = { error }
                        setError = { setError}
                    />
                </Tab>
            </Tabs>
        </Mod>
    );
};

export default UserModal;