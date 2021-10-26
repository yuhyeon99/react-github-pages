import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import firebase from '../fire';
require('firebase/auth');



const FirebaseLogin = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Unichat!</h2>

                <div 
                    className="login-button google"
                    onClick={() => firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Sign In with Google
                </div>

                <br /> <br />

                <div 
                    className="login-button facebook"
                    onClick={() => firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                >
                    <FacebookOutlined /> Sign In with Facebook
                </div>
            </div>
        </div>
    );
}

export default FirebaseLogin;