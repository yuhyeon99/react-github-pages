import React from 'react';
import { Link } from 'react-router-dom';
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Member = (props) => {

    const {handleLogout,userCurrent} = props;
    
    return(
            <>
                <ul>
                    <li className="memberBg"></li>
                    <li className="memberImg">
                        <div><FontAwesomeIcon style={{cursor:"pointer"}} icon={faCamera} /></div>
                    </li>
                    <li className="memberText">
                        <Link to="/profile">
                            <p>{userCurrent.email}님 어서오세요!</p>
                        </Link>
                    </li>
                    <li className="logoutBtn"><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </>
    )
}

export default Member;