import React from 'react';
import { Link } from 'react-router-dom';
const Member = (props) => {

    const {handleLogout,userCurrent} = props;
    
    return(
            <>
                <p><button onClick={handleLogout}>Logout</button></p>
                <p>HI! <Link to="/profile"><b>{userCurrent.email}</b>님</Link></p>
            </>
    )
}

export default Member;