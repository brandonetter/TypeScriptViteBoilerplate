import type { ContextType,APIContextType,User } from '../Context/types.d.ts'
import { Context, APIContext } from '../Context/index.tsx'
import { useContext, useState} from 'react'

function Login(){
    let [email,setEmail] = useState<string>('');
    let [password,setPassword] = useState<string>('');
    let {user} = useContext(Context) as ContextType;
    let {loginUser} = useContext(APIContext) as APIContextType;

    async function loginButton(){
        let res = await loginUser(email,password);
    }
    return (
        <div>
            {user.id && <h1>{user.id}</h1>}
            <h1>Login</h1>
            <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button onClick={()=>{
                loginButton();
            }}>Login</button>
        </div>
    )
}
export default Login;
