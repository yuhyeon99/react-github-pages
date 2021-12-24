import React, {useState, useEffect} from 'react';
import firebase from '../fire';
import {useHistory, useRouteMatch} from 'react-router';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useScrollMove from "./useScrollMove";

const Board = (props) => {
    
    const {userCurrent} = props;
    const history = useHistory();
    const match = useRouteMatch('/board');

    const {scrollInfos, scrollRemove} = useScrollMove({
        page : `/board`,
        path : `/view/`
    });

    const [loading, setLoading] = useState(false);

    const [memberImg, setMemberImg] = useState([]);

    function getMember(){
        const userRef = firebase.firestore().collection("Users");
        userRef.doc(userCurrent.uid).get().then((doc)=>{
            const fileUrl = doc.data().profileImg;
            setMemberImg(fileUrl);
        }).catch((err)=>{
            console.log(err);
        });
        
    }    
    const [progress, setProgress] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    let file = "";
    const [uploadStatus, setUploadStatus] = useState(true);
    const [fileType, setFileType] = useState('');

    const onFileChange = async (e) => {
        setUploadStatus(false);
        console.log(uploadStatus);
        file = e.target.files[0];
        setFileType(file.type);
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        const uploadTask = fileRef.put(file);
        uploadTask.on(
            "state_changed",
            snapshot =>{
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },error=>{
                console.log(error);
            },
            ()=>{
                uploadTask.snapshot.ref.getDownloadURL().then(url=>{
                    setFileUrl(url);
                    setUploadStatus(true);
                });
            }
        );
    };
    
    let photoFile = document.getElementById('photoFile');
    const [writeShow, setWriteShow] = useState(false);
    const [modifyShow, setModifyShow] = useState(false);
    const [lists, setLists] = useState([]);
    const [comments, setComments] = useState([]);

    const [modifyId, setModifyId] = useState();
    const [modifyTitle, setModifyTitle] = useState();
    const [modifyDesc, setModifyDesc] = useState();

    const [filterVal, setFilterVal] = useState("title");
    
    const [searchTerm, setSearchTerm] = useState("");

    const [commentText, setCommentText] = useState("");

    const ref = firebase.firestore().collection("crudtest");
    const commentRef = firebase.firestore().collection("comments");
    

    const onClick = id =>{
        history.push(`/view/${id}`);
    }


    async function getLists(){
        // setLoading(true);
        await ref.orderBy("dateTime","desc").get().then((item)=>{
            const items = item.docs.map((doc) => doc.data());
            setLists(items);
            // setLoading(false);
        });

        commentRef.orderBy("dateTime","desc").get().then((item)=>{
            const items = item.docs.map((doc) => doc.data());
            setComments(items);
            console.log(items[0].dateTime);
            // setLoading(false);
        });

        if (scrollInfos) {
            window.scrollTo(0, scrollInfos);
            const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            scrollRemove();
            console.log(scrollInfos);
        }
    }

    async function addBoard(newBoard){
         
        if(!uploadStatus){
            alert('이미지 업로드 중입니다.');
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
        setProgress(0);
        photoFile.value = "";
    
    }

    async function editBoard(updateBoard){

        if(!uploadStatus){
            alert('이미지 업로드 중입니다.');
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

        setProgress(0);        
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
    const commentSet = (idx) => {
        const comment = document.getElementsByClassName("comment")[idx];
        const commentInput = document.getElementsByClassName("comment_write")[idx];
        comment.style.borderBottom = "solid 1px #ced0d4";
        commentInput.style.display = "block";
    }

    const commitComment = (newComment) => {
        if(window.event.keyCode == 13){
            // enter 키 입력했을 때 발생하는 이벤트
            commentRef
            .doc(newComment.id)
            .set(newComment)
            .catch((err)=>{
                console.error(err);
            });

            getLists();
        }
    }

    useEffect(()=>{
        getLists();
        getMember();
    }, []);

    // useEffect(() => {
        
    // }, [scrollInfos, scrollRemove]);

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
                        <textarea onChange={(e)=>setDesc(e.target.value)} className="writeContent" value={desc} placeHolder="OOO님, 무슨 생각을 하고 계신가요?" />
                        <progress value={progress} max="100" /> <br />
                        <input type="file" id="photoFile" onChange={onFileChange} />
                        </li>
                        <li className="submitBtn"><button onClick={()=> addBoard({ title, desc, fileUrl, email:userCurrent.email, fileType:fileType, dateTime : firebase.firestore.FieldValue.serverTimestamp() , id: uuidv4() })}>게시</button></li>
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
                        <textarea onChange={(e)=>setModifyDesc(e.target.value)} className="writeContent" value={modifyDesc} placeHolder="OOO님, 무슨 생각을 하고 계신가요?" />
                        <progress value={progress} max="100" /> <br />
                        <input type="file" onChange={onFileChange} />
                        </li>
                        <li className="submitBtn"><button onClick={()=> editBoard({ title :modifyTitle, desc : modifyDesc, fileType:fileType, fileUrl, id: modifyId })}>수정 </button></li>
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
                }).map((list,index) => (
                
                    <div className="list_01 lists" key={list.id}>
                    <ul>
                        {/* <Link to={`/view/${list.id}`}> */}
                        <li className="lt"  onClick={()=> onClick(list.id)}>
                            <p>{list.title}</p>
                        </li>
                        <li className="lc"  onClick={()=> onClick(list.id)}>
                            <p>{list.desc} </p>
                        </li>
                        <li className="lm"  onClick={()=> onClick(list.id)}>
                            {list.fileUrl ? (
                                list.fileType == "video/mp4" 
                                ?
                                <video style={{width:"100%"}} src={list.fileUrl} alt={list.title} controls autoplay></video>
                                :
                                <img src={list.fileUrl} alt={list.title} />
                            ) : (
                                <>
                                </>
                            )}
                        </li>
                        {/* </Link> */}
                        <li className="lb">
                            <button style={{display: list.email == userCurrent.email ? "" : "none" }} onClick={ () => deleteBoard(list) }>삭제</button>
                            <button style={{display: list.email == userCurrent.email ? "" : "none" }} onClick={ () => modifyBoard(list) }>수정</button>
                        </li>
                        <li className="status">

                        </li>
                        <li className="comment">
                            <p onClick={()=>commentSet(index)} style={{textAlign:"center",cursor:"pointer"}}><FontAwesomeIcon style={{cursor:"pointer"}} icon={faCommentAlt}/> 댓글 달기</p>
                        </li>
                        <li className="comment_write">
                            <div className="imgArea">
                                <img src={memberImg ? memberImg : {} } alt="" />
                            </div>
                            <input onKeyDown={()=>commitComment({id : list.id, email:userCurrent.email, commentText ,dateTime : firebase.firestore.FieldValue.serverTimestamp(), })} className="commentArea" type="text" onChange={(e)=>{setCommentText(e.target.value)}} value={commentText} placeHolder="댓글을 입력하세요..." />
                            {comments.filter((val)=>{
                                if(list.id == val.id){
                                    return val;
                                }
                            }).map((list,idx)=>(
                                <div>
                                    {/* display 시킬 내용들 출력란 */}
                                    {list.dateTime.toDate().toDateString()}
                                </div>
                            ))}
                        </li>
                    </ul>
                    </div>
                ))}

            </li>
        </>
    );
}

export default Board;