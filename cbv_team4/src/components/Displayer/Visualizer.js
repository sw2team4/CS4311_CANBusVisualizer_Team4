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
import axios from 'axios';
// import {getPackets} from './SocketCAN.js'

//For Testing purposes
import raw from '/home/kali/CS4311_CANBusVisualizer_4/cbv_team4/src/J1939-Sample-Data-CL3000.txt';

export default class Visualizer extends Component {

    time = 1000
    num_packets = 1
    current_index = 0


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

    async StartTraffic() {
        var can_file = this.getCANFile()

        setInterval(() => {
            this.parseCANFile(can_file)
            this.displayPackets()
        }, this.time)
    }


    //get packets from database and display from table
    async displayPackets() {
        var target = this.current_index + this.num_packets
        for (let i = this.current_index; i < target; i++) {
            //get from database
            var response = await axios.get("http://localhost:5000/packets/?index=" + i);

            var packet = response.data[i]

            //delay the display of the packets
            var packetTimestamp = packet.timestamp;
            var packetType = packet.packet_type;
            var packetID = packet.packet_id
            var packetData = packet.packet_data;

            // var cellIndex = 3;
            // var table = document.getElementById('table1');
            // var num_columns = table.rows[0].cells.length;
            // var cell = table.rows[Math.floor(cellIndex/num_columns)].cells[cellIndex % num_columns];
            // document.getElementById('table1').rows[rowIndex].cells[cellIndex];

            document.getElementById('pkt').innerHTML += `<tr>
                <td>${packetTimestamp}</td>
                <td>${packetType}</td>
                <td>${packetID}</td>
                <td>${packetData}</td> 
                </tr>`

            //var table = document.getElementById('pkt');
            //table.scrollTo(-1)

            this.current_index++
            setTimeout(() => null, this.time / this.num_packets)
        }
        
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
                        <Button variant="secondary" size='sm'>Traffic</Button>
                        <Button variant="secondary" size='sm'>CAN MAP</Button>
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

                                <input onClick={() => {
                                    this.StartTraffic()
                                }}
                                    type='button' className='pauseButton' value='||' />
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