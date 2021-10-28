import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import firebase from '../fire';

import { useAuth } from './AuthContext';
import axios from 'axios';
// test commit - yuhyeon
const FirebaseChat = () => {

    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async() => {
        await firebase.auth().signOut();

        history.push('/firebasechat');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
    }

    useEffect(()=>{
        if(!user){
            history.push('/firebasechat');

            return;
        }

        axios.get('https://api.chatengine.io/users/me',{
            headers: {
                "project-id": "848674b8-7126-4a14-a242-9a117b6d9de5",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                        { headers: { "private-key": "dabcd877-72a8-47e0-8451-40d9e85ad193" } }
                    )
                    .then(()=> setLoading(false))
                    .catch((error)=>console.log(error))
                });
        })
    }, [user, history]);

    if(!user || loading) return 'Loading...';
    return (
        <div className="chats-page">
            <div className="nav-var">
                <div className="logo-tab">
                    Unichat
                </div>
                <div className="logout-tab">
                    Logout
                </div>

                <ChatEngine
                    height="calc(90vh - 66px)"
                    projectID="848674b8-7126-4a14-a242-9a117b6d9de5"
                    userName={user.email}
                    userSecret={user.uid}
                />
                    
            </div>
        </div>
    );
};

export default FirebaseChat;