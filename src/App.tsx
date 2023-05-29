import { useContext, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { ContextType,APIContextType,User } from './Context/types.d.ts'
import { Context, APIContext } from './Context/index.tsx'
function App() {


  const {user,setUser} = useContext(Context) as ContextType;
  const {getUsers,registerUser,loginUser,logout} = useContext(APIContext) as APIContextType;
  const [users,setUsers] = useState<User[]>([]);



  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {user.username}
        <button onClick={async () => {

          let user = await registerUser({firstName:"braasdadasdn",lastName:"ett",email:"bran@dbrandoo.com",password:"1234"});
          //@ts-ignore
          let tryUser = await loginUser("brand@brando.com","1234");
          let users = await getUsers();
          setUsers(users);
        }}>
        </button>
        <button onClick={async () => {
          let user = await logout();
          setUser({id:null});
        }} />
        {users.length > 0 && users.map((user) => {
          return <p>{user.id}{" "}
            {user.firstName}
          </p>
        })

        }
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
