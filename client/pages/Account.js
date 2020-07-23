import React, {useState, useEffect} from "react";
import {
  Button,
  Form,
  Col
} from 'react-bootstrap';

import { updateUser } from '../api';

import "./Account.css";

const Account = ({ user }) => {

    const [error, setError] = useState("");
    const [validated, setValidated] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifypassword, setVerifyPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    useEffect(()=> {

      if (user) {

        setUsername(user.username);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);

        const addressObj = {
          street: user.address.split(',')[0],
          city: user.address.split(',')[1],
          state: user.address.split(',')[2],
          zip: user.address.split(',')[3]
        }

        setStreetAddress(addressObj.street);
        setCity(addressObj.city);
        setState(addressObj.state);
        setZip(addressObj.zip);
   
      }
    }, [user]);

    const handleUsernameChange = event => setUsername(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);
    const handleVerifyPasswordChange = event => setVerifyPassword(event.target.value);
    const handleFirstNameChange = event => setFirstName(event.target.value);
    const handleLastNameChange = event => setLastName(event.target.value);
    const handleEmailChange = event => setEmail(event.target.value);
    const handleStreetAddressChange = event => setStreetAddress(event.target.value);
    const handleCityChange = event => setCity(event.target.value);
    const handleStateChange = event => setStateAddress(event.target.value);
    const handleZipChange = event => setZip(event.target.value);

    const handleSubmit = async (event) => {
        
      const form = event.currentTarget;
       
      if (form.checkValidity() === false) {
      
          event.preventDefault();
          event.stopPropagation();
      }

      setValidated(true);
 
      if (form.checkValidity() === true) {

          event.preventDefault();
          event.stopPropagation();
          setValidated(false);
      
          setAddress(`${streetAddress},${city},${state},${zip}`);

          try {

              const data  = await updateUser({username,password,email,firstName,lastName,address,token});  
     
              if (data.token) {
                  
                  setUsername("");
                  setPassword("");
                  setVerifyPassword("");
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setStreetAddress("");
                  setCity("");
                  setState("");
                  setZip("");
      
              // update error returned stored in data (not app error)
              } else {
         
                  setError(data);
                  console.log(error.error);
              }

          } catch (error) {

              console.log("> Account error: ", error);
          }
      }
  }

      return (
        <div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                  <Form.Group as = {Col} controlId="validationCustom01">
                      <Form.Label>First Name:</Form.Label>
                      <Form.Control 
                          placeholder="Enter first name"
                          onChange={handleFirstNameChange}
                          value={firstName}
                          required
                      />
                      <Form.Control.Feedback type="invalid">
                      Please enter a first name.
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="validationCustom02">
                      <Form.Label>Last Name:</Form.Label>
                      <Form.Control 
                          placeholder="Enter last name"
                          onChange={handleLastNameChange}
                          value={lastName}
                          required
                      />
                      <Form.Control.Feedback type="invalid">
                      Please enter a last name.
                      </Form.Control.Feedback>
                  </Form.Group>
              </Form.Row>
              <Form.Row>
                  <Form.Group as = {Col} controlId="validationCustom03">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control 
                          placeholder="Enter email"
                          onChange={handleEmailChange}
                          value={email}
                          required
                      />
                      <Form.Control.Feedback type="invalid">
                      Please enter an email.
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as = {Col} controlId="validationCustom04">
                      <Form.Label>User Name:</Form.Label>
                      <Form.Control 
                          placeholder="Enter username"
                          onChange={handleUsernameChange}
                          value={username}
                          required
                      />
                      <Form.Control.Feedback type="invalid">
                      Please enter an username.
                      </Form.Control.Feedback>
                  </Form.Group>
              </Form.Row>
              <Form.Row>
                  <Form.Group as = {Col} controlId="validationCustom05">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control  
                          type="password"
                          placeholder="Password"
                          onChange={handlePasswordChange}
                          value={password}
                          required
                     />
                     <Form.Control.Feedback type="invalid">
                      Please enter a password.
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as = {Col} controlId="validationCustom06">
                      <Form.Label>Verify Password:</Form.Label>
                      <Form.Control  
                          type="password"
                          placeholder="Password"
                          onChange={handleVerifyPasswordChange}
                          value={verifypassword}
                          required
                     />
                     <Form.Control.Feedback type="invalid">
                     Please verify your password.
                     </Form.Control.Feedback>
                  </Form.Group>
              </Form.Row>
                  <Form.Group>
                      <Form.Label>Street Address:</Form.Label>
                      <Form.Control 
                          placeholder="Enter street address"
                          onChange={handleStreetAddressChange}
                          value={streetAddress}
                          required
                      />
                       <Form.Control.Feedback type="invalid">
                       Please enter a street address.
                      </Form.Control.Feedback>
                  </Form.Group>
              <Form.Row>
                  <Form.Group as = {Col}>
                      <Form.Label>City:</Form.Label>
                      <Form.Control 
                          placeholder="Enter city"
                          onChange={handleCityChange}
                          value={city}
                          required
                      />
                       <Form.Control.Feedback type="invalid">
                      Please enter a city.
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as = {Col} className = "col-md-2">
                      <Form.Label>State:</Form.Label>
                      <Form.Control 
                          placeholder="Enter state"
                          onChange={handleStateChange}
                          value={state}
                          required
                      />
                      <Form.Control.Feedback type="invalid">
                      Please enter a state.
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as = {Col}>
                      <Form.Label>Zip:</Form.Label>
                      <Form.Control 
                          placeholder="Enter zip"
                          onChange={handleZipChange}
                          value={zip}
                          required
                      />
                       <Form.Control.Feedback type="invalid">
                      Please enter a zip.
                      </Form.Control.Feedback>
                  </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
              Submit
              </Button>
              <Form.Label className = "ml-5 alert-danger">{error.error ? `Regiser error: ${error.error}` : '' }</Form.Label>
          </Form>
        </div>
  );
}

export default Account;   