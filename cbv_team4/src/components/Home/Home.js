/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../Home/Home.css';
import Devcom from './images/DevcomLogo.png'
import {useNavigate} from "react-router-dom";

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
                    <form id="open-project" action="http://localhost:5000/open_project" method="post">
                        <input className='test' id="import-project" type="file" accept=".cbp" onChange={action => window.location.href='http://localhost:5000/open_project?import-project=TEST.cbp'}></input> {/* This is hidden with css. */}
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