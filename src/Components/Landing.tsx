import { useState,useContext } from "react";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import { Context } from "../Context/index.tsx";
import type { ContextType } from "../Context/types.d.ts";
import UpdateAge from "./UpdateAge.tsx";
function Landing(){
    const [page,setPage] = useState('landing');
    const {user} = useContext(Context) as ContextType;

    return(
        <div>
            <h1> Landing Page </h1>
            {user.id !== -1
            && user.id==null && <>

            <button onClick={() => {
                setPage('register');
            }}>Register</button>
            <button onClick={() => {
                setPage('login');
            }}>Login</button>
            {page === 'register' && <Register />}
            {page === 'login' && <Login />}
            </>
            }
            {user.id !==-1 && user.id !== null && <h1>Logged in as {user.email}<UpdateAge /></h1>}


        </div>
    )
}
export default Landing;
