import React from 'react';
import axios from 'axios';

import NetworkTableGeneral from './NetworkTableGeneral';
import NetworkTableSpeeds from './NetworkTableSpeeds';

import TriangleLoader from '../Loaders/TriangleLoader';

import { Box, Button } from 'grommet';

class NetworkSpeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = { client: {}, server: {} }
    }

    resetState = () => {
        this.setState({ client: {}, server: {} });
    }

    runNetworkTest = () => {
        this.resetState();
        //https://wheretocode-master.herokuapp.com/api/network
        axios.get('http://localhost:8080/api/network')
             .then(res => {
                            console.log(res.data)

                            this.setState({ 
                                download: res.data.speeds.download,
                                upload: res.data.speeds.upload,
                                originalDownload: res.data.speeds.originalDownload.toFixed(0),
                                originalUpload: res.data.speeds.originalDownload.toFixed(0),
                                client: res.data.client,
                                server: res.data.server
                            })
                        })
             .catch(err => console.log(err));
    }

    componentDidMount() {
        this.runNetworkTest();
    }

    render() {
        return(
            <Box direction='row'
                 justify='evenly'
                 pad='medium'
                 background='dark-2'
            >


                {
                    Object.keys(this.state.client).length > 0 ? <Box>
                                                                    <Box direction='row'>
                                                                        <NetworkTableGeneral data={this.state} />
                                                                        <NetworkTableSpeeds data={this.state} />
                                                                    </Box>

                                                                    <Button label='Run Test' 
                                                                            color='brand' 
                                                                            alignSelf='center' 
                                                                            pad='large' 
                                                                            onClick={this.runNetworkTest}
                                                                    />
                                                                </Box>
                                                              
                                                              : <TriangleLoader/>
                }

            </Box>
        );
    }

}

export default NetworkSpeed;