import './LoginBar.css';
import {useEffect,useState,useContext} from 'react';
import {Context} from '../../Context/index.tsx';
import type {ContextType} from '../../Context/types.d.ts';


export default function LoginBar() {
    const {user,modal,setModal} = useContext(Context) as ContextType;

    const toggleLogin = () => {
        setModal({...modal,login:!modal.login});
    }
    useEffect(()=>{
        console.log(user.id);
        },[user])
    return <>
    {user.id == -1 || user.id==null ?
    <div className="login-bar">
        <div className='main-button' onClick={toggleLogin}>Login</div>
    </div>
    :
    <div className="login-bar">
        <div className='login-bar-title'>LoginBar</div>

    </div>
    }
    </>
}
