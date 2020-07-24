import React, { useState } from "react"
import  { Popover, PopoverContent, Overlay, OverlayTrigger, Button, Tooltip }  from 'react-bootstrap';

import ProductView from './ProductView'


const CardPopover = ({product}) => {

     const popover = (   

        <Popover id="popover-basic" style ={{
            "minHeight":"10rem",
            "minWidth":"25rem"
        }}>
        <Popover.Title as="h3"></Popover.Title>
        <Popover.Content>
            <ProductView product ={ product } />
        </Popover.Content>
        </Popover>

    )
    return (
    
    <div>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="success" type="button"> 
            Click to View!
            </Button>
        
        </OverlayTrigger>

    </div>
  
    )
};
    




  

  export default CardPopover;