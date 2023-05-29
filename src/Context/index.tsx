import {useState, createContext, ReactNode} from 'react';
import type {User} from './types.d.ts';
const Context = createContext({});
const APIContext = createContext({});

const Provider = ({children}:{children: ReactNode}) => {
    const [user, setUser] = useState<User>({id: null});
    const [count, setCount] = useState(0);



    // API Funcs
    async function getUsers(): Promise<User[]> {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        return data;
    };

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

    async function loginUser(email:string, password:string): Promise<User> {
        const res = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        return data;
    }


    return <Context.Provider value={
        {
            user,setUser,
            count,setCount
        }
        }>
        <APIContext.Provider value={{getUsers,registerUser,loginUser}}>
        {children}
        </APIContext.Provider>
    </Context.Provider>
};

export {Context, APIContext, Provider};
