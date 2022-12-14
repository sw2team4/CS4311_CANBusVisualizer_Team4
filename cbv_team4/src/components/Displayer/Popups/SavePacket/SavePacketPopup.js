import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import '../SaveProject/SavePopup.js' 


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
          Save Packet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='popup-container'>
        <p>
            Packet has been saved
        </p>
      </Modal.Body>
    </Modal>
  );
}

function SavePacketPopup() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='button-color' onClick={() => setModalShow(true)}>
      Save Packet
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}




export default SavePacketPopup;