import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Edit/EditPopup.css'
import '../Off-limits/OffLimits.css'
import NavDropdown from "react-bootstrap/NavDropdown";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function displayList(oll){
    document.getElementById('oll').innerHTML += `
        <tr>
            <td>${oll.id}</td>
            <td>${oll.name}</td>
            <td>${oll.comment}</td>
        </tr>
    `
}

function OffLimits(props) {
    fetch('http://localhost:5000/oll_view')
        .then(response =>
            response.json()
        )
        .then(data => {
            var oll = data.oll
            for (var i = 0; i < oll.length; i++) {
                displayList(oll[i])
            }
        })
        .catch(
            (e) => {
                console.log(e)
            }
        )

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <NavDropdown.Item onClick={handleShow}>Modify Off-Limtis</NavDropdown.Item>
            <Modal
                {...props}
                size="lg"
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
                    <Table responsive striped bordered hover className="off-table">
                        <thead>
                            <tr>
                                <th>Node ID</th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody id='oll'>
                        </tbody>
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