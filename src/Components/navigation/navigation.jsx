import React from 'react';
import Logo from './logo.jsx'

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {

        return (
            <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Logo />
                <p onClick={() => onRouteChange('signout')} className='f3 white link dim black pa3 pointer'>Sign Out</p>
            </nav>
        );
    } else {

        return (
            <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Logo />
                <div>
                    <p onClick={() => onRouteChange('signin')} className='f3 white link dim black pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 white link dim black pa3 pointer'>Register</p>
                </div>

            </nav>
        );
    }
}

export default Navigation;

