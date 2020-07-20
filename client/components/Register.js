import React, { useState} from 'react';
import {
    Modal as Mod,
    Button,
    Form
} from 'react-bootstrap';

import { registerUser } from '../api';

const Register = ({ setShow, setIsUserLoggedIn, user, setUser }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [streetaddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    const handleUsernameChange = event => setUsername(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);
    const handleFirstnameChange = event => setFirstname(event.target.value);
    const handleLastnameChange = event => setLastname(event.target.value);
    const handleEmailChange = event => setEmail(event.target.value);
    const handleStreetAddressChange = event => setStreetAddress(event.target.value);
    const handleCityChange = event => setCity(event.target.value);
    const handleStateChange = event => setStateAddress(event.target.value);
    const handleZipChange = event => setZip(event.target.value);

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        
        const data  = await registerUser({username, password, firstname, lastname, email, address});  

        if (data.token) {
          
            setIsUserLoggedIn(true); 
            localStorage.setItem("token", data.token);
            setUser( data.user );

            setUsername("");
            setPassword("");
            setFirstname("");
            setLastname("");
            setEmail("");
            setStreetAddress("");
            setCity("");
            setState("");
            setZip("");
            setShow(false); 
        
        } else {
            // register error
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
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control 
                      placeholder="Enter first name"
                      onChange={handleFirstnameChange}
                      value={firstname}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                       placeholder="Enter last name"
                       onChange={handleLastnameChange}
                       value={lastname}
                    />
                </Form.Group>
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
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                      placeholder="Enter email"
                      onChange={handleEmailChange}
                      value={email}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Street Address:</Form.Label>
                    <Form.Control 
                      placeholder="Enter street address"
                      onChange={handleStreetAddressChange}
                      value={streetaddress}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>City:</Form.Label>
                    <Form.Control 
                      placeholder="Enter city"
                      onChange={handleCityChange}
                      value={city}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>State:</Form.Label>
                    <Form.Control 
                      placeholder="Enter state"
                      onChange={handleStateChange}
                      value={state}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Zip:</Form.Label>
                    <Form.Control 
                      placeholder="Enter zip"
                      onChange={handleZipChange}
                      value={zip}
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

export default Register;   