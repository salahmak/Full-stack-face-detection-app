import React from 'react';
import Logo from './logo.jsx'

const Navigation = ({ onRouteChange, isSignedIn }) => {
    return (
        <>
            <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Logo />

                {
                    isSignedIn
                        ? <p onClick={() => onRouteChange('signout')} className="f3 link dim white ma4 underline pointer">Sign Out</p>
                        :
                        <div> <p onClick={() => onRouteChange('signup')} className="f3 link dim white ma4 underline pointer">Register</p>
                            <p onClick={() => onRouteChange('signin')} className="f3 link dim white ma4 underline pointer">Sign in</p> </div>
                }


            </nav>


        </>
    )
}

export default Navigation;