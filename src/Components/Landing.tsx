import { useState,useContext } from "react";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import { Context } from "../Context/index.tsx";
import type { ContextType } from "../Context/types.d.ts";
import UpdateAge from "./UpdateAge.tsx";
import AllUsers from "./AllUsers.tsx";
import Header from "./Header/index.tsx";
function Landing(){
    const [page,setPage] = useState('landing');
    const {user} = useContext(Context) as ContextType;

    return(
        <>
            <Header />
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
            {user.id !==-1 && user.id !== null && <h1>Logged in as {user.email}<UpdateAge /><AllUsers /></h1>}


        </>
    )
}
export default Landing;
