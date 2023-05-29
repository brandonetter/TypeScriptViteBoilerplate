import { useContext} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { ContextType,APIContextType } from './Context/types.d.ts'
import { Context, APIContext } from './Context/index.tsx'
function App() {


  const {user,setUser} = useContext(Context) as ContextType;
  const {getUsers} = useContext(APIContext) as APIContextType;



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
          setUser({
            username: "123",
          });
          console.log(await getUsers())
        }}>
        </button>
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
