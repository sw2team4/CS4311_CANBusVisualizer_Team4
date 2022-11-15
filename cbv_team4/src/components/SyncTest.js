import React, { Component } from 'react'

export default class Visualizer extends Component {

    constructor(props) {
        super(props);

        this.onChangeSrcData = this.onChangeSrcData.bind(this);
        this.onChangeDestIP = this.onChangeDestIP.bind(this);
        this.onChangeDestUN = this.onChangeDestUN.bind(this);
        this.onChangeDestPW = this.onChangeDestPW.bind(this);
        this.onChangeDestFldr = this.onChangeDestFldr.bind(this);

        this.state = {
            src_data: '',
            dest_ip: '',
            dest_un: '',
            dest_pw: '',
            dest_fldr: '',
        }

    }//constructor


    onChangeSrcData(e) {
        this.setState({
            src_data: e.target.value
        })
    }
    onChangeDestIP(e) {
        this.setState({
            dest_ip: e.target.value
        })
    }
    onChangeDestUN (e) {
        this.setState({
            dest_un: e.target.value
        })
    }
    onChangeDestPW(e) {
        this.setState({
            dest_pw: e.target.value
        })
    }
    onChangeDestFldr(e) {
        this.setState({
            dest_fldr: e.target.value
        })
    }

    onSubmit(e) {
    }
    

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit} action="http://localhost:5000/sync" method="post">
                    <label>
                        SRC DATA:
                        <input 
                            type="text" name="srcdata_" 
                            value={this.state.src_data}
                            onChange={this.onChangeSrcData}
                        />
                    </label>
                    <br/>
                    <label>
                        DEST IP:
                        <input 
                            type="text"
                            name="ip_" 
                            value={this.state.dest_ip}
                            onChange={this.onChangeDestIP}
                        />
                    </label>
                    <br/>
                    <label>
                        DEST UN:
                        <input 
                            type="text"
                            name="un_" 
                            value={this.state.dest_un}
                            onChange={this.onChangeDestUN}
                        />
                    </label>
                    <br/>
                    <label>
                        DEST PW:
                        <input 
                            type="text"
                            name="pw_" 
                            value={this.state.dest_pw}
                            onChange={this.onChangeDestPW}    
                        />
                    </label>
                    <br/>
                    <label>
                        DEST FLDR:
                        <input 
                            type="text"
                            name="destfldr_" 
                            value={this.state.dest_fldr}
                            onChange={this.onChangeDestFldr}    
                        />
                    </label>

                    <input type="submit" name="Submit" onChange={this.onSubmit} value ="Submit"/>
                </form>


            </div>

        );
    }
}