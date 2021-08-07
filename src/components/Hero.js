import React from 'react';

const Hero = (props) => {
    
    return(
            <>
                <p><button onClick={props.handleLogout}>Logout</button></p>
                <p>HI! 님</p>
            </>
    )
}

export default Hero;