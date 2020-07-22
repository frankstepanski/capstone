import React, { useState} from 'react';
import {
    Modal as Mod,
    Button,
    Form
} from 'react-bootstrap';

import { loginUser } from '../api';

const Login = ({ setShow, setIsUserLoggedIn, user, setUser, error, setError }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);


    const handleUsernameChange = event => {
        setUsername(event.target.value);
        setError({});
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
        setError({});
    }

    const handleSubmit = async (event) => {

        const form = event.currentTarget;
         
        // bootstrap validation requires preventDefault to activate 
        if (form.checkValidity() === false) {
        
            event.preventDefault();
            event.stopPropagation();
        }

        // set flag for bootstrap valdate flag
        setValidated(true);
   
        // if form passes validation, need preventDefault again
        if (form.checkValidity() === true) {

            event.preventDefault();
            event.stopPropagation();
            setValidated(false);
            
            try {
                const data  = await loginUser({username, password});  
            
                // not wrapping commands in an await function, so just checking on token returned
                // user object returned:
                if (data.token) {
                    setIsUserLoggedIn(true); 
                    localStorage.setItem("token", data.token);
                    setUser( data.user );
                    setUsername("");
                    setPassword("");
                    setError({});
                    setShow(false); // close modal
            
                // login error returned stored in data (not app error)
                } else {
                    setError(data);
                    console.log(data);
                }

            } catch (error) {
                console.log("> login error: ", error.message);
            }
        }
    }

    return (
            <>
            <Mod.Header closeButton>
                <Mod.Title>Login</Mod.Title>
            </Mod.Header>
            <Mod.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationCustom01">
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control 
                      placeholder="Enter username"
                      className = "col-md-6"
                      onChange={handleUsernameChange}
                      value={username}
                      required
                      minlength="5"
                    />
                <Form.Text id="passwordHelpBlock" muted>
                        Must be at least 5 characters long.
                </Form.Text>    
                <Form.Control.Feedback type="invalid">
                Please provide a user name at least 5 characters.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom02">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                       type="password"
                       placeholder="Password"
                       className = "col-md-6"
                       onChange={handlePasswordChange}
                       value={password}
                       required
                       minlength="8"
                       />
                    <Form.Text id="passwordHelpBlock" muted>
                        Must be 8-20 characters long.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                    Please provide a password at least 8 characters.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
                <Form.Label className = "ml-5 alert-danger">{error.error ? `Login error: ${error.error}` : '' }</Form.Label>
            </Form>
            </Mod.Body>
            </>
    );
}

export default Login;   