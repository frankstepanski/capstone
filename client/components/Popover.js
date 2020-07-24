import React, { useState } from "react"
import  { Popover, PopoverContent, Overlay, OverlayTrigger, Button, Tooltip }  from 'react-bootstrap';

import ProductView from './/ProductView'


const CardPopover = () => {

    const handlePopView = (event) => {
            event.preventDefault();
        return {
    
        }
    }

    return (
    
    <div>
        
        <Popover id="popover-basic">
    <Popover.Title as="h3">Popover right</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
    </Popover>
        <OverlayTrigger trigger="click" placement="right" overlay={Popover}>
        <Button variant="success" type="button" target= ".//ProductView.js" >Click me to see</Button>
    </OverlayTrigger>

    </div>
  
    )
};
    




  

  export default CardPopover;