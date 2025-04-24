import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"

export default function LoginPage(){

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");

    const navigate = useNavigate() ;
    async function LogIn() {
        try{
            await signInWithEmailAndPassword(getAuth(),email,password);
            navigate('/articles');
        }
        catch(e){
            setError(e.message);
        }
    }

    return(
        <>
            <h1>Log In</h1>
            {error && <p>{error}</p>}
            <label >Email:
                <input placeholder="Enter your Email" value={email} type="text" onChange={e => setEmail(e.target.value)}/>
            </label>
            
            <label >Password:
                <input placeholder="Enter your Password" value={password} type="password" onChange={e => setPassword(e.target.value)}/>
            </label>

            <button onClick={LogIn}>Log In</button>
            <br/>
            <Link to={'/create-account'}>Don't have an Account, Create Account</Link>
        </>
    )
}