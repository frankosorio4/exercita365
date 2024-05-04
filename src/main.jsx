import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routers/router'
import { UsuarioContextProvider } from "./context/UsuariosContext";


ReactDOM.createRoot(document.getElementById('root')).render(
  <UsuarioContextProvider>
    <RouterProvider router={routes}>
    </RouterProvider>
  </UsuarioContextProvider>
)
