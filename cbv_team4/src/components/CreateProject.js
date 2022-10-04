import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import {useNavigate} from "react-router-dom";
// /* eslint-disable jsx-a11y/alt-text */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../create-project.css'


export default class CreateProject extends Component {
  constructor(props) {
    
    
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAnalystInitials = this.onChangeAnalystInitials.bind(this);
    this.onChangeEventName = this.onChangeEventName.bind(this);
    this.onChangeEventDate = this.onChangeEventDate.bind(this);
    this.onChangeCanID = this.onChangeCanID.bind(this);
    this.onChangeVehicleID = this.onChangeVehicleID.bind(this);
    this.onChangeBaudRate = this.onChangeBaudRate.bind(this);
    this.onChangeDbcFileName = this.onChangeDbcFileName.bind(this);
    this.onChangeOffLimitsFileName = this.onChangeOffLimitsFileName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.state = {
      name: '',
      analyst_initials: '',
      event_name: '',
      event_date: new Date(),
      can_id: 0,
      vehicle_id: 0,
      baud_rate: 0,
      dbc_file_name: '',
      off_limits_file_name: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/projects/')
      .then(response => {
          this.setState({
            name: response.data.name,
            analyst_initials: response.data.analyst_initials,
            event_name: response.data.event_name,
            event_date: response.data.event_date,
            can_id: response.data.can_id,
            vehicle_id: response.data.vehicle_id,
            baud_rate: response.data.baud_rate,
            dbc_file_name: response.data.dbc_file_name,
            off_limits_file_name: response.data.off_limits_file_name
          })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
  
  onChangeAnalystInitials(e) {
    this.setState({
      analyst_initials: e.target.value
    })
  }

  onChangeEventName(e) {
    this.setState({
      event_name: e.target.value
    })
  }

  onChangeEventDate(date) {
    this.setState({
      event_date: date
    })
  }

  onChangeCanID(e) {
    this.setState({
      can_id: e.target.value
    })
  }

  onChangeVehicleID(e) {
    this.setState({
      vehicle_id: e.target.value
    })
  }

  onChangeBaudRate(e) {
    this.setState({
      baud_rate: e.target.value
    })
  }

  onChangeDbcFileName(e) {
    this.setState({
      dbc_file_name: e.target.value
    })
  }

  onChangeOffLimitsFileName(e) {
    this.setState({
      off_limits_file_name: e.target.value
    })
  }

  
  onSubmit(e) {
    e.preventDefault();

    const project = {
      
  
      name: this.state.name,
      analyst_initials: this.state.analyst_initials,
      event_name: this.state.event_name,
      event_date: this.state.event_date,
      can_id: this.state.can_id,
      vehicle_id: this.state.vehicle_id,
      baud_rate: this.state.baud_rate,
      dbc_file_name: this.state.dbc_file_name,
      off_limits_file_name: this.state.off_limits_file_name

    }


      console.log(project);
      axios.post('http://localhost:5000/projects/add', project)
        .then(res => console.log(res.data), event => window.location.href='/can-bus-visualizer');
  }

  render() {
    return (
      <div className="create-project">
        <div className="create-project-container">
          <form onSubmit={this.onSubmit}>
            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Project Name</label>
              <div className="col-sm-10">
                <input 
                  type="text" id="p-name" 
                  name="project-name" 
                  placeholder="Project Name..." 
                  required
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Stored Locaion</label>
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
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>User Initias
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
                  value={this.state.analyst_initials}
                  required
                  onChange={this.onChangeAnalystInitials}
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
                  value={this.state.event_name}
                  onChange={this.onChangeEventName}
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
                    required
                    selected={this.state.event_date}
                    onChange={this.onChangeEventDate}
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
                  value={this.state.can_id}
                  onChange={this.onChangeCanID}
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
                  value={this.state.vehicle_id}
                  onChange={this.onChangeVehicleID}
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
                  value={this.state.baud_rate}
                  onChange={this.onChangeBaudRate}/>
              </div>
            </div>

            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Import DBC ile</label>
              <div className="col-sm-10">
                <input type="file" 
                  className='form-control-file'
                  id="dbc-file" 
                  name="import-dbc-file" 
                  value={this.state.dbc_file_name}
                  onChange={this.onChangeDbcFileName}/>
              </div>
            </div>

            <div className="form-group row">
              <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Import Off-ist File</label>
              <div className="col-sm-10">
                <input type="file" 
                  id="off-file" 
                  className='form-control-file'
                  name="off-list-file" 
                  value={this.state.off_limits_file_name}
                  onChange={this.onChangeOffLimitsFileName}/>
              </div>
            </div>
            <div className='form-group'>
              <input className="create-project-button" type="submit" value="Create Project"/>
              <input onClick={event => window.location.href='/'} className='cancel-project-button' type="button" value="Cancel"/>
            </div>
        </form>
      </div>
    </div>
    )
  }
}
