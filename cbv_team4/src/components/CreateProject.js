import React, { Component } from 'react';
// import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import {useNavigate} from "react-router-dom";
// /* eslint-disable jsx-a11y/alt-text */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../create-project.css'

export default class CreateProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'Create Project', // this is how the page knows you submitted  
      date: new Date() //the only reason date has a field is because the datepicker needs it
      }; 

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    this.setState({
      value: event.target.value,
      date: event.target.date
    });
}


handleSubmit(event) {
    //----------------------1) Add project to DB
    fetch("/add", {
        method:"POST",
        cache: "no-cache",
        headers:{
            "content_type":"application/json",
        },
        body:JSON.stringify(this.state.value)
        }
    ).then(

      // response => console.log(response.data), event => window.location.href='/can-bus-visualizer' //doesnt post here???!?
      response => console.log(response.data), event => window.location.href='/'//does post here
      );
  }


  render() {
    return (
      <div className="create-project">
        <div className="create-project-container">
          <form onSubmit={this.handleSubmit} action="http://localhost:5000/add" method="post">
            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Project Name</label>
              <div className="col-sm-10">
                <input 
                  type="text" id="p-name"
                  name="project-name" 
                  placeholder="Project Name..." 
                  required
                  className="form-control"
                  // value={this.state.name}
                  //onChange={this.onChangeName}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Stored Location</label>
              <div className="col-sm-10">
                <input 
                  type="file" 
                  id="s-location-file" 
                  name="stored-location"
                  className='form-control-file'
                  required
                />          
              </div>
            </div>
          
            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>User Initials
                <br/>
                <span className='title-required'>(Required)</span>
              </label>
              <div className="col-sm-10">
                <input 
                  className='form-control' 
                  type="text" 
                  id="u-initials" 
                  name="user-initials" 
                  placeholder="User Initials"
                  // value={this.state.analyst_initials}
                  required
                  // onChange={this.onChangeAnalystInitials}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Event Name
               <br/>
                <span className='title-required'>(Required)</span>
              </label>
              <div className="col-sm-10">
                <input 
                  className='form-control' 
                  type="text" 
                  id="e-event" 
                  name="event-name" 
                  placeholder="Event Name"
                  required
                  // value={this.state.event_name}
                  // onChange={this.onChangeEventName}
                />
              </div>
            </div>


            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Event Date
               <br/>
                <span className='title-required'>(Required)</span>
              </label>
              <div className="col-sm-10">
                <div>
                  <DatePicker
                    name="e-date"
                    required
                    selected={this.state.date}
                    onChange={this.handleChange}
                    // onChange={this.onChangeEventDate}
                  />
                </div>
              </div>
            </div>
          
            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Can Connector ID
                <br/>
                <span className='title-required'>(Required)</span>
              </label>
              <div className="col-sm-10">
                <input className='form-control' 
                  type="text" 
                  id="c-id" 
                  name="can-id" 
                  placeholder="CAN Connector ID..."
                  required
                  // value={this.state.can_id}
                  // onChange={this.onChangeCanID}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Vehicle ID
               <br/>
                <span className='title-required'>(Required)</span>
              </label>
              <div className="col-sm-10">
                <input 
                  className='form-control' 
                  type="text" 
                  id="v-id" 
                  name="vehicle-id" 
                  placeholder="Vehicle ID..."
                  required
                  // value={this.state.vehicle_id}
                  // onChange={this.onChangeVehicleID}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Baud Rate
              <br/>
                <span className='title-required'>(Required)</span>
              </label>
              <div className="col-sm-10">
                <input className='form-control' 
                  type="text" 
                  id="b-rate" 
                  name="baud-rate" 
                  placeholder="Baud Rate..." 
                  required
                  // value={this.state.baud_rate}
                  // onChange={this.onChangeBaudRate}
                  />
              </div>
            </div>

            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Import DBC File</label>
              <div className="col-sm-10">
                <input type="file" 
                  className='form-control-file'
                  id="dbc-file" 
                  name="import-dbc-file" 
                  // value={this.state.dbc_file_name}
                  // onChange={this.onChangeDbcFileName}
                  />
              </div>
            </div>

            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Import OLL File</label>
              <div className="col-sm-10">
                <input type="file" 
                  id="off-file" 
                  className='form-control-file'
                  name="off-list-file" 
                  // value={this.state.off_limits_file_name}
                  // onChange={this.onChangeOffLimitsFileName}
                  />
              </div>
            </div>
            <div className='form-group'>
              <input className="create-project-button" type="submit" onChange={this.handleChange} value={this.state.value}/>
              <input onClick={event => window.location.href='/'} className='cancel-project-button' type="button" value="Cancel"/>
            </div>
        </form>
      </div>
    </div>
    )
  }
}
