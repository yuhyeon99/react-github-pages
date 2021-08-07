/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Counter from './components/Counter';
// import firebase from './components/fire_imageUpload.js';
import firebase from './components/fire';
import Login from './components/Login'
import Hero from './components/Hero'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//<========== 210516 useEffect 함수 공부 ==========>
//<========== 210516 useEffect 함수 공부 ==========>
// function App() {
//   // 랜더링이 될 때마다 실행시켜주는 함수
//   const [count, setCount] = useState(0);
//   const [hyun, setHyun] = useState(0);
//   useEffect(() => {
//     console.log(count);
//   }, [count, hyun]);
//   const increment = ()=>{
//     setCount(count+1);
//   }

//   useEffect( ()=>{
//     console.log("first rendering");
//   }, []);
//   return (
//     <div>
//       <h1>useEffect and useState</h1>
//       <button onClick={ increment }>click</button>
//       <button onClick={ ()=> { setHyun( hyun + 1 ) } }>click1</button>
//     </div>
//   );
// }
//<========== 210516 useEffect 함수 공부 ==========>
//<========== 210516 useEffect 함수 공부 ==========>

//<========== 210516 components 형식 공부 ==========>
//<========== 210516 components 형식 공부 ==========>
// function App() {

//   const [buttonName, setButtonName] = useState("클릭");
//   const buttonClick = ()=>{
//     setButtonName("click");
//   }
  
//   return (
//     <div>
//       <h1>COUNTER</h1>
//       <Counter click="click1"/>
//       <Counter click={buttonName}/>
//       <Counter/>
//       <button onClick={buttonClick}>버튼명변경버튼  </button>
//     </div>
//   );
// }
//<========== 210516 components 형식 공부 ==========>
//<========== 210516 components 형식 공부 ==========>

//<========== 210529 firebase & login기능 구현 ==========>
//<========== 210529 firebase & login기능 구현 ==========>
// function App() {
  

//   const [user, setUser] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [hasAccount, setHasAccount] = useState(false);

//   const clearInputs = () => {
//     setEmail('');
//     setPassword('');
//   }

//   const clearErrors = () =>{
//     setEmailError('');
//     setPasswordError('');
//   }

