import React, { Component } from 'react'
import './Visualizer.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';
import Popups from './Popups';


export default class Visualizer extends Component {
    render(){
        return(
            <div className='visualizer'>
                <div className='visualizer-container'>
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
                                <input type='button' className='pauseButton' value='||'/>
                                <label className=''>Traffic</label>
                            </Container>
                            </Navbar>
                        </div>
                        <div className='table'>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    {Array.from({ length: 4 }).map((_, index) => (
                                    <th key={index}>Table heading</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>2</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                ))}
                                </tr>
                                <tr>
                                    <td>3</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>4</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>5</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                ))}
                                </tr>
                                <tr>
                                    <td>6</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>7</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>8</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                ))}
                                </tr>
                                <tr>
                                    <td>9</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>10</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>11</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                ))}
                                </tr>
                                <tr>
                                    <td>12</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>13</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>14</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                ))}
                                </tr>
                                <tr>
                                    <td>15</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>16</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>17</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                ))}
                                </tr>
                                <tr>
                                    <td>18</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>19</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>20</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                ))}
                                </tr>
                                <tr>
                                    <td>21</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>22</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>23</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                ))}
                                </tr>
                                <tr>
                                    <td>24</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                    <td key={index}>Packet Information {index}</td>
                                    ))}
                                </tr>
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
            </div>
        )
    }
}