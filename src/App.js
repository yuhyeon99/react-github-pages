/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Counter from './components/Counter';
import firebase from './components/fire';
require('firebase/auth');
import Member from './components/Member';
import Home from "./components/pages/menu1";
import Menu2 from "./components/pages/menu2";
import Menu3 from "./components/pages/menu3";
import View from "./components/pages/list";
import Board from "./components/pages/board.js";
import Login from './components/Login';
import Profile from './components/pages/profile';
import Popup from './components/pages/popup.js';
import FirebaseLogin from './components/firebaseChat/FirebaseLogin';
import { AuthProvider } from './components/firebaseChat/AuthContext';
import FirebaseChat from './components/firebaseChat/FirebaseChat';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import {BrowserRouter , Route, Switch, Link} from 'react-router-dom';
import { faTimes,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// Test push comments - Roy 211027


// test push comments 2 - kimyuhyeon
// test push comments 3 - kimyuhyeon

// test push commetns 2 - Roy


//<========== 210529 firebase & CRUD 구현 ==========>
//<========== 210529 firebase & CRUD 구현 ==========>
function App() {
  const { Kakao } = window;
  const pUrl = process.env.PUBLIC_URL;
  const [study, setStudy] = useState(false);
  const [career, setCareer] = useState(false);
  const [summary, setSummary] = useState(false);

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
  
  const [editBtn, setEditBtn] = useState(false);
  const [editUid, setEditUid] = useState('');
  

  // login
  const fire = firebase;
  const userRef = firebase.firestore().collection("Users");
  const [user, setUser] = useState('');
  const [userCurrent, setUserCurrent] = useState('');
  const [email, setEmail] = useState('');
  const [massage, setMassage] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(true);
  const [loading, setLoading] = useState(false);

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

  const handleSignup = (kakao) => {
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
            uid : userCredential.user.uid,
            pw : password,
            email : email
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

  function KakaoLogin() {
    window.Kakao.Auth.login({
      scope:'profile_nickname, 	profile_image, account_email, gender',
      success : function (authObj){
        console.log(authObj);
        window.Kakao.API.request({
          url:'/v2/user/me',
          success : res=>{
            const kakao_account = res.kakao_account;
            console.log(kakao_account);
            const items = [];
            userRef.where("email","==",kakao_account.email).onSnapshot((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    items.push(doc.data());
                });
                // 이미 회원가입 된 것
                if(items.length > 0){
                  const loginBtn = document.getElementById("loginBtn");
                  setEmail(items[0].email);
                  setPassword(items[0].pw);

                  if(loginBtn)loginBtn.click();
                }else{ 
                  
                  setHasAccount(false);
                  setEmail(kakao_account.email);
                  
                }
            });

          }
        });
      },
      fail: function (err){
        console.log(err);
      }
    })
  }

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

      <Popup 
        userCurrent={userCurrent} 
        fire={fire} 
        firebase={firebase} 
        study={study} 
        setStudy={setStudy} 
        career={career} 
        setCareer={setCareer} 
        summary={summary} 
        setSummary={setSummary} 
        college={college}
        cLevel={cLevel}
        major={major}
        comeInMonth={comeInMonth}
        comeInYear={comeInYear}
        comeOutMonth={comeOutMonth}
        comeOutYear={comeOutYear}
        score={score}
        club={club}
        explain={explain}
        setCollege={setCollege}
        setCLevel={setCLevel}
        setMajor={setMajor}
        setComeInMonth={setComeInMonth}
        setComeInYear={setComeInYear}
        setComeOutMonth={setComeOutMonth}
        setComeOutYear={setComeOutYear}
        setScore={setScore}
        setClub={setClub}
        setExplain={setExplain}
        editBtn={editBtn}
        setEditBtn={setEditBtn}
        editUid={editUid}
        setEditUid={setEditUid}
      />
      <div className="header">
        <ul>
          <li className="left"><h2><Link to='/'>BOARD</Link></h2></li>
          <li className="center">
            <div>
              <Link to='/'>MENU1</Link>
              <ul>
                <li>test_1</li>
                <li>test_2</li>
                <li>test_3</li>
                <li>test_4</li>
              </ul>
            </div>
            <div>
              <Link to='/menu2'>MENU2</Link>
              <ul>
                <li>test_1</li>
                <li>test_2</li>
                <li>test_3</li>
              </ul>
            </div>
            <div>
              <Link to='/menu3'>MENU3</Link>
              <ul>
                <li>test_1</li>
                <li>test_2</li>
                <li>test_3</li>
              </ul>  
            </div>
            <div>
              <Link to='/board'>MEMBERS</Link>
              <ul>
                <li>test_1</li>
                <li>test_2</li>
                <li>test_3</li>
                <li>test_4</li>
              </ul>
            </div>
            <div>
              <Link to='/firebasechat'>CHATTING</Link>
              <ul>
                <li>test_1</li>

              </ul>
            </div>
          </li>
          
          <li className="right">
            <div>
              {/* {user?(      
                <Member user={user} userCurrent={userCurrent} handleLogout={handleLogout}/>
            ):(<></>)} */}
              <Switch>
                <Route path='/board'>
                  {user?(
                    <>
                    
                    </>
                  ) : (
                    <>
                    SNS 로그인 &nbsp; | 
                    <img onClick={()=>KakaoLogin()} style={{height:'40px', width:'auto', verticalAlign:'middle', cursor:'pointer'}} src={pUrl + "/images/kakao.png"} alt="kakao" />
                    <img 
                    onClick={() => firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                    style={{width:'30px',verticalAlign:'middle', cursor:'pointer'}} src={pUrl + "/images/premium-icon-google-2504739.png"} alt="google" />
                    <img
                    onClick={() => firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                    style={{width:'30px',verticalAlign:'middle', cursor:'pointer'}} src={pUrl + "/images/free-icon-facebook-2111398.png"} alt="facebook" />
                    
                    </>
                  )}
                </Route>
              </Switch>
            </div>
          </li>
        </ul>
      </div>
      <div className="commonBox middle">
            <div>
              <div>
                <ul style={{position:'relative'}}>
                  {/* <li className="left">
                    <div><Link to='/'>MENU1</Link></div>
                    <div><Link to='/menu2'>MENU2</Link></div>
                    <div><Link to='/menu3'>MENU3</Link></div>
                    <div><Link to='/'>MENU4</Link></div>
                  </li> */}
      <Switch>
        <Route exact path='/' component={Home}>
            
        </Route>
        <Route exact path='/menu2' component={Menu2}>
              
        </Route>
        <Route exact path='/menu3' component={Menu3}>

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
            college={college}
            cLevel={cLevel}
            major={major}
            comeInMonth={comeInMonth}
            comeInYear={comeInYear}
            comeOutMonth={comeOutMonth}
            comeOutYear={comeOutYear}
            score={score}
            club={club}
            explain={explain}
            setCollege={setCollege}
            setCLevel={setCLevel}
            setMajor={setMajor}
            setComeInMonth={setComeInMonth}
            setComeInYear={setComeInYear}
            setComeOutMonth={setComeOutMonth}
            setComeOutYear={setComeOutYear}
            setScore={setScore}
            setClub={setClub}
            setExplain={setExplain}
            editBtn={editBtn}
            setEditBtn={setEditBtn}
            editUid={editUid}
            setEditUid={setEditUid}
          />
        </Route>
        <AuthProvider>
          <Route path="/firebasechat/chats" component={FirebaseChat} userCurrent={userCurrent} />
          <Route exact path="/firebasechat" component={FirebaseLogin} />
        </AuthProvider>
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