//   const handleLogin = () =>{
//     clearErrors();
//     fire
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .catch(err => {
//         switch(err.code){
//           case "auth/invalid-email":
//           case "auth/user-disabled":
//           case "auth/user-not-found":
//             setEmailError(err.message);
//             break;
//           case "auth/wrong-password":
//             setPasswordError(err.message);
//             break;
//         }
//       });
//   };

//   const handleSignup = () => {
//     clearErrors();
//     fire
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .catch(err => {
//         switch(err.code){
//           case "auth/email-already-in-use":
//           case "auth/invalid-email":
//             setEmailError(err.message);
//             break;
//           case "auth/weak-password":
//             setPasswordError(err.message);
//             break;
//         }
//       });
//   };

//   const handleLogout = () => {
//     fire.auth().signOut();
//   };

//   const authListener = () => {
//     fire.auth().onAuthStateChanged(user => {
//       if(user){
//         clearInputs();
//         setUser(user);
//       }else{
//         setUser("");
//       }
//     });
//   };

//   useEffect(()=>{
//     authListener();
//   }, []);
  
//   return (
//     <div className="App">
//       {user ? (
//         <Hero handleLogout={handleLogout}/>
//       ) : (
//         <Login 
//         email={email} 
//         setEmail={setEmail} 
//         password={password} 
//         setPassword={setPassword} 
//         handleLogin={handleLogin}
//         handleSignup={handleSignup}
//         hasAccount={hasAccount}
//         setHasAccount={setHasAccount}
//         emailError={emailError}
//         passwordError={passwordError}
//       />
//       )}
      
//     </div>
//   );
// }

//<========== 210529 firebase & login기능 구현 ==========>
//<========== 210529 firebase & login기능 구현 ==========>

//<========== 210529 firebase & CRUD 구현 ==========>
//<========== 210529 firebase & CRUD 구현 ==========>
function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  // const ref = firebase.firestore().collection("testuser");

  // function getSchools(){
  //   setLoading(true);
  //   ref.onSnapshot((querySnapshot) => {
  //     const items =[];
  //     querySnapshot.forEach((doc)=>{
  //       items.push(doc.data());
  //     });
  //     setSchools(items);
  //     setLoading(false);
  //   });
  // }

  // function getSchools2(){
  //   setLoading(true);
  //   ref.get().then((item)=>{
  //     const items = item.docs.map((doc) => doc.data());
  //     setSchools(items);
  //     setLoading(false);
  //   });
  // }

  // function addBoard(newBoard){
  //   if(!title){
  //     alert('제목을 작성해주세요.');
  //     return false;
  //   }
  //   if(!desc){
  //     alert('내용을 작성해주세요.');
  //     return false;
  //   }
  //   ref
  //     .doc(newBoard.id)
  //     .set(newBoard)
  //     .catch((err)=>{
  //       console.error(err);
  //     });

  //   getSchools2();
  //   setWriteShow(false);

  //   setTitle('');
  //   setDesc('');

  // }

  // function deleteBoard(school){
  //   ref
  //     .doc(school.id)
  //     .delete()
  //     .catch((err)=>{
  //       console.error(err);
  //     });
    
  //     getSchools2();
  // }

  // useEffect(()=>{
  //   getSchools2();
  // }, []);

  const [writeShow, setWriteShow] = useState(false);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
// // image uploader
//   const [image, setImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState([]);
//   const [url, setUrl] = useState("");
//   const [progress, setProgress] = useState(0);
//   // const db = app.firestore();
// function getImageUrls(){
//     setLoading(true);
//     const imageRef = firebase.database().ref('images').child('daily');
//     imageRef.on("value", (snapshot)=>{
//       const imageUrls = snapshot.val();
//       const urls = [];
//       for(let id in imageUrls){
//         urls.push({id, url:imageUrls[id] })
//       }
//       const newState = [... imageUrl, ... urls];
//       setImageUrl(newState);
//     });
//     setLoading(false);
// }

// const handleChange = e =>{
//   if(e.target.files[0]){
//     setImage(e.target.files[0]);
//   }
// };

// const handleUpload = ()=>{
//   const id = uuidv4();
//   var storage = firebase.storage();
//   const uploadTask = firebase.storage().ref('images').child(id).put(image);
//   const imageRef = firebase.database().ref('images').child('daily').child(id);
//   uploadTask.on(
//     "state_changed",
//     snapshot =>{
//       const progress = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//       setProgress(progress);

//     },
//     error=>{
//       console.log(error);
//     },
//     ()=>{
//       storage
//         .ref("images")
//         .child(id)
//         .getDownloadURL()
//         .then(url=>{
//           setUrl(url);
//           imageRef.set(url);
//         });
//     }
//   );
// };

// useEffect(()=>{
//   getImageUrls();
// },[]);
 
// image uploader

if(loading){
  return <h1 className="loading">Loading...</h1>
}
  
  return (
    // <div>
    //   <h1>test01</h1>
    //   {schools.map((school) => (
    //     <div key={school.id}>
    //       <h2>{school.title}</h2>
    //       <p>{school.desc}</p>
    //     </div>
    //   ))}
    // </div>
    <BrowserRouter>
    <div>
      <div className="writePopup popup" style={ writeShow ? {display:"block"} : {display:"none"} }>
        <ul>
          <li>
            <div className="title">
              <p className="title_text">게시물 만들기</p>
              <p className="closeBtn" onClick={()=>setWriteShow(!writeShow)}><FontAwesomeIcon style={{cursor:"pointer",lineHeight:"40px"}} icon={faTimes}/></p>
            </div>
            <div className="writeArea">
              <ul>
                <li className="userIcon">USER01</li>
                <li className="userWrite">
                  <input type="text" onChange={(e)=>setTitle(e.target.value)} className="writeTitle" value={title} placeholder="OOO님, 제목을 작성해주세요." />
                  <input type="text" onChange={(e)=>setDesc(e.target.value)} className="writeContent" value={desc} placeholder="OOO님, 무슨 생각을 하고 계신가요?" />
                </li>
                <li className="submitBtn"><button onClick={()=> addBoard({ title, desc, id: uuidv4() })}>게시</button></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="header">
        <ul>
          <li className="left"><h2><Link to='/'>BOARD</Link></h2></li>
          <li className="center">
            <div>MENU1</div>
            <div><Link to='/uploader'>UPLOADER</Link></div>
            <div><Link to='/board'>BOARD</Link></div>
            <div><Link to='/'>GAMING</Link></div>
          </li>
          
          <li className="right">
            <div><p>profile</p></div>
          </li>
        </ul>
      </div>
      <div className="commonBox middle">
            <div>
              <div>
                <ul>
                  <li className="left">
                    <div>MENU1</div>
                    <div>MENU2</div>
                    <div>MENU3</div>
                    <div>MENU4</div>
                    <div>MENU5</div>
                    <div>MENU6</div>
                    <div>MENU7</div>
                    <div>MENU8</div>
                  </li>
      <Switch>
        <Route exact path='/'>
                  {/* <li className="gaming">
                    <div className="ele1">

                    </div>
                    <div className="ele2">
                      <ul>                 
                        {imageUrl ? imageUrl.map(({id, url}) => {
                          return (<li key={id}>
                            <div><img src={url} alt="" /></div>
                          </li>)
                        }) : ""}
                      </ul>
                    </div>
                  </li> */}
        </Route>
        <Route path='/uploader'>
               {/* <li className="uploader">
                  <div>
                    <progress value={progress} max="100" />
                    <br/>
                    <input type="file" onChange={handleChange} />
                    <button onClick={handleUpload}>upload</button>
                  </div>
                  <div>
                    {url}
                  </div>
               </li> */}
        </Route>
        <Route path='/board'>
                  <li className="center">
                    <div className="writeFrm">
                      <ul>
                        <li className="tt"><p>WRITER</p></li>
                        <li className="tc"><input onClick={()=>setWriteShow(!writeShow)} className="textFrm popupWrite" placeholder="원하시는 내용을 작성해주세요." type="text"/></li>
                      </ul>
                    </div>
                  {schools.map((school) => (
                    <div className="list_01 lists" key={school.id}>
                      <ul>
                        <li className="lt">
                          <p>{school.title}</p>
                        </li>
                        <li className="lc">
                          <p>{school.desc} </p>
                        </li>
                        <li className="lb">
                          <button onClick={ () => deleteBoard(school) }>삭제</button>
                          <button>수정</button>
                        </li>
                      </ul>
                    </div>
                  ))}

                  </li>
                  <li className="right">
                    <div className="boxmenu_1"></div>
                    <div className="boxmenu_2"></div>
                    <div className="boxmenu_3"></div>
                  </li>
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
