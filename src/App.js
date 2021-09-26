/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Counter from './components/Counter';
import firebase from './components/fire';
require('firebase/auth');
import Member from './components/Member';
import Home from "./components/pages/menu1";
import View from "./components/pages/list";
import Board from "./components/pages/board.js";
import Login from './components/Login';
import Profile from './components/pages/profile';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { faTimes,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




//<========== 210529 firebase & CRUD 구현 ==========>
//<========== 210529 firebase & CRUD 구현 ==========>
function App() {

  // login
  const fire = firebase;
  const userRef = firebase.firestore().collection("Users");
  const [study, setStudy] = useState(false);
  const [career, setCareer] = useState(false);
  const [summary, setSummary] = useState(false);
  const [user, setUser] = useState('');
  const [userCurrent, setUserCurrent] = useState('');
  const [email, setEmail] = useState('');
  const [massage, setMassage] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(true);
  const [loading, setLoading] = useState(false);


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
  const [college, setCollege] = useState('');
  const [cLevel, setCLevel] = useState('');
  const [major, setMajor] = useState('');
  const [comeInMonth, setComeInMonth] = useState('');
  const [comeInYear, setComeInYear] = useState('');
  const [comeOutMonth, setComeOutMonth] = useState('');
  const [comeOutYear, setComeOutYear] = useState('');
  const [score, setScore] = useState('');
  const [club, setClub] = useState('');
  const [explain, setExplain] = useState('');

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

  const studyRef = fire.firestore().collection("study");
const submitStudy = async (e) =>{
   if(!uploadStatus){
       alert('이미지 업로드 중입니다.');
       return false;
   }

   if(!confirm("저장히시겠습니까?")){
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

      await studyRef
      .doc(data.id)
      .set(data)
      .catch((err)=>{
        console.log(err);
      });

      setStudy(!study);
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

   if(!confirm("저장히시겠습니까?")){
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

      await careerRef
      .doc(data.id)
      .set(data)
      .catch((err)=>{
        console.log(err);
      });

      setCareer(!career);
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
    
       if(!confirm("저장히시겠습니까?")){
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
    
          await summaryRef
          .doc(data.id)
          .set(data)
          .catch((err)=>{
            console.log(err);
          });
    
          setSummary(!summary);
          alert('저장되었습니다.');
        } 
        
    
      };
      // Summary form
  

  const clearInputs = () => {
    setEmail('');
    setPassword('');
    setMassage('');
  }

  const clearErrors = () =>{
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = async(e) =>{
    clearErrors();
    await fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });

      authListener();
      
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userRef
          .doc(`${userCredential.user.uid}`)
          .set({
            name:"Name",
            job:"Job",
            location:"Location",
            college:"College",
            massage: massage, 
            uid : userCredential.user.uid
          })
      })
      .catch(err => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
    window.location.href='/board';
  };

  const authListener = () => {
    setLoading(true);
    fire.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();
        setUser(user);
        setUserCurrent(fire.auth().currentUser);
      }else{
        setUser("");
      }
      setLoading(false);
    });
  };

  useEffect(()=>{
    authListener();
  }, []);

  // login
  if(loading){
      return <h1 className="loading">Loading...</h1>
  }

  return (
    <BrowserRouter>
    <div>

      {study?(
        <div className="studyPopup profile">
          <div className="inner">
            <ul>
              <li className="study_header">
                <p className="tt">학력 입력</p><p className="cb"><FontAwesomeIcon onClick={(e)=>setStudy(!study)} style={{cursor:"pointer"}} icon={faTimes} /></p>
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
                <p className="tt">경력 입력</p><p className="cb"><FontAwesomeIcon onClick={(e)=>setCareer(!career)} style={{cursor:"pointer"}} icon={faTimes} /></p>
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
                {/* <div className="score">
                  <label for="score">학점</label>
                  <input type="text" id="score" onChange={(e)=>setScore(e.target.value)} value={score} />
                </div>
                <div className="club">
                  <label for="club">동아리나 학회</label>
                  <textarea onChange={(e)=>setClub(e.target.value)} value={club} placeHolder="예: 산악 동아리, 정치 사회 연구회"></textarea>
                </div> */}
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
                <p className="tt">설명 입력</p><p className="cb"><FontAwesomeIcon onClick={(e)=>setSummary(!summary)} style={{cursor:"pointer"}} icon={faTimes} /></p>
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
      <div className="header">
        <ul>
          <li className="left"><h2><Link to='/'>BOARD</Link></h2></li>
          <li className="center">
            <div><Link to='/'>MENU1</Link></div>
            <div><Link to='/menu2'>MENU2</Link></div>
            <div><Link to='/menu3'>MENU3</Link></div>
            <div><Link to='/board'>MEMBERS</Link></div>
          </li>
          
          <li className="right">
            <div>
              {/* {user?(      
                <Member user={user} userCurrent={userCurrent} handleLogout={handleLogout}/>
            ):(<></>)} */}
            </div>
          </li>
        </ul>
      </div>
      <div className="commonBox middle">
            <div>
              <div>
                <ul>
                  <li className="left">
                    <div><Link to='/'>MENU1</Link></div>
                    <div><Link to='/menu2'>MENU2</Link></div>
                    <div><Link to='/menu3'>MENU3</Link></div>
                    <div><Link to='/'>MENU4</Link></div>
                  </li>
      <Switch>
        <Route exact path='/' component={Home}>
            
        </Route>
        <Route exact path='/menu2'>
              <li className="menu2 subCenter">
                <div className="partLeft">
                  <div>
                    <p></p>
                  </div>
                  <div>
                    <p></p>
                  </div>
                </div>
                <div className="partRight">
                  <p></p>
                </div>
              </li>
        </Route>
        <Route exact path='/menu3'>
              <li className="menu3 subCenter">
                <h1 style={{textAlign:'center'}}>Special Products</h1>
                <div className="products">
                  <div className="img_area">
                    <label>Sale</label>
                  </div>
                  <div className="text_area">
                    <p className="tt"><span className="price">$133.00</span> <span className="dPrice">$189.00</span></p>
                    <p className="tc">lorem ipsum dolor sit</p>
                    <p className="buyBtn">ADD TO CART</p>
                  </div>
                </div>
                <div className="products">
                  <div className="img_area">
                    <label>Sale</label>
                  </div>
                  <div className="text_area">
                    <p className="tt"><span className="price">$133.00</span> <span className="dPrice">$189.00</span></p>
                    <p className="tc">lorem ipsum dolor sit</p>
                    <p className="buyBtn">ADD TO CART</p>
                  </div>
                </div>
                <div className="products">
                  <div className="img_area">
                    <label>Sale</label>
                  </div>
                  <div className="text_area">
                    <p className="tt"><span className="price">$133.00</span> <span className="dPrice">$189.00</span></p>
                    <p className="tc">lorem ipsum dolor sit</p>
                    <p className="buyBtn">ADD TO CART</p>
                  </div>
                </div>
                <div className="products">
                  <div className="img_area">
                    <label>Sale</label>
                  </div>
                  <div className="text_area">
                    <p className="tt"><span className="price">$133.00</span> <span className="dPrice">$189.00</span></p>
                    <p className="tc">lorem ipsum dolor sit</p>
                    <p className="buyBtn">ADD TO CART</p>
                  </div>
                </div>
              </li>
        </Route>
        <Route path='/board'>
          {user?(
            <>
            <Board userCurrent={userCurrent} />
            <li className="right">
                <div className="boxmenu_1"> <Member userRef={userRef} user={user} userCurrent={userCurrent} handleLogout={handleLogout}/> </div>
                <div className="boxmenu_2"></div>
                <div className="boxmenu_3"></div>
            </li>
            </>
          ):(
            <Login 
              email={email} 
              setEmail={setEmail} 
              password={password} 
              setPassword={setPassword} 
              massage = {massage}
              setMassage = {setMassage}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
            />
          )}
        </Route>
        <Route path='/view/:id' component={View}>
            
        </Route>
        <Route path='/profile' >
          <Profile 
            user={user}
            userCurrent={userCurrent}
            userRef={userRef}
            study={study}
            setStudy={setStudy}
            career={career}
            setCareer={setCareer}
            summary={summary}
            setSummary={setSummary}
          />
        </Route>
      </Switch>
            </ul>
          </div>
        </div>
      </div>
      


    </div>
    </BrowserRouter>
    
  );
}

//<========== 210529 firebase & CRUD 구현 ==========>
//<========== 210529 firebase & CRUD 구현 ==========>

export default App;
