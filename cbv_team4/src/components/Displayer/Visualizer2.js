import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Visualizer.css'
// import CustomNodeFlow from './Map/Flow';
import UpdateNode from './Map/updateNode';


// React stuff
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// Popups
import EditPopup from './Popups/EditPopup';
import SavePopup from './Popups/SavePopup';
import SavePacketPopup from './Popups/SavePacketPopup';
// import {getPackets} from './SocketCAN.js'

//For Testing purposes
import raw from '/home/kali/CS4311_CANBusVisualizer_4/cbv_team4/src/J1939-Sample-Data-CL3000.txt';

export default class Visualizer extends Component {

    time = 1000
    num_packets = 1
    current_index = 0
    pause_traffic = 1
    interval_callback = null


    //For Testing purposes
    //fetch the local can file and create to a an array string, where each element represents a row from the packet tables (AKA a packet)
    async getCANFile() {
        var text;
        const file = fetch(raw).then(r => r.text()).then(text => { return text });
        await file.then(value => {
            text = value.split('\n');

        }).catch(err => {
            console.log(err);
        });
        //console.log(text);
        return text;

    }

    async ToggleTraffic() {
        this.pause_traffic ^= 1
        if (this.pause_traffic) {
            this.PauseTraffic()
        } else {
            this.StartTraffic()
        }
    }

    async PauseTraffic() {
        clearInterval(this.interval_callback)

        console.log("Live Traffic Paused")
    }

    async StartTraffic() {
        console.log("Live Traffic Started")

        var can_file = this.getCANFile()

        this.interval_callback = setInterval(async () => {
            this.parseCANFile(can_file)

            var wait_time = this.time / this.num_packets
            var response = await axios.get("http://localhost:5000/packets/")

            var target = this.current_index + this.num_packets
            for (let i = this.current_index; i < target; i++) {
                setTimeout((packet = response.data[i]) => this.displayPackets(packet), wait_time)
            }
        }, this.time)
    }


    //get packets from database and display from table
    async displayPackets(packet) {
        var packetTimestamp = packet.timestamp
        var packetType = packet.packet_type
        var packetID = packet.packet_id
        var packetData = packet.packet_data

        document.getElementById('pkt').innerHTML += `<tr>
                <td>${packetTimestamp}</td>
                <td>${packetType}</td>
                <td>${packetID}</td>
                <td>${packetData}</td> 
                </tr>`

        this.current_index++

    }

    // async startTraffic() {
    //     this.pas
    // }

    //parse packet file into 4 data fields, push to data base
    async parseCANFile(text) {
        // axios.get('http://localhost:5000/packets/')
        //     .catch((error) => {
        //         console.log(error);
        //     })
        const lines = await text;
        var target = this.current_index + this.num_packets
        for (let i = this.current_index; i < target; i++) {
            var msg = lines[i].split(';');

            var packet = {
                index: i,
                timestamp: msg[0],
                packet_type: msg[1],
                packet_id: msg[2],
                packet_data: msg[3],
            }


            // console.log(packet);
            axios.post('http://localhost:5000/packets/add', packet)
                .then(res => console.log(res.data));

        }

    }




    render() {
        return (
            <div className='visualizer'>

                <div className='titlebar'>
                    <div className='hihi'>
                        <Button className='trafficButton' variant="secondary" size='sm'>Traffic</Button>
                        <Button className='mapButton' variant="secondary" size='sm'>CAN Map</Button>
                    </div>
                    <label className='displayerName'>CAN BUS VISUALIZER</label>
                    <Button onClick={event => window.location.href = '/'} className='closeButton' variant='danger' size='sm'>X</Button>


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
                                            <NavDropdown.Item>
                                                <SavePopup></SavePopup>
                                            </NavDropdown.Item>
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
                                                Edit Packet
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item>
                                                Replay Packet
                                            </NavDropdown.Item>   
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item>
                                                <SavePacketPopup></SavePacketPopup>
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item>
                                                Annotate Packets
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>

                                <input onClick={() => {
                                    this.ToggleTraffic()
                                }}
                                    type='button' className='pauseButton' value='||' />
                                <label className=''>Traffic</label>
                            </Container>
                        </Navbar>
                    </div>
                    <div className='traffic-table-container'>
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
                                        <NavDropdown.Item>
                                            <SavePopup></SavePopup>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </NavDropdown>
                                    {/* Nodes */}
                                    <NavDropdown title="Nodes" id="basic-nav-dropdown">
                                        <EditPopup></EditPopup>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/">Drag Nodes</NavDropdown.Item>
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
                <div className='can-map'>
                    <UpdateNode/>
                </div>
            </div>
        )
    }
}