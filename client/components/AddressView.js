import React, {useEffect, useState} from 'react'
import { Form, Col, Button} from 'react-bootstrap'
import { Link, useRouteMatch } from "react-router-dom";
import states from 'states-us';

const AddressView = ({
    user,
    setShippingAddress,
}) => {
    const {path, url} = useRouteMatch();
    const [streetaddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setStateAddress] = useState("-");
    const [zip, setZip] = useState("");
    const [validated, setValidated] = useState(false);
    const [useCurrentAddress, setUseCurrentAddress] = useState(true)

    useEffect(()=> {
        if (user && useCurrentAddress) {
            const addressObj = {
              street: user.address.split(',')[0],
              city: user.address.split(',')[1],
              state: user.address.split(',')[2],
              zip: user.address.split(',')[3]
            }
            setStreetAddress(addressObj.street);
            setCity(addressObj.city);
            setStateAddress(addressObj.state);
            setZip(addressObj.zip);
        } else if (user && !useCurrentAddress) {
            setStreetAddress('');
            setCity('');
            setStateAddress('-');
            setZip('');
        }
    }, [user, useCurrentAddress])

    const handleStreetAddressChange = event => {
        setStreetAddress(event.target.value);
        setUseCurrentAddress(false);
    }
    const handleCityChange = event => {
        setCity(event.target.value);
        setUseCurrentAddress(false);
    }
    const handleStateChange = event => {
        setStateAddress(event.target.value);
        setUseCurrentAddress(false);
    }
    const handleZipChange = event => {
        setZip(event.target.value);
        setUseCurrentAddress(false);
    }
    const handleCheckChange = event => {
        setUseCurrentAddress(event.target.checked);
    }

    console.log(`path: `, path);
    console.log(`url: `, url)

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
            
            const address = `${streetaddress},${city},${state},${zip}`;
                
            try {

            } catch (error) {
                console.log("> register error: ", error);
            }
        }
    }
    return (
    <>
        <Form  noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Street Address:</Form.Label>
                <Form.Control 
                    placeholder="Enter street address"
                    onChange={handleStreetAddressChange}
                    value={streetaddress}
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
                        required/>
                    <Form.Control.Feedback type="invalid">
                    Please enter a city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as = {Col} className = "col-md-2">
                    <Form.Label>State:</Form.Label>
                    <Form.Control 
                        as="select"  
                        required
                        onChange={handleStateChange}
                        value={state}>
                        <option>-</option>
                        { states.map((sta) => <option value = { sta.name } key={ sta.name }>{ sta.name }</option>) }
                    </Form.Control>
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
                        required/>
                    <Form.Control.Feedback type="invalid">
                    Please enter a zip.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Group id="formGridCheckbox">
                <Form.Check 
                type="checkbox" 
                label="Use stored address"
                checked={useCurrentAddress}
                onChange={handleCheckChange}/>
            </Form.Group>
            <Link to={`cart/checkout`}>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Link>
        </Form>
    </>
    )
}

export default AddressView;