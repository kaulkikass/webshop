import { useContext, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../store/AuthContext';
import { useTranslation } from 'react-i18next'; // <---

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const firebaseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_wh8v_WLLMaOSZGejwqUy9JYfVtrCYuk"
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [message, setMessage] = useState(""); // <---
  const { t } = useTranslation(); // <---

  const login = () => {
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
    }
    fetch(firebaseUrl,{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()) // body+headers+http status code+time
      .then(body => {
        if (body.error) {
          setMessage(t(body.error.message));  
        } 
        if (body.registered) {
          let today = new Date(); // uus tänane kuupäev praeguse kellaajaga
          let expirationDate = new Date(today.getTime()+body.expiresIn*1000);
          const userData = {
            token: body.idToken,
            expires: expirationDate
          }
          sessionStorage.setItem("userData", JSON.stringify(userData));
          authCtx.login();
          navigate("/admin");
        }
      });
  }

  return ( 
  <div>
    <div>{message}</div>
    <label>Email</label> <br />
    <input ref={emailRef} type="text" /> <br />
    <label>Parool</label> <br />
    <input ref={passwordRef} type="password" /> <br />
    <button onClick={login}>Logi sisse</button>
  </div> );
}

export default SignIn;