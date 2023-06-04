import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './Components/Landing.tsx'
import './index.css'
import { Provider } from './Context/index.tsx'
import Modal from './Modal/index.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const BrowserRouter = createBrowserRouter([
  {
  path: "/",
  element: <Landing />,
  },
  {
  path: "/about",
  element: <h1>About</h1>,
  },
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={BrowserRouter} />
      <Modal />
    </Provider>
  </React.StrictMode>,
)
