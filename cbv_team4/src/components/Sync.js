import React, {Component} from 'react'
import '../sync.css';
import Comp from '../images/Comp3.png'
import axios from 'axios';

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
            dest_un: '',
            dest_pw: '',
            dest_fldr: '',
        }


    }

    componentDidMount() {
      axios.get('http://localhost:5000/sync/')
        .then(response => {
            this.setState({
              src_data: response.data.src_data,
              dest_ip: response.data.dest_ip,
              dest_un: response.data.dest_un,
              dest_pw: response.data.dest_pw,
              dest_fldr: response.data.dest_fldr
            })
        })
        .catch((error) => {
          console.log(error);
        })
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

      
      console.log(project);
      axios.post('http://localhost:5000/sync/', project)
        .then(res => console.log(res.data), event => window.location.href='/can-bus-visualizer');
    }
    

  render(){
  
  return (
    <div className='sync-project'>
      <div className="sync-project-container">
        <form>
        <div className="form-group row">
            <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Source Data
            <br/>
                <span className='title-required'>(Required)</span>
            </label>
            <div className="col-sm-10">
                <input 
                  type="text" id="source" 
                  name="source-data" 
                  placeholder="" 
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
                  value={this.state.dest_un}
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
                  name="password" 
                  placeholder=""
                  required
                  className='form-control' 
                  value={this.state.dest_fldr}
                  onChange={this.onChangeDestFldr}
                />
              </div>
            </div>
        </form>
      </div>


      <div>
        <h1 className='sync-title'>Sync</h1>
        <img className='comp' src={Comp} height={300} width={300} alt=""/>
        <img className='comp1' src={Comp} height={300} width={300} alt=""/>
        <div>
          <input className="sync-button" type="submit" value="Sync"/>
	      </div>
        <form>
        <input onClick={event => window.location.href='/'} className='cancel-sync-button' type="button" value="Cancel"/>
        </form>
      </div>
    </div>
  );
 }
}