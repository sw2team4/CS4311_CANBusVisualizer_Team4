import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ExportNodes.css'


function MyVerticallyCenteredModal(props) {

  function handleExportCSV() {
    fetch('http://localhost:5000/export/nodesCSV', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        alert("Downloaded all nodes to /home/kali/Desktop/ as CSV");
    })
  }//handle export

  function handleExportJSON() {
    fetch('http://localhost:5000/export/nodesJSON', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        alert("Downloaded all nodes to /home/kali/Desktop/ as JSON");
    })
  }//handle export


  function handleExportXML() {
    fetch('http://localhost:5000/export/nodesXML', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        alert("Downloaded all nodes to /home/kali/Desktop/ as XML");
    })
  }//handle export

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
        <button type="button" onClick={handleExportXML}>XML</button>
        <br></br>
        <br></br>
        <button type="button" onClick={handleExportJSON}>Json</button>
        <br></br>
        <br></br>
        <button type="button" onClick={handleExportCSV}>CSV</button>
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
      Export CAN Bus Nodes
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}




export default SavePopup;