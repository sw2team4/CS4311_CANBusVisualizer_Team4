import React, {useState, useEffect} from 'react'
import '../sync.css';
import Comp from '../images/Comp3.png'
import {useNavigate} from "react-router-dom";
import axios from 'axios'


function Sync() {
  const navigate = useNavigate();
  const [filled, setFilled] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	useEffect(() => {
		if (filled < 100 && isRunning) {
			setTimeout(() => setFilled(prev => prev += 2), 50)
		}
	},[filled, isRunning])

  const [ip, setIP] = useState('');

  //ip
  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
  }
  
  useEffect( () => {
    //passing getData method to the lifecycle method
    getData()

  }, [])

  return (
    <div className='sync-project'>
      <div className="sync-project-container">
        <form>
          <div className="form-group row">
            <label className='col-sm-2 col-form-label col-form-label-sm create-titles'>Receiver IP Address
            <br/>
                <span className='title-required'>(Required)</span>
            </label>
            <div className="col-sm-10">
                <input 
                  type="text" id="p-name" 
                  name="ip-address" 
                  placeholder="192.168.1.1" 
                  required
                  className="form-control"
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
                  className='form-control' 
                  type="text" 
                  id="username-sync" 
                  name="username" 
                  placeholder="Username"
                  required
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
                  className='form-control' 
                  type="text" 
                  id="password-sync" 
                  name="password" 
                  placeholder="Password"
                  required
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
		    <div className="progressbar">
			  <div style={{
				  height: "100%",
				  width: `${filled}%`,
				  backgroundColor: "#1d44719d",
				  transition:"width 0.1s"
			  }}></div>
			  <span className="progressPercent">{ filled }%</span>
		  </div>
		  <button className="sync-button" onClick={() => {setIsRunning(true)}}>Sync</button>
	</div>
        <form>
          <button className="cancel-sync-button" onClick={() => navigate("../")}>Cancel</button>  
        </form>
      </div>
      <div className= 'ip'>
      <h4>Your IP Address is: {ip}</h4>
    </div>
    </div>
  );
 }



export default Sync;
