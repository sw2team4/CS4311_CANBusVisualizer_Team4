import React from 'react';
import '../displayer.css'


export default class Displayer extends React.Component{
    render(){
        return(
            <div className='Displayer'>
                <div className="shield">
                    <div className="modal">
                        <div className="header">
                            <span className='displayerTitle'>CAN Bus Visualizer</span>
                            <span className="buttons">
                                <span className="min">_</span>
                                <span >[ ]</span>
                                <span class="close">X</span>
                            </span>
                        </div>
                        <div className="content"></div>
                    </div>
                </div>
                <div className="shield-traffic">
                    <div className='modal-traffic'>
                        <div className='header-traffic'>
                            <span className='screenTitlePacket'>Traffic Displayer</span>
                            <span className="buttons">
                                <span className="min">_</span>
                                <span >[ ]</span>
                                <span class="close">X</span>
                            </span>
                        </div>
                        <div className="content">Table with Packets</div>
                    </div>
                </div>
                <div className="shield-nodes">
                    <div className='modal-nodes'>
                        <div className='header-nodes'>
                            <span className='screenTitleNodes'>Nodes Displayer</span>
                            <span className="buttons">
                                <span className="min">_</span>
                                <span >[ ]</span>
                                <span class="close">X</span>
                            </span>
                        </div>
                        <div className="content">Table with Packets</div>
                    </div>
                </div>
            </div>
        )
    }
}
