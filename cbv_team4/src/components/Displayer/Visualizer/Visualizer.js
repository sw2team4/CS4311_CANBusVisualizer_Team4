import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Visualizer.css'
import CustomNodeFlow, { initialNodes } from '../Map/Flow';

// React stuff
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import InfiniteScroll from 'react-infinite-scroll-component';
// Popups
import EditPopup from '../Popups/Edit/EditPopup';
import SavePopup from '../Popups/SaveProject/SavePopup';
import SavePacketPopup from '../Popups/SavePacket/SavePacketPopup';
import OffLimits from '../Popups/Off-limits/OffLimits';
// import {getPackets} from './SocketCAN.js'
//TODO: table on hover stops working after traffic starts
import ExportNodes from '../Popups/Export/ExportNodes';
import ExportTraffic from '../Popups/Export/ExportTraffic';
import ExportLimit from '../Popups/Export/ExportLimit';

import { toPng } from 'html-to-image';


//TODO: table on hover stops working after traffic starts
//Found issue, overlay tags one element and not by iteration - Talk with tony for feedback
export default class Visualizer extends Component {

    time = 2000
    num_packets = 1
    current_index = 1
    pause_traffic = 1
    interval_callback = null
    pid = null
    // first_start = true

    downloadImage(dataUrl) {
        const a = document.createElement('a');
      
        a.setAttribute('download', 'reactflow.png');
        a.setAttribute('href', dataUrl);
        a.click();
      }
    

    AddNode(packet) {
        if (this.current_index > 20){
            return
        }
    	initialNodes[this.current_index].data.label = packet.decoded_comment
        initialNodes[this.current_index].hidden = false
        this.current_index++;
        ///////////
    }

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
        var packetName = packet.decoded_name
        var packetComment = packet.decoded_comment

        sessionStorage.setItem("packet", packet)

        this.AddNode(packet)
        document.getElementById('pkt').innerHTML += `
                <tr>
                <td>${packetTimestamp}</td>
                <td>${packetType}</td>
                <td>${packetID}</td>
                <td>${packetData}</td>
                <td>${packetName}</td>
                <td>${packetComment}</td>
                </tr>
        `
        this.num_packets+=1

    }

    componentDidMount() {
        fetch('http://localhost:5000/get_pid')
            .then(response =>
                response.json()
            )
            .then(data => {
                //for (i -> lengt) this.displayPackets()
                console.log(data.packets)
                for (var i = 0; i < data.packets.length; i++) {
                    //console.log(data.packets[i])
                    this.displayPackets(data.packets[i])
                }
            })
            .catch(
                (e) => {
                    console.log(e)
                }
            )
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
                                                    <OffLimits/>
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
                            <InfiniteScroll
                            pageStart={0}
                            dataLength={-1}
                            hasMore={true}
                            useWindow={false}
                            endMessage={
                              <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                              </p>
                            }
                            >
                                <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Timestamp</th>
                                            <th>Type</th>
                                            <th>ID</th>
                                            <th>Data</th>
                                            <th>Name</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody id = 'pkt'>
                                        
                                    </tbody>
                                </Table>
                            </InfiniteScroll>
                        </div>
                    </div>


                    <div className='mapDisplayer'
                    >
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
                                            <NavDropdown.Item>
                                                <ExportNodes></ExportNodes>
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item>
                                            <Button className='button-color' onClick={() => {
                                                    toPng(document.querySelector('.react-flow'))
                                                    .then(this.downloadImage);}}>
                                                    Export CAN Bus Map
                                                </Button>
                                            </NavDropdown.Item>
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
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                                <label className=''>Map</label>
                            </Container>
                        </Navbar>
                    </div>

                    <div className='can-map' id='cmap'>
                        <CustomNodeFlow />
                    </div>
                </div>
            </div>
        )
    }
}