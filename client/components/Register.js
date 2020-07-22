import React, { useState} from 'react';
import {
    Modal as Mod,
    Button,
    Form,
    Col
} from 'react-bootstrap';

import states from 'states-us';

import { registerUser } from '../api';

const Register = ({ setToken, setShow, setIsUserLoggedIn, user, setUser }) => {

    //console.log(states.map(state => `<option>${state.name}</option>`));

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifypassword, setVerifyPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [streetaddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    const handleUsernameChange = event => setUsername(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);
    const handleVerifyPasswordChange = event => setVerifyPassword(event.target.value);
    const handleFirstnameChange = event => setFirstname(event.target.value);
    const handleLastnameChange = event => setLastname(event.target.value);
    const handleEmailChange = event => setEmail(event.target.value);
    const handleStreetAddressChange = event => setStreetAddress(event.target.value);
    const handleCityChange = event => setCity(event.target.value);
    const handleStateChange = event => setStateAddress(event.target.value);
    const handleZipChange = event => setZip(event.target.value);

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        
        const address = `${streetaddress} ${city} ${state} ${zip}`;
        
        const data  = await registerUser({username, password, firstname, lastname, email, address});  
       
        if (data.token) {
          
            setIsUserLoggedIn(true); 
            localStorage.setItem("token", data.token);
            setUser( data.user );
            setToken( data.token );

            setUsername("");
            setPassword("");
            setVerifyPassword("");
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
                <Mod.Title>Register</Mod.Title>
            </Mod.Header>
            <Mod.Body>
            <Form>
                <Form.Row>
                    <Form.Group as = {Col}>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control 
                            placeholder="Enter first name"
                            onChange={handleFirstnameChange}
                            value={firstname}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            placeholder="Enter last name"
                            onChange={handleLastnameChange}
                            value={lastname}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as = {Col}>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            placeholder="Enter email"
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </Form.Group>
                    <Form.Group as = {Col}>
                        <Form.Label>User Name:</Form.Label>
                        <Form.Control 
                            placeholder="Enter username"
                            onChange={handleUsernameChange}
                            value={username}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as = {Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control  
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            value={password}
                       />
                    </Form.Group>
                    <Form.Group as = {Col}>
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control  
                            type="password"
                            placeholder="Password"
                            onChange={handleVerifyPasswordChange}
                            value={verifypassword}
                       />
                    </Form.Group>
                </Form.Row>
                    <Form.Group>
                        <Form.Label>Street Address:</Form.Label>
                        <Form.Control 
                            placeholder="Enter street address"
                            onChange={handleStreetAddressChange}
                            value={streetaddress}
                        />
                    </Form.Group>
                <Form.Row>
                    <Form.Group as = {Col}>
                        <Form.Label>City:</Form.Label>
                        <Form.Control 
                            placeholder="Enter city"
                            onChange={handleCityChange}
                            value={city}
                        />
                    </Form.Group>
                    <Form.Group as = {Col} className = "col-md-2">
                        <Form.Label>State:</Form.Label>
                        <Form.Control as="select"  defaultValue="Choose...">
                            onChange={handleStateChange}
                            value={state}
                            <option>Choose...</option>
                            { states.map(state => `<option>${state.name}</option>`) }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as = {Col}>
                        <Form.Label>Zip:</Form.Label>
                        <Form.Control 
                            placeholder="Enter zip"
                            onChange={handleZipChange}
                            value={zip}
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

export default Register;   