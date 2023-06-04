
import type {APIContextType,User } from '../Context/types.ts'
import { APIContext } from '../Context/index.tsx'
import { useState,useContext,useEffect} from 'react'

export default function AllUsers(){
    let {getUsers} = useContext(APIContext) as APIContextType;
    let [users,setUsers] = useState<User[]>([]);
    useEffect(()=>{
        getUsers().then((data)=>{
            setUsers(data);
            console.log(data);
        })
    },[])


    return <>{users.length &&
        users.map((user:User,idx:number)=>{
            return <span key={idx}>{user.firstName}{user.id}{user.status}</span>
        })}
        <h1>All Users</h1>
        </>
}
