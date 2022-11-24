import React from 'react'
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import './ExportTraffic.css'
 

function SavePopup() {
  const [setModalShow] = React.useState(false);

  return (
      <Button className='button-color' onClick={() => setModalShow(true)}>Export Packets</Button>
  );
}




export default SavePopup;