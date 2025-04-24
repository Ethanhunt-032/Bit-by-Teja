import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"

export default function CreateAccountPage(){

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [error,setError] = useState("");

    const navigate = useNavigate() ;
    async function CreateAccount() {
        if (password != confirm_password){
            setError("The password & confirm Password doesn't match")
            return;
        }
        try{
            await createUserWithEmailAndPassword(getAuth(),email,password);
            navigate('/');
        }
        catch(e){
            setError(e.message);
        }
    }

    return(
        <>
            <h1>Create Account</h1>

            {error && <p>{error}</p>}

            <label >Email:
                <input placeholder="Enter your Email" value={email} type="text" onChange={e => setEmail(e.target.value)}/>
            </label>
            
            <label >Password:
                <input placeholder="Enter your Password" value={password} type="password" onChange={e => setPassword(e.target.value)}/>
            </label>

            <label >Confirm Password:
                <input placeholder="Confirm your Password" value={confirm_password} type="password" onChange={e => setConfirmPassword(e.target.value)}/>
            </label>

            <button onClick={CreateAccount}>Create Account</button>
            <br/>
            <Link to={'/login'}>Already have an Account, LogIn</Link>
        </>
    )
}