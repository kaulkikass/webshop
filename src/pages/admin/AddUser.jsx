import { useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

function AddUser() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const firebaseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_wh8v_WLLMaOSZGejwqUy9JYfVtrCYuk"
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const signup = () => {
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
            // kuvame useState abil kasutjale sõnumi
          setMessage(t(body.error.message));  
        } else {
            // toast, et õnnestus
          setMessage("");
          toast.success(`Kasutaja registreeritud`, {
            position: "bottom-right",
            theme: "dark",
            autoClose: 3000,
          });
          emailRef.current.value = '';
          passwordRef.current.value = '';
        }
      });
  }

  return ( 
  <div>
    <ToastContainer />
    <div>{message}</div>
    <label>{t("form.email")}</label> <br />
    <input ref={emailRef} type="text" /> <br />
    <label>Parool</label> <br />
    <input ref={passwordRef} type="password" /> <br />
    <button onClick={signup}>Lisa uus kasutaja</button>
  </div> );
}

export default AddUser;