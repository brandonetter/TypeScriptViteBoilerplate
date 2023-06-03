import type { ContextType,APIContextType,User } from '../Context/types.d.ts'
import { Context, APIContext } from '../Context/index.tsx'
import { useContext, useState} from 'react'

function Register(){
    let [email,setEmail] = useState<string>('');
    let [password,setPassword] = useState<string>('');
    let [firstName,setFirstName] = useState<string>('');
    let [lastName,setLastName] = useState<string>('');
    let [status,setStatus] = useState<string>('student');
    let {user} = useContext(Context) as ContextType;
    let {registerUser} = useContext(APIContext) as APIContextType;

    async function registerButton(){
        let user:User = {
            email,
            password,
            firstName,
            lastName,
            status
        }
        let res = await registerUser(user);
        console.log(res);
    }
    return(
        <div>
            {user.id && <h1>{user.id}</h1>}
            <h1>Login</h1>
            <input type="text" placeholder="first name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <input type="text" placeholder="last name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <select onChange={(e)=>setStatus(e.target.value)}>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
            </select>
            <button onClick={()=>{
                registerButton();
            }}>Login</button>
        </div>
    )
}
export default Register;
