import React, { useState } from "react";
import {
    Modal as Mod, Tab, Tabs
} from 'react-bootstrap';

import Login from './Login';
import Register from './Register';

const UserModal = ({ show, setShow, setIsUserLoggedIn, user, setUser }) => {
    
    const [key, setKey] = useState('login'); // tab state
  console.log("gg");
    const handleClose = () => setShow(false);

    return (
        <Mod show={show} onHide={handleClose}>
            <Tabs
                id="login-register"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="login" title="Login">
                    <Login show = { show } setShow = { setShow } setIsUserLoggedIn = { setIsUserLoggedIn } user = { user } setUser = { setUser} />
                </Tab>
                <Tab eventKey="register" title="Register">
                    <Register show = { show } setShow = { setShow } setIsUserLoggedIn = { setIsUserLoggedIn } user = { user } setUser = { setUser} />
                </Tab>
            </Tabs>
        </Mod>
    );
};

export default UserModal;