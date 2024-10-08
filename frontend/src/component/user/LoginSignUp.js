import './LoginSignUp.css';
import Loader from '../layout/Loader/Loader';
import { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen";

const LoginSignUp = () => {

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const loginSubmit = () => {
    console.log('Form Submitted');
  }

  const switchTabs = (e, tab) => {
    if (tab === "login") {
        switcherTab.current.classList.add("shiftToNeutral");
        switcherTab.current.classList.remove("shiftToRight");

        registerTab.current.classList.remove("shiftToNeutralForm");
        loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === 'register') {
        switcherTab.current.classList.add("shiftToRight");
        switcherTab.current.classList.remove("shiftToNeutral");

        loginTab.current.classList.add("shiftToNeutralForm");
        registerTab.current.classList.add("shiftToLeft");
    }
  };

  // To be continued from : 7h 36m

  // <MailOutlineIcon />
  // <LockOpenIcon />

  // Just testing hactober-fest PR 

  return (
    <Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, 'login')}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, 'register')}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
                <i className="fa-regular fa-envelope customIcon" />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail}
              />
            </div>
            <div className="loginPassword">
              <i class="fa-solid fa-lock-open" />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forgot Password?</Link>    
            <input type="submit" value="Login" className="loginBtn" />        
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default LoginSignUp;
