import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import logo from './chip.png'

const Logo = () => {
    const options = {
        reverse: false,
        max: 55

    }
    return (
        <div className="ma3 mt0">
            <Tilt className="Tilt" options={options} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner mt3"> <img src={logo} alt="logo" /> </div>
            </Tilt>
        </div>
    )
}
export default Logo;