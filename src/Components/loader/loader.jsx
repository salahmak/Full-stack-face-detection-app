import React, { Component } from 'react';
import './loader.css'

class Loader extends Component {

    render() {
        return (
            <div class="loader-wrapper">
                <div class="lds-dual-ring"></div>
            </div>
        );
    }
}

export default Loader;