import './create-project.css';
// import Devcom from './images/DevcomLogo.png';


function CreateProject() { //Rename to Home later
  return (

  <div className="configuration-project">
      
        <form className="forms">
          <div className="name-div">
            <label className="configure-project-one-labels">Project Name:</label>
            <br/>
            <input className="project-name-input" type="text" />
            <br/>   
            
            <label className="configure-project-one-labels">Stored Location:</label>
            <br/>
            <input className="file-input" type="file"/> 
          </div>

        </form>
      
        <div className='page-one-buttons'>
          <button className='continue-button'>Continue</button>
          <button className='cancel-button'>Cancel</button>
        </div>
      
    </div>
  );
}


export default CreateProject;