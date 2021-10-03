import React, { useState, useEffect } from 'react';
import { faEdit, faUniversity, faCamera, faPlus, faRedoAlt, faUserGraduate, faPen } from "@fortawesome/free-solid-svg-icons";
import firebase from '../fire';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = (props) =>{
    const [update, setUpdate] = useState(true);
    const [studyList,setStudyList] = useState([]);
    const [careerList, setCareerList] = useState([]);
    const [summaryList, setSummaryList] = useState([]);
    
    const [club, setClub] = useState('');

    const {user, userCurrent, userRef, study, setStudy, career, setCareer, summary, setSummary} = props;
    const studyRef = firebase.firestore().collection("study");
    const careerRef = firebase.firestore().collection("career");
    const summaryRef = firebase.firestore().collection("summary");
    
    
    const [loading, setLoading] = useState(false);
    
    const [info, setInfo] = useState({
        name:"Name",
        massage:"Massage",
        introduce:"Introduce",
        job:"Job",
        location:"Location",
        univercity:"univercity"
    });
    
    const [updateInfo, setUpdateInfo] = useState({
        name:"Name",
        massage:"Massage",
        introduce:"Introduce",
        job:"Job",
        location:"Location",
        univercity:"univercity"
    });
    function getInfo(){
        setLoading(false);

        userRef.doc(userCurrent.uid).get().then((doc)=>{
            if(doc.exists){
                setInfo(doc.data());
                setUpdateInfo(doc.data());
            }else{
    
            }
        });
    }

    function getStudy(){
        studyRef.orderBy("dateTime","desc").get().then((item)=>{
            const items = item.docs.map((doc)=>doc.data());
            setStudyList(items);
        });
    }
    function getCareer(){
        careerRef.orderBy("dateTime","desc").get().then((item)=>{
            const items = item.docs.map((doc)=>doc.data());
            setCareerList(items);
        });
    }
    const [summaryChk, setSummaryChk] = useState(0);
    function getSummary(){
        summaryRef.orderBy("dateTime","desc").get().then((item)=>{
            const items = item.docs.map((doc)=>doc.data());
            setSummaryList(items);
            for(let i=0; i<items.length; i++){
                if(items[i].user == userCurrent.uid){
                    setSummaryChk(true);
                }
            }
        });
    }

    const {name, massage, introduce, job, location, univercity} = updateInfo;
    

    const onChange = e =>{
        const {value, name} = e.target;
        setUpdateInfo({
            ...updateInfo,
            [name] : value
        });
    };

    
    const [fileUrl, setFileUrl] = useState('');
    const docRef = userRef.doc(userCurrent.uid);
    const storageRef = firebase.storage().ref();
    let file = "";

    const onFileChange = async (e) => {

        file = e.target.files[0];

        if(file){
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            let temp = await fileRef.getDownloadURL();
            await docRef
            .update({profileImg:temp})
            .catch((err)=>{
                console.log(err);
            });
        }

        getInfo();

    }

    function updateProfile(updateInfo){
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
       getStudy();
       getCareer();
       getSummary();
    }, [study, career, summary]);

    async function editSummary(id){
        const docRef = summaryRef.doc(id);
        await docRef.get().then((doc)=>{
            const items = doc.data();
            setClub(items.club);
            console.log(club);
        });
        setSummary(true);
    }
    
    if(loading){
        return <h1 className="loading">Loading...</h1>
    }

    return (
        <>
            <li className="profile subCenter" >
                <div className="topTitle">
                    <p><b>회원님의 프로필 페이지 입니다.</b></p>
                </div>
                <div className="infoBox">
                    <ul>
                        <li className="infoBg"></li>
                        <label for="change_file">
                            <li className="profileImg" style={info.profileImg ? {background:`url(${info.profileImg})center center /cover`} : {} }>
                                {info.profileImg ? (
                                    <></>
                                ) : (
                                    <FontAwesomeIcon style={{cursor:"pointer"}} icon={faCamera} />
                                )}
                            </li>
                        </label>
                        <input id="change_file" type="file" style={{display:'none'}} onChange={onFileChange} />
                        <li className="infoArea">
                            {update ? (
                                <>
                                    <p className="update"><button type="button" onClick={()=>setUpdate(!update)} style={{cursor:"pointer"}} > 수정 </button></p>
                                    <p className="name">{info.name}</p>
                                    <p className="college"><FontAwesomeIcon style={{cursor:"pointer"}} icon={faUniversity} /> {info.univercity}</p>
                                    <p className="job">{info.job}</p>
                                    <p className="location">{info.location}</p>
                                    <p className="introduce">{info.massage}</p>
                                    <p className="infoBtn active">관심분야:</p><p className="infoBtn">섹션 등록</p><p className="infoBtn">더 보기</p>
                                </>
                            ) : (
                                <>
                                    <p className="update"><button type="button" onClick={()=>updateProfile(updateInfo)} style={{cursor:"pointer"}}> 완료 </button></p>
                                    <p className="name">{info.name} <input type="text" name="name" placeHolder="Name" onChange={onChange}  value={name} /> </p>
                                    <p className="college">
                                        <FontAwesomeIcon style={{cursor:"pointer"}} icon={faUniversity} /> 
                                         {info.univercity} 
                                        <input type="text" onChange={onChange} name="univercity" placeHolder="univercity" value={univercity} /> 
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
                <div className="infoBox">
                    <ul>
                        <li className="infoArea">
                            <p className="career">설명</p>
                            
                            {summaryChk ? (
                                <></>
                            ) : (
                                <p className="editBtn" ><FontAwesomeIcon onClick={(e)=>setSummary(!summary)} style={{cursor:"pointer"}} icon={faPlus} /></p>
                            )}

                            {summaryList.filter((val)=>val.user == userCurrent.uid).map((list)=>(
                                <div className="studyList">
                                    <p class="summary">{list.club}</p>
                                    <p className="editArea"><FontAwesomeIcon style={{cursor:"pointer"}} icon={faPen} onClick={(e)=>editSummary(list.id)} /></p>
                                </div>
                            ))}
                        </li>
                    </ul>
                </div>
                <div className="infoBox">
                    <ul>
                        <li className="infoArea">
                            <p className="career">경력</p>
                            <p className="editBtn" ><FontAwesomeIcon onClick={(e)=>setCareer(!career)} style={{cursor:"pointer"}} icon={faPlus} /></p>
                            {careerList.filter((val)=>val.user == userCurrent.uid).map((list)=>(
                                <div className="studyList">
                                    <p className="graduate"><img src={list.fileUrl}/></p>
                                    <p class="gInfo"><span>{list.college}</span><br/><span>{list.cLevel}, {list.major}</span><br/><span>{list.comeInYear}년-{list.comeOutYear}년</span></p>
                                    <p className="editArea"><FontAwesomeIcon style={{cursor:"pointer"}} icon={faPen} /></p>
                                </div>
                            ))}
                        </li>
                    </ul>
                </div>
                <div className="infoBox">
                    <ul>
                        <li className="infoArea">
                            <p className="career">학력</p>
                            <p className="editBtn" ><FontAwesomeIcon onClick={(e)=>setStudy(!study)} style={{cursor:"pointer"}} icon={faPlus} /></p>
                            {studyList.filter((val)=>val.user == userCurrent.uid).map((list)=>(
                                <div className="studyList">
                                    <p className="graduate"><img src={list.fileUrl}/></p>
                                    <p class="gInfo"><span>{list.college}</span><br/><span>{list.cLevel}, {list.major}</span><br/><span>{list.comeInYear}년-{list.comeOutYear}년</span></p>
                                    <p className="editArea"><FontAwesomeIcon style={{cursor:"pointer"}} icon={faPen} /></p>
                                </div>
                            ))}
                        </li>
                    </ul>
                </div>
            </li>
        </>
    )
}
export default Profile;