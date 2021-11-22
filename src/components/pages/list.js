import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import firebase from '../fire';
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useScrollMove from "./useScrollMove";

const View =  () =>{
    const [viewList, setViewList] = useState({
        title:"",
        desc:"",
        fileUrl:""
    });
    const { id } = useParams();
    const ref = firebase.firestore().collection("crudtest");
    
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        loadData();
    },[]);

    const { scrollInfos, scrollRemove } = useScrollMove({
        page: `view_${id}`,
        path: `/view/${id}`
      });
      
    useEffect(() => {
        if (scrollInfos ) {
          window.scrollTo(0, scrollInfos);
          const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
          
          scrollRemove();
        }
      }, [scrollInfos, scrollRemove]);



    const loadData = async (e) =>{
        setLoading(true);
        
        const docRef = ref.doc(id);
        await docRef.get().then((doc)=>{
            const items = doc.data(); 
            setViewList(items);
        });  
        setLoading(false);
    };

    if(loading){
        return <h1 className="loading">Loading...</h1>
    }


    return(
        <>
            <li className="center">
                <div className="list_01 lists" key={viewList.id}>
                <ul>
                    <li className="lt">
                        <p>{viewList.title}</p>
                    </li>
                    <li className="lc">
                        <p>{viewList.desc} </p>
                    </li>
                    <li className="lm viewLm">
                        {viewList.fileUrl ? (
                            viewList.fileType == "video/mp4" 
                            ?
                            <video style={{width:"100%"}} src={viewList.fileUrl} alt={viewList.title} controls autoplay></video>
                            :
                            <img src={viewList.fileUrl} alt={viewList.title} />
                        ) : (
                            <>
                            </>
                        )}
                    </li>
                    <li className="lb">
                        <Link to='/board'>
                            <button style={{width:"100%",padding:"20px 0",border:"solid 2px #3b5998",color:"#3b5998",fontSize:"20px",fontWeight:"bold"}}>
                                <FontAwesomeIcon icon={faList}/>
                            </button>
                        </Link>
                    </li>
                </ul>
                </div>
            </li>
            <li className="right">
                <div className="boxmenu_1"></div>
                <div className="boxmenu_2"></div>
                <div className="boxmenu_3"></div>
            </li>
        </>
    )
};

export default View;