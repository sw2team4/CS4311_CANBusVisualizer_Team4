import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Edit/EditPopup.css'
import '../Off-limits/OffLimits.css'
import NavDropdown from "react-bootstrap/NavDropdown";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function OffLimits(props) {

    const data = [
        {
            id: 1001,
            firstname: "Mark",
            lastname: "Otto",
            age: 34,
            location: "London",
            address: "10 Downing Street"
        },
        {
            id: 1002,
            firstname: "Jacob",
            lastname: "Jacob",
            age: 34,
            location: "India",
            address: "#110 broad Street"
        }
    ];

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  return (
    <>
    <NavDropdown.Item onClick={handleShow}>Modify Off-Limtis</NavDropdown.Item>
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Off-Limits
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="off-table">
        <Table className="off-table">
       <tr>
            <th>Node ID</th>
            <th>Name</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>
        <tr >
            <td>58</td>
            <td>Transmission</td>
            <td>Desc</td>
        </tr>
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
          </tr>
        <tr>
            <td>58</td>
            <td>Transmission</td>
            <td>Desc</td>     
        </tr>
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>  
        <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
        </tr>
       </Table>
       <Button id="add-entry" className="">
        Add
       </Button>
       <Button id="remove-entry" className="">
        Remove
       </Button>
       <Modal.Footer justify-content_between>
        <Button onClick={handleClose}>
            Cancel
        </Button>
        <Button>Save</Button>
       </Modal.Footer>
      </Modal.Body>
    </Modal>
    </>
  );
}




export default OffLimits;