import React, { useEffect, useState } from 'react';
import { faEdit, faUniversity, faCamera, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
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

    const [updateInfo, setUpdateInfo] = useState({
        name:"Name",
        massage:"Massage",
        introduce:"Introduce",
        job:"Job",
        location:"Location",
        college:"College"
    });
    function getInfo(){
        userRef.doc(userCurrent.uid).get().then((doc)=>{
            if(doc.exists){
                setInfo(doc.data());
                setUpdateInfo(doc.data());
            }else{
    
            }
        });
    }

    const {name, massage, introduce, job, location, college} = updateInfo;
    

    const onChange = e =>{
        const {value, name} = e.target;
        setUpdateInfo({
            ...updateInfo,
            [name] : value
        });
    };

    function updateProfile(updateInfo){
        const docRef = userRef.doc(userCurrent.uid);
        docRef
        .update(updateInfo)
        .catch((err)=>{
            console.log(err);
        });
        getInfo();

        setUpdate(!update);
    };

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
                            {update ? (
                                <>
                                    <p className="update"><FontAwesomeIcon onClick={()=>setUpdate(!update)} style={{cursor:"pointer"}} icon={faEdit} /></p>
                                    <p className="name">{info.name}</p>
                                    <p className="college"><FontAwesomeIcon style={{cursor:"pointer"}} icon={faUniversity} /> {info.college}</p>
                                    <p className="job">{info.job}</p>
                                    <p className="location">{info.location}</p>
                                    <p className="introduce">{info.massage}</p>
                                    <p className="infoBtn active">관심분야:</p><p className="infoBtn">섹션 등록</p><p className="infoBtn">더 보기</p>
                                </>
                            ) : (
                                <>
                                    <p className="update"><FontAwesomeIcon onClick={()=>updateProfile(updateInfo)} style={{cursor:"pointer"}} icon={faRedoAlt} /></p>
                                    <p className="name">{info.name} <input type="text" name="name" placeHolder="Name" onChange={onChange}  value={name} /> </p>
                                    <p className="college">
                                        <FontAwesomeIcon style={{cursor:"pointer"}} icon={faUniversity} /> 
                                        {info.college} 
                                        <input type="text" onChange={onChange} name="college" placeHolder="College" value={college} /> 
                                    </p>
                                    <p className="job">{info.job} <input type="text" name="job" onChange={onChange} placeHolder="Job" value={job} /></p>
                                    <p className="location">{info.location} <input type="text" name="location" onChange={onChange} placeHolder="Location" value={location} /></p>
                                    <p className="introduce">{info.massage} <input type="text" name="massage" onChange={onChange} placeHolder="Massage" value={massage} /></p>
                                    <p className="infoBtn active">관심분야:</p><p className="infoBtn">섹션 등록</p><p className="infoBtn">더 보기</p>
                                </>
                            ) }
                        </li>
                    </ul>
                </div>
            </li>
        </>
    )
}
export default Profile;