import React, {useState, useEffect, Component} from 'react'
import '../Sync/Sync.css';
import Comp from './images/Comp3.png'


export default class Visualizer extends Component {

  constructor(props) {
      super(props);

      this.onChangeSrcData = this.onChangeSrcData.bind(this);
      this.onChangeDestIP = this.onChangeDestIP.bind(this);
      this.onChangeDestUN = this.onChangeDestUN.bind(this);
      this.onChangeDestPW = this.onChangeDestPW.bind(this);
      this.onChangeDestFldr = this.onChangeDestFldr.bind(this);

      this.state = {
          src_data: '',
          dest_ip: '',
          dest_un: 'kali',
          dest_pw: 'kali',
          dest_fldr: '/home/kali/Desktop/',
      }


  }


  onChangeSrcData(e) {
      this.setState({
          src_data: e.target.value
      })
  }
  onChangeDestIP(e) {
      this.setState({
          dest_ip: e.target.value
      })
  }
  onChangeDestUN (e) {
      this.setState({
          dest_un: e.target.value
      })
  }
  onChangeDestPW(e) {
      this.setState({
          dest_pw: e.target.value
      })
  }
  onChangeDestFldr(e) {
      this.setState({
          dest_fldr: e.target.value
      })
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
    src_data: this.state.src_data,
    dest_ip: this.state.src_data,
    dest_un: this.state.src_data,
    dest_pw: this.state.src_data,
    dest_fldr: this.state.src_data
    }

  }
  

render(){

return (
  <div className='sync-project'>
    <div className="sync-project-container">
      <form onSubmit={this.handleSubmit} action="http://localhost:5000/sync" method="post">
      <div className="form-group row">
          <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Source Data
          <br/>
              <span className='title-required'>(Required)</span>
          </label>
          <div className="col-sm-10">
              <input 
                type="text" id="source" 
                name="source-data" 
                placeholder="/home/kali/Desktop/projectX" 
                required
                className="form-control"
                value={this.state.src_data}
                onChange={this.onChangeSrcData}
              />
            </div>
        </div>

        <div className="form-group row">
          <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Receiver IP Address
          <br/>
              <span className='title-required'>(Required)</span>
          </label>
          <div className="col-sm-10">
              <input 
                type="text" id="d-ip" 
                name="ip-address" 
                placeholder="192.168.1.1" 
                required
                className="form-control"
                value={this.state.dest_ip}
                onChange={this.onChangeDestIP}
              />
            </div>
        </div>

        <div className="form-group row">
            <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Receiver Username
              <br/>
              <span className='title-required'>(Required)</span>
            </label>
            <div className="col-sm-10">
              <input 
                type="text" id="username-sync" 
                name="username" 
                placeholder="Username"
                required
                className='form-control'
                value={this.state.dest_un}
                onChange={this.onChangeDestUN}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Receiver Password
              <br/>
              <span className='title-required'>(Required)</span>
            </label>
            <div className="col-sm-10">
              <input 
                type="text" id="password-sync" 
                name="password" 
                placeholder="Password"
                required
                className='form-control' 
                value={this.state.dest_pw}
                onChange={this.onChangeDestPW}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Dest Folder
              <br/>
              <span className='title-required'>(Required)</span>
            </label>
            <div className="col-sm-10">
              <input 
                type="text" id="dst-fldr"
                name="dest-data" 
                placeholder="/home/"
                required
                className='form-control' 
                value={this.state.dest_fldr}
                onChange={this.onChangeDestFldr}
              />
            </div>
          </div>

        <div>
        <input className="sync-button" type="submit" name="Submit" onChange={this.onSubmit}  value="Sync"/>
        </div>
      </form>
    </div>


    <div>
      <h1 className='sync-title'>Sync</h1>
      <img className='comp' src={Comp} height={300} width={300} alt=""/>
      <img className='comp1' src={Comp} height={300} width={300} alt=""/>
      <form>
      <input onClick={event => window.location.href='/'} className='cancel-sync-button' type="button" value="Cancel"/>
      </form>
    </div>
  </div>
);
}
}