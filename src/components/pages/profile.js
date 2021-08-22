import React, { useEffect, useState } from 'react';
import { faEdit, faUniversity, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = (props) =>{
    const [update, setUpdate] = useState(true);
    const {user, userCurrent, userRef} = props;
    
    const [info, setInfo] = useState({
        name:"Name",
        massage:"Massage",
        introduce:"Introduce",
        job:"Job",
        location:"Location",
        college:"College"
    });

    function getInfo(){
        userRef.doc(userCurrent.uid).get().then((doc)=>{
            if(doc.name){
                setInfo(doc.data());
            }else{
                console.log("none");
            }
        });
    }

    useEffect(()=>{
        getInfo();
    }, []);
    return (
        <>
            <li className="profile subCenter" >
                <div className="topTitle">
                    <p><b>회원님의 프로필 페이지 입니다.</b></p>
                </div>
                <div className="infoBox">
                    <ul>
                        <li className="infoBg"></li>
                        <li className="profileImg"><FontAwesomeIcon style={{cursor:"pointer"}} icon={faCamera} /></li>
                        <li className="infoArea">
                            <p className="update"><FontAwesomeIcon onClick={()=>setUpdate(!update)} style={{cursor:"pointer"}} icon={faEdit} /></p>
                            <p className="name">{info.name}</p>
                            <p className="college"><FontAwesomeIcon style={{cursor:"pointer"}} icon={faUniversity} /> {info.college}</p>
                            <p className="job">{info.job}</p>
                            <p className="location">{info.location}</p>
                            <p className="introduce">{info.massage}</p>
                            <p className="infoBtn active">관심분야:</p><p className="infoBtn">섹션 등록</p><p className="infoBtn">더 보기</p>
                        </li>
                    </ul>
                </div>
            </li>
            <li className="right">
                <div className="boxmenu_1"></div>
                <div className="boxmenu_2"></div>
                <div className="boxmenu_3"></div>
            </li>
        </>
    )
}
export default Profile;