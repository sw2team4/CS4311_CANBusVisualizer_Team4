/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../Home/Home.css';
import Devcom from './images/DevcomLogo.png'
import {useNavigate} from "react-router-dom";

var project_file = null
function onChange(e) {
    project_file = e.target.value;
}

function Home() {
    const navigate = useNavigate();
    return (
    <div className='home'>
        <div className='logo-container'>
            <img className='logo' src={Devcom}/>
        </div>
        <h1 className='project-name'>CAN Bus Visualizer</h1>
        <div className='button-group'>
            <ul>
                <li><button onClick={() => navigate("/create-project")} className='firstButton' type='button'></button></li>
                <li>
                    <button className='secondButton' type='button'></button>
                    <form method="post"> 
                        <input value={project_file} onChange={onChange} onSubmit={() => {window.location.href='http://localhost:5000' ('/open_project')}} className='test' id="import-project" type="file" webkitdirectory="" directory=""></input> {/* This is hidden with css. */}
                    </form>
                </li>
                <li><button onClick={() => navigate("/sync")} className='thirdButton' type='button'></button></li>
                <li><button className='fourthButton' type='button'></button></li>
                <li><button className='fifthButton' type='button'></button></li>
            </ul>
        </div>
    </div>
    );
}

export default Home