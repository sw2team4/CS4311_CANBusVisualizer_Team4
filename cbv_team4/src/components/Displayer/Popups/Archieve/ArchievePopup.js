import React from 'react'
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import '../SaveProject/SavePopup.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
          Archive Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='popup-container'>
        <Row>
          <Col>
            10-13-2022
          </Col>
          <Col>
            <a href='testfile.txt' download>CAN-BUS-1</a>
          </Col>
        </Row>
        <Row>
          <Col>
            10-27-2022
          </Col>
          <Col>
            <a href='testfile.txt' download>CAN-BUS-2</a>
          </Col>
        </Row>
        <Row>
          <Col>
            11-3-2022
          </Col>
          <Col>
            <a href='/can-bus-visualizer'>CAN-BUS-3</a>
          </Col>
        </Row>
        <Row>
          <Col>
            11-7-2022
          </Col>
          <Col>
            <a href='testfile.txt' download>CAN-BUS-4</a>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

function ArchievePopup() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      {/* <Button className='button-color' onClick={() => setModalShow(true)}>
      Save Packet
      </Button> */}
      <button onClick={() => setModalShow(true)} className='fourthButton' type='button'></button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}




export default ArchievePopup;