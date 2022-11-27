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
                    <input className='test' type="file" webkitdirectory="" directory=""></input> {/* This is hidden with css. */}</li>
                <li><button onClick={() => navigate("/sync")} className='thirdButton' type='button'></button></li>
                <li><button className='fourthButton' type='button'></button></li>
                <li><button className='fifthButton' type='button'></button></li>
            </ul>
        </div>
    </div>
    );
}

export default Home