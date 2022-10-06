import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './renamePopup.css'


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Relationship
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='popup-container'>
          <Form.Group className="form-group row mb-3" controlId="formBasicEmail">
            <Form.Label className='col-sm-2 col-form-label col-form-label-sm popups-title'>Node ID 1:</Form.Label>
            <Form.Control className='popups-inputs' placeholder="Enter here..."/>
          </Form.Group>
          <Form.Group className="form-group row mb-3" controlId="formBasicEmail">
            <Form.Label className='col-sm-2 col-form-label col-form-label-sm popups-title'>Node ID 2:</Form.Label>
            <Form.Control className='popups-inputs' placeholder="Enter here..."/>
          </Form.Group>

          <Button className='popup-update-button' variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function RelationshipPopup() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='button-color' onClick={() => setModalShow(true)}>
      Add Relationship
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}




export default RelationshipPopup;