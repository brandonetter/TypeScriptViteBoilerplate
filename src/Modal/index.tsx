import {useContext} from 'react';
import {Context} from '../Context/index.tsx';
import type {ContextType} from '../Context/types.ts';
import Login from '../Components/Login.tsx';
import './Modal.css';
export default function Modal(){
    const {modal} = useContext(Context) as ContextType;
    return <>
    <div className="modal">
        {modal.login &&

        <div className='modal-login'><Login /></div>}
    </div>

    </>
}
