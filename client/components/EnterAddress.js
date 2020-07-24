import React, {useEffect, useState} from 'react'
import { Form, Col} from 'react-bootstrap'

const EnterAddress = ({

}) => {

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
                        <option></option>
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
            <Button variant="primary" type="submit">
            Submit
            </Button>
            <Form.Label className = "ml-5 alert-danger">{error.error ? `Regiser error: ${error.error}` : '' }</Form.Label>
        </Form>
    </>
    )
}