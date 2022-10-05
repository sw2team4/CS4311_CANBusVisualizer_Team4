import React, { Component } from 'react'
import './Visualizer.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Popups from './Popups';
// import {getPackets} from './SocketCAN.js'
import {exec} from 'child_process';




//For Testing purposes
import raw from '/home/kali/CS4311_CANBusVisualizer_4/cbv_team4/src/J1939-Sample-Data-CL3000.txt';



export default class Visualizer extends Component {


//For Testing purposes
//fetch the local can file and create to a an array string, where each element represents a row from the packet tables (AKA a packet)
    async getCANFile(){
        var text;
         const file = fetch(raw).then(r=> r.text()).then(text=> {return text});
         await file.then(value=>{
            text =  value.split('\n');

         }).catch(err => {
            console.log(err);
         });
         //console.log(text);
         return text;

    }

    //parse packet file into 4 data fields for the table
    async parseCANFile(text){
        

        const lines= await text;
        var packet;
        var packetTimestamp = '';
        var packetType = '';
        var packetID =  '';
        var packetData = '';
        for(var i = 0; i < 5; i++){
            //refactor for socketCAN
            packet = lines[i].split(';')
            packetTimestamp = packet[0];
            packetType = packet[1];
            packetID = packet[2];
            packetData = packet[3];
            document.getElementById('pkt').innerHTML += `<tr>
            <td>${packetTimestamp}</td>
            <td>${packetType}</td>
            <td>${packetID}</td>
            <td>${packetData}</td> 
            </tr>`
        } 
    }
    async executeShellCommands(){
        const {exec} = require('child_process');
    
        exec('./home/kali/CS4311_CANBusVisualizer_4/scripts/socket.sh');
    
    }


    render(){
        return(
            <div className='visualizer'>
                
                    <div className='titlebar'>
                        <div className='hihi'>
                            <Button variant="secondary" size='sm'>Traffic</Button>
                            <Button variant="secondary" size='sm'>CAN MAP</Button>
                        </div>
                        <label className='displayerName'>CAN BUS VISUALIZER</label>
                        <Button onClick={event => window.location.href='/'} className='closeButton' variant='danger' size='sm'>X</Button>


                    </div>
                    <div className='trafficDisplayer'>
                        <div className='navigation-bar'>
                            <Navbar expand="lg" variant='dark' className='color-nav'>
                            <Container>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    {/* File */}
                                    <NavDropdown title="File" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/">Save Project</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/">Open Saved Project</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    </NavDropdown>
                                    {/* View */}
                                    <NavDropdown title="View" id="basic-nav-dropdown">
                                    <NavDropdown.Item>Filter Packet
                                        <NavDropdown title="Component" id="basic-nav-dropdown">
                                            <NavDropdown.Item>Hi</NavDropdown.Item>
                                        </NavDropdown>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/">Sort Packet</NavDropdown.Item>
                                    
                                    <NavDropdown.Divider />
                                    </NavDropdown>
                                    {/* Packet */}
                                    <NavDropdown title="Packet" id="basic-nav-dropdown">
                                    <NavDropdown.Item>
                                    <Popups></Popups>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/">Replay Packets</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/">Save Packets</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/">Annotate Packets</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    </NavDropdown>
                                </Nav>
                                </Navbar.Collapse>
                                
                                <input onClick={()=> {
                                                    // const text = this.getCANFile();
                                                    // this.parseCANFile(text);
                                                    // const temp = getPackets();
                                                    this.executeShellCommands();
                                                }}
                                    type='button' className='pauseButton' value='||'/>
                                <label className=''>Traffic</label>
                            </Container>
                            </Navbar>
                        </div> 
                        <div className='table'>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Type</th>
                                    <th>ID</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody id='pkt'>
                            </tbody>
                        </Table>
                        </div>
                    </div>
                    <div className='mapDisplayer'>
                    <Navbar expand="lg" variant='dark' className='color-nav'>
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* File */}
                            <NavDropdown title="File" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Save Project</NavDropdown.Item>
                            <NavDropdown.Divider />
                            </NavDropdown>
                            {/* Edit */}
                            <NavDropdown title="Edit" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Rename Nodes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Assign Icon</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Change Visibility</NavDropdown.Item>
                            <NavDropdown.Divider />
                            </NavDropdown>
                            {/* Nodes */}
                            <NavDropdown title="Nodes" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Drag Nodes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Add Relationship</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Search Nodes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Select All</NavDropdown.Item>
                            <NavDropdown.Divider />
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                        <label className=''>Map</label>
                    </Container>
                    </Navbar>
                    </div>
                </div>
                
        )
    }
}