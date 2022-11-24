import React from 'react'
import Button from 'react-bootstrap/Button';
import './ExportTraffic.css'


function SavePopup() {
  const [setModalShow] = React.useState(false);

  function handleExport() {
    fetch('http://localhost:5000/export/packetCSV', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        alert("Downloaded all traffic to /home/kali/Desktop/ as CSV");
    })
  }//handle export

  return (
      <Button className='button-color' onClick={handleExport}>Export Packets</Button>
  );
}

export default SavePopup;