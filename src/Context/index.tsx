import {useState, createContext, ReactNode} from 'react';

const Context = createContext({});
const APIContext = createContext({});

const Provider = ({children}:{children: ReactNode}) => {
    const [user, setUser] = useState({
        username: null,
    });
    const [count, setCount] = useState(0);



    // API Funcs
    const getUsers = async () => {
        const res = await fetch('http://localhost:3000/api/test');
        const data = await res.json();
        return data;
    };



    return <Context.Provider value={
        {
            user,setUser,
            count,setCount
        }
        }>
        <APIContext.Provider value={{getUsers}}>
        {children}
        </APIContext.Provider>
    </Context.Provider>
};

export {Context, APIContext, Provider};
