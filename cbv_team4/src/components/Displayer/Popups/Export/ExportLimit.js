
import React from 'react'
import Button from 'react-bootstrap/Button';
import './ExportLimit.css'
 

function SavePopup() {
  const [setModalShow] = React.useState(false);

  function handleExport() {
    fetch('http://localhost:5000/export/oll', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        alert("Exported off limits list to /home/kali/Desktop/ as CSV");
    })
  }//handle export

  return (
      <Button className='button-color' onClick={handleExport}>Export OLL</Button>
  );
}

export default SavePopup;