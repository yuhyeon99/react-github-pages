import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Member = (props) => {

    const {userRef,handleLogout,userCurrent} = props;
    const [profileImg, setProfileImg] = useState('');

    userRef.doc(userCurrent.uid).get().then((doc)=>{
        const fileUrl = doc.data().profileImg;
        setProfileImg(fileUrl);
    });


    return(
            <>
                <ul>
                    <li className="memberBg"></li>
                    <li className="memberImg">
                        <div style={profileImg ? {background:`url(${profileImg})center center /cover`} : {} } >
                            {profileImg ? (
                                <></>
                            ) : (
                                <FontAwesomeIcon style={{cursor:"pointer"}} icon={faCamera} />
                            )}
                        </div>
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