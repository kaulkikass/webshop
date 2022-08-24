import { useRef } from "react";

function SignIn() {
    const emailRef= useRef();
    const passwordRef = useRef();

    const login = () => {}
    return ( 
    <div>
        <label>Email</label> <br />
        <input type="text" />
    </div> 
    );
}

export default SignIn;