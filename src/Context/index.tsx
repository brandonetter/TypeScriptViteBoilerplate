import {useEffect,useState, createContext, ReactNode} from 'react';
import type {User} from './types.d.ts';
const Context = createContext({});
const APIContext = createContext({});

const Provider = ({children}:{children: ReactNode}) => {

    const [user, setUser] = useState<User>({id: -1});
    const [count, setCount] = useState(0);
    const [modal, setModal] = useState({
        login: false,
    });
useEffect(() => {
        if(user.id==-1){
            auth().then((data) => {
                if(data.message == "Auth Error"){
                    setUser({id:null});
                }else{
                    setUser(data);
                }
            });
        }
        }, [])

    // API Funcs
    async function getUsers(): Promise<User[]> {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        return data;
    };

    async function auth():Promise<any>{
        const res = await fetch('http://localhost:3000/api/users/auth',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }

        });
        const data = await res.json();
        return data;
    }

    async function registerUser(user: User): Promise<User> {
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if(res.ok){
            const data = await res.json();
            return data;
        }else{
            throw new Error("Error registering user");
        }

        const data = await res.json();
        console.log(data);
        return data;
    }

    async function logout(): Promise<any>{
        const res = await fetch('http://localhost:3000/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const data = await res.json();
        setUser({id:null});
        return data;
    }
    async function updateAge(age:number): Promise<any>{
        const res = await fetch('http://localhost:3000/api/users/age', {
            method: 'PUT',
            body: JSON.stringify({age}),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    }

    async function allUsers(): Promise<User[]> {
        const res = await fetch('http://localhost:3000/api/users/all');
        const data = await res.json();
        return data;
    };

    async function loginUser(email:string, password:string): Promise<User> {
        const res = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        setUser(data);
        return data;
    }


    return <Context.Provider value={
        {
            user,setUser,
            count,setCount,
            modal,setModal
        }
        }>
        <APIContext.Provider value={{getUsers,registerUser,loginUser,logout,updateAge,allUsers}}>
        {children}
        </APIContext.Provider>
    </Context.Provider>
};

export {Context, APIContext, Provider};
