/* eslint-disable jsx-a11y/alt-text */
import '../create-project.css';

function CreateProject() { //Rename to Home later
  return (

  <div className="container">
    <form className='create-form'>
      <div className="row">
        <div className="col-25">
          <label className='create-titles'>Project Name</label>
        </div>
        <div className="col-75">
          <input className='fields' type="text" id="p-name" name="project-name" placeholder="Project Name..." />
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label className='create-titles'>Stored Location</label>
        </div>
        <div className="col-75">
          <input type="file" id="s-location-file" name="stored-location"/>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label className='create-titles'>User Initials
            <br/>
            <span className='title-required'>(Required)</span>
          </label>
        </div>
        <div className="col-75">
          <input className='fields' type="text" id="u-initials" name="user-initials" placeholder="User Initials"/>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label className='create-titles'>Can Connector ID
            <br/>
            <span className='title-required'>(Required)</span>
          </label>
        </div>
        <div className="col-75">
          <input className='fields' type="text" id="c-id" name="can-id" placeholder="CAN Connector ID..."/>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label className='create-titles'>Vehicle ID
            <br/>
            <span className='title-required'>(Required)</span>
          </label>
        </div>
        <div className="col-75">
          <input className='fields' type="text" id="v-id" name="vehicle-id" placeholder="Vehicle ID..."/>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label className='create-titles'>Baud Rate
            <br/>
            <span className='title-required'>(Required)</span>
          </label>
        </div>
        <div className="col-75">
          <input className='fields' type="text" id="b-rate" name="baud-rate" placeholder="Baud Rate..."/>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label className='create-titles'>Import DBC File
            <br/>
            <span className='title-required'>(Required)</span>
          </label>
        </div>
        <div className="col-75">
          <input type="file" id="dbc-file" name="import-dbc-file"/>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label className='create-titles'>Import Off-List File
            <br/>
            <span className='title-required'>(Required)</span>
          </label>
        </div>
        <div className="col-75">
          <input type="file" id="off-file" name="off-list-file"/>
        </div>
      </div>
      <div className="row">
        <input className="create-project-button" type="submit" value="Create Project"/>
      </div>
    </form>
  </div>
  );
}


export default CreateProject;