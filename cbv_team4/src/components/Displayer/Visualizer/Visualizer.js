import React, { Component, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Visualizer.css'
import CustomNodeFlow from '../Map/Flow';

// React stuff
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// Popups
import EditPopup from '../Popups/Edit/EditPopup';
import SavePopup from '../Popups/SaveProject/SavePopup';
import SavePacketPopup from '../Popups/SavePacket/SavePacketPopup';
// import {getPackets} from './SocketCAN.js'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
//TODO: table on hover stops working after traffic starts
import DummyData from './DummyData';
import ExportNodes from '../Popups/Export/ExportNodes';
import ExportMap from '../Popups/Export/ExportMap';
import ExportTraffic from '../Popups/Export/ExportTraffic';
import ExportLimit from '../Popups/Export/ExportLimit';

//TODO: table on hover stops working after traffic starts
//Found issue, overlay tags one element and not by iteration - Talk with tony for feedback

export default class Visualizer extends Component {

    time = 2000
    // num_packets = 1
    // current_index = 0
    pause_traffic = 1
    interval_callback = null
    // first_start = true



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
        }, this.time)
    }

    //get packets from database and display from table
    async displayPackets(packet) {
        var packetTimestamp = packet.timestamp
        var packetType = packet.type
        var packetID = packet.id
        var packetData = packet.data

        sessionStorage.setItem("display packet", packet)

        document.getElementById('pkt').innerHTML += `
                <tr>
                <td>${packetTimestamp}</td>
                <td>${packetType}</td>
                <td>${packetID}</td>
                <td>${packetData}</td>
                </tr>
        `
        document.getElementById('dc').innerHTML += `   
                ${packet.decoded_id}\n
                ${packet.decoded_name}\n
                ${packet.decoded_comment}\n
        `
        // this.current_index++

    }


    render() {

        return (
            <div className='visualizer'>

                <div className='titlebar'>
                    <div className='hihi'>
                        <Button className='trafficButton' variant="secondary" size='sm'>Traffic</Button>
                        <Button className='mapButton' variant="secondary" size='sm'>CAN Map</Button>
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
                                                <NavDropdown.Item>
                                                    <ExportTraffic></ExportTraffic>
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <ExportLimit></ExportLimit>
                                                </NavDropdown.Item>
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
                                    <OverlayTrigger
                                        trigger="hover"
                                        placement="right"
                                        overlay={
                                            <Popover id={'popover-positioned-right'}>
                                                <Popover.Header as="h3">{'Decoded Information'}</Popover.Header>
                                                <Popover.Body>
                                                    <strong>Decoded Packet</strong>
                                                    <br />
                                                    {/* {DummyData && DummyData.map(({id}) =>  (
                                            <div key={id} className="row">
                                                <strong>{id}</strong>
                                            </div>
                                        ))} */}
                                                </Popover.Body>
                                            </Popover>
                                        }
                                    >
                                        <tr>
                                            <td>hi</td>
                                            <td>hi</td>
                                            <td>hi</td>
                                            <td>hi</td>
                                        </tr>
                                    </OverlayTrigger>
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
            </div>
        )
    }
}