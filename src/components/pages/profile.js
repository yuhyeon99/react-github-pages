import React, { useState, useEffect } from 'react';
import { faEdit, faTimes, faUniversity, faCamera, faPlus, faRedoAlt, faUserGraduate, faPen } from "@fortawesome/free-solid-svg-icons";
import firebase from '../fire';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = (props) =>{
    const [update, setUpdate] = useState(true);
    const [studyList,setStudyList] = useState([]);
    const [careerList, setCareerList] = useState([]);
    const [summaryList, setSummaryList] = useState([]);

    const {user, userCurrent, userRef, study, setStudy, career, setCareer, summary, setSummary, college, cLevel, major, comeInMonth, comeInYear, comeOutMonth, comeOutYear, score, club, explain, setCollege, setCLevel, setMajor, setComeInMonth, setComeInYear, setComeOutMonth, setComeOutYear, setScore, setClub, setExplain, editBtn, setEditBtn, editUid, setEditUid} = props;
    const studyRef = firebase.firestore().collection("study");
    const careerRef = firebase.firestore().collection("career");
    const summaryRef = firebase.firestore().collection("summary");
    
    
    const [loading, setLoading] = useState(true);
    
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
            let chk;
            for(let i=0; i<items.length; i++){
                if(items[i].user == userCurrent.uid){
                    chk = true;
                }
            }
            if(chk){
                setSummaryChk(true);
            }else{
                setSummaryChk(false);
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
        });
        setSummary(true);
        setEditBtn(true);
        setEditUid(id);
    }

    async function editStudy(id){
        const docRef = studyRef.doc(id);
        await docRef.get().then((doc)=>{
            const items = doc.data();
            setCollege(items.college);
            setCLevel(items.cLevel);
            setMajor(items.major);
            setComeInMonth(items.comeInMonth);
            setComeInYear(items.comeInYear);
            setComeOutMonth(items.comeOutMonth);
            setComeOutYear(items.comeOutYear);
            setScore(items.score);
            setClub(items.club);
            setExplain(items.explain);
        });
        setStudy(true);
        setEditBtn(true);
        setEditUid(id);
    }

    async function editCareer(id){
        const docRef = careerRef.doc(id);
        await docRef.get().then((doc)=>{
            const items = doc.data();
            setCollege(items.college);
            setCLevel(items.cLevel);
            setMajor(items.major);
            setComeInMonth(items.comeInMonth);
            setComeInYear(items.comeInYear);
            setComeOutMonth(items.comeOutMonth);
            setComeOutYear(items.comeOutYear);
            setScore(items.score);
            setClub(items.club);
            setExplain(items.explain);

        });
        setCareer(true);
        setEditBtn(true);
        setEditUid(id);
    }

    const deleteProfile = async(e) =>{        
        const type = e.currentTarget.dataset.type;
        const uid = e.currentTarget.dataset.uid;

        if(!window.confirm("삭제하시겠습니까?")){
            return false;
        }
        switch(type){
            case "summary":
                    await summaryRef
                        .doc(uid)
                        .delete()
                        .catch((err)=>{
                            console.log(err);
                        });

                    getSummary();
                break;
            case "career":
                await careerRef
                        .doc(uid)
                        .delete()
                        .catch((err)=>{
                            console.log(err);
                        });
                        
                    getCareer();   
                break;
            case "study":
                await studyRef
                    .doc(uid)
                    .delete()
                    .catch((err)=>{
                        console.log(err);
                    });
                    
                getStudy();
                break;
        }
        alert("삭제되었습니다.");
    };
    

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
                        <label htmlFor="change_file">
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

                            {summaryList.filter((val)=>val.user == userCurrent.uid).map((list, index)=>(
                                <div className="studyList" key={index}>
                                    <p className="summary">{list.club}</p>
                                    <p className="editArea">
                                        <FontAwesomeIcon style={{cursor:"pointer", marginRight:"10px"}} icon={faPen} onClick={(e)=>editSummary(list.id)} />
                                        <FontAwesomeIcon style={{cursor:"pointer"}} icon={faTimes} onClick={deleteProfile} data-type="summary" data-uid={list.id} />
                                    </p>
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
                            {careerList.filter((val)=>val.user == userCurrent.uid).map((list, index)=>(
                                <div className="studyList" key={index}>
                                    <p className="graduate"><img src={list.fileUrl}/></p>
                                    <p className="gInfo">
                                        <span>{list.college}</span><br/>
                                        <span>{list.cLevel}, {list.major}</span><br/>
                                        <span>{list.comeInYear}년-{list.comeOutYear}년</span> <br /> <br />
                                        <span>{list.explain}</span>
                                    </p>
                                    <p className="editArea">
                                        <FontAwesomeIcon style={{cursor:"pointer", marginRight:"10px"}} icon={faPen} onClick={(e)=>editCareer(list.id)} />
                                        <FontAwesomeIcon style={{cursor:"pointer"}} icon={faTimes} onClick={deleteProfile} data-type="career" data-uid={list.id} />
                                    </p>
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
                            {studyList.filter((val)=>val.user == userCurrent.uid).map((list, index)=>(
                                <div className="studyList" key={index}>
                                    <p className="graduate"><img src={list.fileUrl}/></p>
                                    <p className="gInfo"><span>{list.college}</span><br/><span>{list.cLevel}, {list.major}</span><br/><span>{list.comeInYear}년-{list.comeOutYear}년</span></p>
                                    <p className="editArea">
                                        <FontAwesomeIcon style={{cursor:"pointer", marginRight:"10px"}} icon={faPen} onClick={(e)=>editStudy(list.id)} />
                                        <FontAwesomeIcon style={{cursor:"pointer"}} icon={faTimes} onClick={deleteProfile} data-type="study" data-uid={list.id} />
                                    </p>
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