import React, { Component } from 'react';
import './loader.css'

class Loader extends Component {

    render() {
        return (
            <div className="loader-wrapper">
                <div className="lds-dual-ring"></div>
            </div>
        );
    }
}

export default Loader;