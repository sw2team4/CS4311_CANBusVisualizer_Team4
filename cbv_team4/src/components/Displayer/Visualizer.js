import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Visualizer.css'
import CustomNodeFlow from './Map/Flow';
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

//For Testing purposes

export default class Visualizer extends Component {

    time = 2000
    // num_packets = 1
    // current_index = 0
    pause_traffic = 1
    interval_callback = null
    // first_start = true


    //For Testing purposes
    //fetch the local can file and create to a an array string, where each element represents a row from the packet tables (AKA a packet)
    // async getCANFile() {
    //     var text;
    //     const file = fetch(raw).then(r => r.text()).then(text => { return text });
    //     await file.then(value => {
    //         text = value.split('\n');

    //     }).catch(err => {
    //         console.log(err);
    //     });
    //     //console.log(text);
    //     return text;

    // }

    ToggleTraffic() {
        this.pause_traffic ^= 1
        if (this.pause_traffic) {
            this.PauseTraffic()
        } else {
            this.StartTraffic()
        }

    }

    PauseTraffic() {
        clearInterval(this.interval_callback)

        fetch('http://localhost:5000/pause_traffic')
            .catch((e) => {
                console.log(e)
            })
        
        console.log('Traffic Paused')
    }

    StartTraffic() {
        fetch('http://localhost:5000/start_traffic')
            .catch((e) => {
                console.log(e)
            })
        
        console.log('Traffic Started')

        this.interval_callback = setInterval(async () => {
            fetch('http://localhost:5000/get_packet')
                .then(response =>
                    response.json()
                )
                .then(data => {
                    // data is a parsed JSON object
                    // console.log(data)
                    this.displayPackets(data)
                })
                .catch(
                    (e) => {
                        console.log(e)
                    }
                )
            // current_index += 1
            // this.parseCANFile(can_file)

            // var wait_time = this.time / this.num_packets

            // var target = this.current_index + this.num_packets
            // for (let i = this.current_index; i < target; i++) {
            //     setTimeout((packet = response.data[i]) => this.displayPackets(packet), wait_time)
            // }
        }, this.time)
    }



    //get packets from database and display from table
    async displayPackets(packet) {
        var packetTimestamp = packet.timestamp
        var packetType = packet.type
        var packetID = packet.id
        var packetData = packet.data

        document.getElementById('pkt').innerHTML += `<tr>
                <td>${packetTimestamp}</td>
                <td>${packetType}</td>
                <td>${packetID}</td>
                <td>${packetData}</td> 
                </tr>`

        // this.current_index++

    }

    // async startTraffic() {
    //     this.pas
    // }

    //parse packet file into 4 data fields, push to data base
    // async parseCANFile(text) {
    //     // axios.get('http://localhost:5000/packets/')
    //     //     .catch((error) => {
    //     //         console.log(error);
    //     //     })
    //     const lines = await text;
    //     var target = this.current_index + this.num_packets
    //     for (let i = this.current_index; i < target; i++) {
    //         var msg = lines[i].split(';');

    //         var packet = {
    //             index: i,
    //             timestamp: msg[0],
    //             packet_type: msg[1],
    //             packet_id: msg[2],
    //             packet_data: msg[3],
    //         }


    //         // console.log(packet);
    //         axios.post('http://localhost:5000/packets/add', packet)
    //             .then(res => console.log(res.data));

    //     }

    // }

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
                    <CustomNodeFlow />
                </div>
            </div>
        )
    }
}