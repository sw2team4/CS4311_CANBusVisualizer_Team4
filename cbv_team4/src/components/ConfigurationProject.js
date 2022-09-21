import '../configuration-project.css';

function ConfigurationProject() { //Configure page 2
  return (
    <>
      <div>
        <form>
          <div className='event-name'>
            <label>Event Name (Required)</label>
            <br></br>
            <input type="text"></input>
          </div>
          <div className='initials'>
            <label>User Initials (Required)</label>
            <br></br>
            <input type="text" size="2"/>
          </div>
          <div className='can-connector'>
            <label>CAN Connector ID (Required)</label>
            <br></br>
            <input type="text" size="8"/>
          </div>
          <div className='vehicle-id'>
            <label>Vehicle ID (Required)</label>
            <br></br>
            <input type="text" size="8"/>
          </div>
          <div className='baud-rate'>
            <label>Baud Rate (Required)</label>
            <br></br>
            <input type="text" size="8"/>
          </div>
          <div className='import-dbc'>
            <label>Import DBC File (Required)</label>
            <br></br>
            <input type="file" id="myFile" />
            {/* <input type="text" size="56"/>
            <button type="button">Browse</button> */}
          </div>
          <div className='off-limit'>
            <label>Import Off-Limit List File (Required)</label>
            <br></br>
            <input type="file" id="myFile" />
          </div>
            <button className='buttons1' type="button">Create Project</button>
            <button className='buttons2' type="button">Cancel</button>
      </form>
      </div>
    </>
  );
}


export default ConfigurationProject;
