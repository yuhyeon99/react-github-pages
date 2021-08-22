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
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




//<========== 210529 firebase & CRUD 구현 ==========>
//<========== 210529 firebase & CRUD 구현 ==========>
function App() {

  // login
  const fire = firebase;
  const userRef = firebase.firestore().collection("Users");
  const [user, setUser] = useState('');
  const [userCurrent, setUserCurrent] = useState('');
  const [email, setEmail] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(true);
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
    setIntroduce('');
  }

  const clearErrors = () =>{
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () =>{
    clearErrors();
    fire
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
            introduce: introduce, 
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
              {user?(      
                <Member user={user} userCurrent={userCurrent} handleLogout={handleLogout}/>
            ):(<></>)}
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
            <Board userCurrent={userCurrent} />
          ):(
            <Login 
              email={email} 
              setEmail={setEmail} 
              password={password} 
              setPassword={setPassword} 
              introduce = {introduce}
              setIntroduce = {setIntroduce}
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
