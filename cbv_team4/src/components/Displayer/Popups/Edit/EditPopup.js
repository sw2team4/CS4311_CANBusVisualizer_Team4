import React from 'react'
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../Edit/EditPopup.css'

function MyVerticallyCenteredModal(props) {
  
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Node
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='popup-container'>
          <div className='nodeName'>
            <label>Node Name:</label><br/>
            <input type='text' name='nodeName'></input><br/>
            <br/>
          </div>
          <div className='iconInput'>
            <label>Icon:</label><br/>
            <input type='file' name='nodeIcon'></input><br/>
            <br/>
          </div>
          <div className='visibileInput'>
            <label>Visibility</label><br/>
            <input type="radio" name='visibility'/>
            <label>Visible:</label><br/>
            <input type="radio" name='visibility'/>
            <label>Hidden</label><br/>
            <br/>
          </div>
          <div className='visibileInput'>
            <label>Annotations</label><br/>
            <input type="radio" name='annotation'/>
            <label>Alive</label><br/>
            <input type="radio" name='annotation'/>
            <label>Scanned</label><br/>
            <br/>
          </div>
          <div className='annotateInput'>
            <label>Comments</label>
            <textarea></textarea>
          </div>
          <div className='colorInput'>
            <input type="color"></input>
            <br></br>
            <button type='button'>Update</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function EditPopup() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <button className='button-color' onClick={() => setModalShow(true)}>
        {'Settings'}
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}




export default EditPopup;