import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import './ExportMap.css'
 


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
          Export as...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        <button type="button">PNG</button>
        <br></br>
        <br></br>
        <button type="button">JPG</button>
        </p>
      </Modal.Body>
    </Modal>
  );
}

function SavePopup() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='button-color' onClick={() => setModalShow(true)}>
      Export CAN Bus Map
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}




export default SavePopup;