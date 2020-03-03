import React, { Component } from 'react';
import './fullScreenLoader.scss'
class FullSreenLoader extends Component {
    render() { 
        return ( 
            <div className="fullscreen_loader_main" >
                <div className="fullscreen_loader"></div>
            </div>
        );
    }
}
 
export default FullSreenLoader;