import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Member = (props) => {

    const {userRef,handleLogout,userCurrent} = props;
    const [memberImg, setMemberImg] = useState([]);

    function getMember(){
        
        userRef.doc(userCurrent.uid).get().then((doc)=>{
            const fileUrl = doc.data().profileImg;
            setMemberImg(fileUrl);
        }).catch((err)=>{
            console.log(err);
        });
        
    }

    useEffect(()=>{
        getMember();
        // userRef.get().then((item)=>{ 
        //     const items = item.docs.map((doc) => doc.data());
            
        // });
    },[]);


    return(
            <>
                <ul>
                    <li className="memberBg"></li>
                    <li className="memberImg">
                        <div style={memberImg ? {background:`url(${memberImg})center center /cover`} : {} } >
                            {memberImg ? (
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