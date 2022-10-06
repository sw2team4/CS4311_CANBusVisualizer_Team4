import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './editPopup.css'


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
          Edit Packets
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='popup-container'>
          <Form.Group className="form-group row mb-3" controlId="formBasicEmail">
            <Form.Label className='col-sm-2 col-form-label col-form-label-sm popups-title'>Packet Name</Form.Label>
            <Form.Control className='popups-inputs' placeholder="Enter here..."/>
            {/* <Form.Text className="text-muted">
             This packet will be raname to the input above
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="form-group row mb-3" controlId="formBasicPassword">
            <Form.Label className='col-sm-2 col-form-label col-form-label-sm popups-title'>Packet ID</Form.Label>
            <Form.Control className='popups-inputs' placeholder="Enter here..." />
          </Form.Group>

          <Form.Group className="form-group row mb-3" controlId="formBasicPassword">
            <Form.Label className='col-sm-2 col-form-label col-form-label-sm popups-title'>Packet Data</Form.Label>
            <Form.Control className='popups-inputs' placeholder="Enter here..." />
          </Form.Group>

          <Button className='popup-update-button' variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function EditPopup() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='button-color' onClick={() => setModalShow(true)}>
      Edit Packets
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}




export default EditPopup;