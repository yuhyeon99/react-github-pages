import React from 'react';

const Login = (props) => {

    const {
        email, 
        setEmail, 
        password, 
        setPassword, 
        massage,
        setMassage,
        handleLogin, 
        handleSignup, 
        hasAccount, 
        setHasAccount, 
        emailError, 
        passwordError,
    } = props;
    return(
        <section className="login">
            <div className="loginCountainer">
                <div className="loginWrap">
                    <h1>{hasAccount?("LOGIN"):("SIGN UP")}</h1>
                    <div>
                        <input 
                            type="text" 
                            autoFocus 
                            required 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            placeHolder="E-mail"
                        />
                        <p className="errorMsg">{emailError}</p>
                    </div>
                    <div>
                        <input 
                            type="password" 
                            required 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            placeHolder="Password"
                        />
                        <p className="errorMsg">{passwordError}</p>
                    </div>
                    {!hasAccount ? (
                        <div>
                            <input 
                                type="text"
                                value={massage}
                                onChange={e => setMassage(e.target.value)}
                                placeHolder="한줄프로필"
                            />
                        </div>
                    ) : (
                        <>
                        </>
                    )}
                    <div className="btnContainer">
                        {hasAccount ? (
                            <>
                            <button onClick={handleLogin} >Sign in</button>
                            <p>
                                Don't have an account ? 
                                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
                            </p>
                            </>
                        ) : (
                            <>
                            <button onClick={handleSignup}>Sign up</button>
                            <p>
                                Have an account ? 
                                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
                            </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;