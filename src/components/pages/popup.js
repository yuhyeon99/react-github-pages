import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { faTimes,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Popup = (props) =>{

  const {userCurrent, fire, firebase, study, setStudy, career, setCareer, summary, setSummary, college, cLevel, major, comeInMonth, comeInYear, comeOutMonth, comeOutYear, score, club, explain, setCollege, setCLevel, setMajor, setComeInMonth, setComeInYear, setComeOutMonth, setComeOutYear, setScore, setClub, setExplain, editBtn, setEditBtn, editUid, setEditUid} = props;
  
  // study form
  const month = [];
  for(let i=1; i<=12; i++) {
    month.push(i);
  };
  let now = new Date();
  let year = now.getFullYear();
  const fullYear = [];
  const afterYear = [];
  for(let i=year; i>=year-100; i--){
    fullYear.push(i);
  };
  for(let i=year+10; i>=year-100; i--){
    afterYear.push(i);
  };
  

  let studyImg = document.getElementById('studyImg');

  const [fileUrl, setFileUrl] = useState('');
  let file = "";
  let uploadStatus=true;

  const onFileChange = async (e) => {
      uploadStatus = false;
      file = e.target.files[0];
      
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());

      uploadStatus = true;
  }

  const studyRef = firebase.firestore().collection("study");
const submitStudy = async (e) =>{
   if(!uploadStatus){
       alert('이미지 업로드 중입니다.');
       return false;
   }

   if(!window.confirm("저장히시겠습니까?")){
     return false;
   }else{
      const data = {
        college,
        cLevel,
        major,
        comeInMonth,
        comeInYear,
        comeOutMonth,
        comeOutYear,
        score,
        club,
        explain,
        id : uuidv4(),
        dateTime : firebase.firestore.FieldValue.serverTimestamp(),
        user : userCurrent.uid,
        fileUrl : fileUrl
      }

      if(editBtn){
        data.id = editUid;
        await studyRef
        .doc(editUid)
        .set(data)
        .catch((err)=>{
          console.log(err);
        });
      }else{
        await studyRef
        .doc(data.id)
        .set(data)
        .catch((err)=>{
            console.log(err);
        });
      }

      setStudy(!study);
      setCollege('');
        setCLevel('');
        setMajor('');
        setComeInMonth('');
        setComeInYear('');
        setComeOutMonth('');
        setComeOutYear('');
        setScore('');
        setClub('');
        setExplain('');
        studyImg.value = '';
      alert('저장되었습니다.');
    } 
    

  };

  // study form

  // career form
  const careerRef = fire.firestore().collection("career");
const submitCareer = async (e) =>{
   if(!uploadStatus){
       alert('이미지 업로드 중입니다.');
       return false;
   }

   if(!window.confirm("저장히시겠습니까?")){
     return false;
   }else{
      const data = {
        college,
        cLevel,
        major,
        comeInMonth,
        comeInYear,
        comeOutMonth,
        comeOutYear,
        score,
        club,
        explain,
        id : uuidv4(),
        dateTime : firebase.firestore.FieldValue.serverTimestamp(),
        user : userCurrent.uid,
        fileUrl : fileUrl
      }
    //   수정 여부
      if(editBtn){
        data.id = editUid;
        await careerRef
        .doc(editUid)
        .update(data)
        .catch((err)=>{
            console.log(err);
        });
      }else{
        await careerRef
        .doc(data.id)
        .set(data)
        .catch((err)=>{
            console.log(err);
        });
      }

      setCareer(!career);
      setCollege('');
        setCLevel('');
        setMajor('');
        setComeInMonth('');
        setComeInYear('');
        setComeOutMonth('');
        setComeOutYear('');
        setScore('');
        setClub('');
        setExplain('');
        studyImg.value = '';
      alert('저장되었습니다.');
    } 
    

  };
  // career form

  // Summary form
  const summaryRef = fire.firestore().collection("summary");
  const submitSummary = async (e) =>{
      if(!uploadStatus){
          alert('이미지 업로드 중입니다.');
          return false;
      }
  
      if(!window.confirm("저장히시겠습니까?")){
        return false;
      }else{
        
  
        const data = {
          college,
          cLevel,
          major,
          comeInMonth,
          comeInYear,
          comeOutMonth,
          comeOutYear,
          score,
          club,
          explain,
          id : uuidv4(),
          dateTime : firebase.firestore.FieldValue.serverTimestamp(),
          user : userCurrent.uid,
          fileUrl : fileUrl
        }
        // 수정 여부
        if(editBtn){
            data.id = editUid;
            await summaryRef
            .doc(editUid)
            .update(data)
            .catch((err)=>{
            console.log(err);
            });
        }else{
            await summaryRef
            .doc(data.id)
            .set(data)
            .catch((err)=>{
            console.log(err);
            });
        }
  
        setSummary(!summary);
        
        setCollege('');
        setCLevel('');
        setMajor('');
        setComeInMonth('');
        setComeInYear('');
        setComeOutMonth('');
        setComeOutYear('');
        setScore('');
        setClub('');
        setExplain('');

        alert('저장되었습니다.');
      } 
      
  
    };
    // Summary form

    const closePop = () => {
        setStudy(false);
        setCareer(false);
        setSummary(false);

        setCollege('');
        setCLevel('');
        setMajor('');
        setComeInMonth('');
        setComeInYear('');
        setComeOutMonth('');
        setComeOutYear('');
        setScore('');
        setClub('');
        setExplain('');
        
        setEditBtn(false);
        setEditUid('');
    }


    return (
        <>
          {study?(
            <div className="studyPopup profile">
              <div className="inner">
                <ul>
                  <li className="study_header">
                    <p className="tt">학력 입력</p><p className="cb"><FontAwesomeIcon onClick={(e)=>closePop()} style={{cursor:"pointer"}} icon={faTimes} /></p>
                  </li>
                  <li className="study_form">
                    <div className="college">
                      <label for="college">학교</label>
                      <input type="text" id="college" onChange={(e)=>setCollege(e.target.value)} value={college} placeHolder="예: 금오공과대학교"/>
                    </div>
                    <div className="cLevel">
                      <label for="cLevel">학위</label>
                      <input type="text" id="cLevel" onChange={(e)=>setCLevel(e.target.value)} value={cLevel} placeHolder="예: 학사"/>
                    </div>
                    <div className="major">
                      <label for="major">전공</label>
                      <input type="text" id="major" onChange={(e)=>setMajor(e.target.value)} value={major} placeHolder="예: 경영학"/>
                    </div>
                    <div className="comeIn">
                      <label for="comeIn">입학일</label>
                      <select onChange={(e)=>setComeInMonth(e.target.value)} value={comeInMonth}>
                        <option value="">월</option>
                        {month.map((idx)=>(
                          <option value={idx}>{idx}월</option>
                        ))}
                      </select>
                      <select onChange={(e)=>setComeInYear(e.target.value)} value={comeInYear}>
                        <option value="">연도</option>
                        {fullYear.map((idx)=>(
                          <option value={idx}>{idx}년</option>
                        ))}
                      </select>
                    </div>
                    <div className="comeOut">
                      <label for="comeOut">졸업일</label>
                      <select onChange={(e)=>setComeOutMonth(e.target.value)} value={comeOutMonth}>
                        <option value="">월</option>
                        {month.map((idx)=>(
                          <option value={idx}>{idx}월</option>
                        ))}
                      </select>
                      <select onChange={(e)=>setComeOutYear(e.target.value)} value={comeOutYear}>
                        <option value="">연도</option>
                        {afterYear.map((idx)=>(
                          <option value={idx}>{idx}년</option>
                        ))}
                      </select>
                    </div>
                    <div className="score">
                      <label for="score">학점</label>
                      <input type="text" id="score" onChange={(e)=>setScore(e.target.value)} value={score} />
                    </div>
                    <div className="club">
                      <label for="club">동아리나 학회</label>
                      <textarea onChange={(e)=>setClub(e.target.value)} value={club} placeHolder="예: 산악 동아리, 정치 사회 연구회"></textarea>
                    </div>
                    <div className="explain">
                      <label for="explain">설명</label>
                      <textarea onChange={(e)=>setExplain(e.target.value)} value={explain} ></textarea>
                    </div>
                    <div className="studyImg">
                      <label for="studyImg">대표이미지</label>
                      <input type="file" onChange={onFileChange} id="studyImg" />
                    </div>
                  </li>
                  <li className="study_footer">
                    <p className="study_btn" onClick={(e)=>submitStudy()}>저장</p>
                  </li>
                </ul>
              </div>
            </div>
          ):(
            <>
            </>
          )}
          {career?(
            <div className="studyPopup profile">
              <div className="inner">
                <ul>
                  <li className="study_header">
                    <p className="tt">경력 입력</p><p className="cb"><FontAwesomeIcon onClick={(e)=>closePop()} style={{cursor:"pointer"}} icon={faTimes} /></p>
                  </li>
                  <li className="study_form">
                    <div className="college">
                      <label for="college">직장</label>
                      <input type="text" id="college" onChange={(e)=>setCollege(e.target.value)} value={college} placeHolder="예: 삼성전자"/>
                    </div>
                    <div className="cLevel">
                      <label for="cLevel">직급</label>
                      <input type="text" id="cLevel" onChange={(e)=>setCLevel(e.target.value)} value={cLevel} placeHolder="예: 부장"/>
                    </div>
                    <div className="major">
                      <label for="major">담당부서</label>
                      <input type="text" id="major" onChange={(e)=>setMajor(e.target.value)} value={major} placeHolder="예: 개발팀"/>
                    </div>
                    <div className="comeIn">
                      <label for="comeIn">입사일</label>
                      <select onChange={(e)=>setComeInMonth(e.target.value)} value={comeInMonth}>
                        <option value="">월</option>
                        {month.map((idx)=>(
                          <option value={idx}>{idx}월</option>
                        ))}
                      </select>
                      <select onChange={(e)=>setComeInYear(e.target.value)} value={comeInYear}>
                        <option value="">연도</option>
                        {fullYear.map((idx)=>(
                          <option value={idx}>{idx}년</option>
                        ))}
                      </select>
                    </div>
                    <div className="comeOut">
                      <label for="comeOut">퇴사일</label>
                      <select onChange={(e)=>setComeOutMonth(e.target.value)} value={comeOutMonth}>
                        <option value="">월</option>
                        {month.map((idx)=>(
                          <option value={idx}>{idx}월</option>
                        ))}
                      </select>
                      <select onChange={(e)=>setComeOutYear(e.target.value)} value={comeOutYear}>
                        <option value="">연도</option>
                        {afterYear.map((idx)=>(
                          <option value={idx}>{idx}년</option>
                        ))}
                      </select>
                    </div>
                    <div className="explain">
                      <label for="explain">설명</label>
                      <textarea onChange={(e)=>setExplain(e.target.value)} value={explain} ></textarea>
                    </div>
                    <div className="studyImg">
                      <label for="studyImg">대표이미지</label>
                      <input type="file" onChange={onFileChange} id="studyImg" />
                    </div>
                  </li>
                  <li className="study_footer">
                    <p className="study_btn" onClick={(e)=>submitCareer()}>저장</p>
                  </li>
                </ul>
              </div>
            </div>
          ):(
            <>
            </>
          )}
    
          {summary?(
            <div className="studyPopup profile">
              <div className="inner">
                <ul>
                  <li className="study_header">
                    <p className="tt">설명 입력</p><p className="cb"><FontAwesomeIcon onClick={(e)=>closePop()} style={{cursor:"pointer"}} icon={faTimes} /></p>
                  </li>
                  <li className="study_form">
                    <div className="club">
                      <label for="club">설명</label>
                      <textarea onChange={(e)=>setClub(e.target.value)} value={club} placeHolder="etc.."></textarea>
                    </div>
                  </li>
                  <li className="study_footer">
                    <p className="study_btn" onClick={(e)=>submitSummary()}>저장</p>
                  </li>
                </ul>
              </div>
            </div>
          ):(
            <>
            </>
          )}
        </>
    )
};

export default Popup;