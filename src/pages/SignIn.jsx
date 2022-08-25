import { useRef } from "react";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const login = () => {
      // FIREBASE AUTHENTICATION
  }

  return ( <div>
    <label>Email</label> <br />
    <input ref={emailRef} type="text" /> <br />
    <label>Parool</label> <br />
    <input ref={passwordRef} type="password" /> <br />
    <button onClick={login}>Logi sisse</button>
  </div> );
}

export default SignIn;