import React, {useState, useEffect} from 'react';
import firebase from '../fire';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Board = (props) => {
    
    const {userCurrent} = props;

    const [loading, setLoading] = useState(false);
    
    
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
        console.log(fileUrl);
    }
    
    const [writeShow, setWriteShow] = useState(false);
    const [modifyShow, setModifyShow] = useState(false);
    const [lists, setLists] = useState([]);

    const [modifyId, setModifyId] = useState();
    const [modifyTitle, setModifyTitle] = useState();
    const [modifyDesc, setModifyDesc] = useState();

    const [filterVal, setFilterVal] = useState("title");
    
    const [searchTerm, setSearchTerm] = useState("");

    const ref = firebase.firestore().collection("crudtest");


    function getLists(){
        // setLoading(true);
        console.log(ref);
        ref.orderBy("dateTime","desc").get().then((item)=>{
            const items = item.docs.map((doc) => doc.data());
            setLists(items);
            // setLoading(false);
        });
    }

    function addBoard(newBoard){
        if(!fileUrl){
            alert('사진 업로드를 기다려주세요.');
            return false;
        }

        if(!title){
        alert('제목을 작성해주세요.');
        return false;
        }
        if(!desc){
        alert('내용을 작성해주세요.');
        return false;
        }
        ref
        .doc(newBoard.id)
        .set(newBoard)
        .catch((err)=>{
            console.error(err);
        });
    
        getLists();
        setWriteShow(false);
    
        setTitle('');
        setDesc('');
        setFileUrl('');
    
    }

    function editBoard(updateBoard){
        if(!fileUrl){
            alert('사진 업로드를 기다려주세요.');
            return false;
        }
        setLoading();
        
        ref
        .doc(updateBoard.id)
        .update(updateBoard)
        .catch((err) => {
            console.log(err);
        });
    
        setTimeout(()=>{
            getLists();
        },300);
        setModifyShow(false);
    }

    function deleteBoard(list){
        ref
            .doc(list.id)
            .delete()
            .catch((err)=>{
            console.error(err);
            });
        
            getLists();
    }

    function modifyBoard(list){
        const docRef = ref.doc(list.id);
        
        docRef.get().then((doc)=>{
        const items = doc.data(); 
    
        setModifyId(items.id);
        setModifyTitle(items.title);
        setModifyDesc(items.desc);
        setFileUrl(items.fileUrl);
    
        setModifyShow(!modifyShow);
        });
    }

    useEffect(()=>{
        getLists();
    }, []);


    if(loading){
        return <h1 className="loading">Loading...</h1>
    }

    return (
        <>
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
                        <input type="text" onChange={(e)=>setTitle(e.target.value)} className="writeTitle" value={title} placeHolder="OOO님, 제목을 작성해주세요." />
                        <input type="text" onChange={(e)=>setDesc(e.target.value)} className="writeContent" value={desc} placeHolder="OOO님, 무슨 생각을 하고 계신가요?" />
                        <input type="file" onChange={onFileChange} />
                        </li>
                        <li className="submitBtn"><button onClick={()=> addBoard({ title, desc, fileUrl, email:userCurrent.email, dateTime : firebase.firestore.FieldValue.serverTimestamp() , id: uuidv4() })}>게시</button></li>
                    </ul>
                    </div>
                </li>
                </ul>
            </div>

            <div className="writePopup popup" style={ modifyShow ? {display:"block"} : {display:"none"} }>
                <ul>
                <li>
                    <div className="title">
                    <p className="title_text">게시물 수정</p>
                    <p className="closeBtn" onClick={()=>setModifyShow(!modifyShow)}><FontAwesomeIcon style={{cursor:"pointer",lineHeight:"40px"}} icon={faTimes}/></p>
                    </div>
                    <div className="writeArea">
                    <ul>
                        <li className="userIcon">USER01</li>
                        <li className="userWrite">
                        <input type="text" onChange={(e)=>setModifyTitle(e.target.value)} className="writeTitle" value={modifyTitle} placeHolder="OOO님, 제목을 작성해주세요." />
                        <input type="text" onChange={(e)=>setModifyDesc(e.target.value)} className="writeContent" value={modifyDesc} placeHolder="OOO님, 무슨 생각을 하고 계신가요?" />
                        <input type="file" onChange={onFileChange} />
                        </li>
                        <li className="submitBtn"><button onClick={()=> editBoard({ title :modifyTitle, desc : modifyDesc, fileUrl, id: modifyId })}>수정 </button></li>
                    </ul>
                    </div>
                </li>
                </ul>
            </div>

            <li className="center">
                <div className="writeFrm">
                    <ul>
                        <li className="tt"><p>WRITER</p></li>
                        <li className="tc"><input readOnly onClick={()=>setWriteShow(!writeShow)} className="textFrm popupWrite" placeHolder="원하시는 내용을 작성해주세요." type="text"/></li>
                        <li className="tt" style={{padding:'0 20px'}}>
                            <select onChange={(e)=>setFilterVal(e.target.value)}>
                                <option value="">검색목록</option>
                                <option value="title">제목</option>
                                <option value="email">작성자</option>
                            </select>
                        </li>
                        <li className="tc">
                            <input className="textFrm" type="text" placeHolder="Search..." onChange={(event)=>{ setSearchTerm(event.target.value) }} />
                        </li>
                    </ul>
                </div>
                {lists.filter((val)=>{
                    if(searchTerm == ""){
                        return val;
                    }else if(filterVal == "title"){
                        if(val.title.toString().toLowerCase().includes(searchTerm.toLowerCase()) ){
                            return val;
                        }
                    }else if(filterVal == "email"){
                        if(val.email.toString().toLowerCase().includes(searchTerm.toLowerCase()) ){
                            return val;
                        }
                    }
                }).map((list) => (
                
                    <div className="list_01 lists" key={list.id}>
                    <ul>
                        <Link to={`/view/${list.id}`}>
                        <li className="lt">
                            <p>{list.title}</p>
                        </li>
                        <li className="lc">
                            <p>{list.desc} </p>
                        </li>
                        <li className="lm">
                            <img src={list.fileUrl} alt={list.title} />
                        </li>
                        </Link>
                        <li className="lb">
                            <button style={{display: list.email == userCurrent.email ? "" : "none" }} onClick={ () => deleteBoard(list) }>삭제</button>
                            <button style={{display: list.email == userCurrent.email ? "" : "none" }} onClick={ () => modifyBoard(list) }>수정</button>
                        </li>
                    </ul>
                    </div>
                ))}

            </li>
        </>
    );
}

export default Board;