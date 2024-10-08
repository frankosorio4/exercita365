import {Navigate, createBrowserRouter} from "react-router-dom"
import App from "../App.jsx"
import Dashboard from "../pages/dashboard.jsx"
import Cadastro from "../pages/cadastroLocais.jsx"
import ListaLocais from "../pages/listaLocais.jsx"
import Login from "../pages/loginCadastro.jsx"
import NotFound from "../pages/NotFound.jsx"
import EditarLocal from "../pages/editarLocal.jsx"

let isLogged =JSON.parse(localStorage.getItem("isLogged")) || false;

const PrivateRoute = ({children}) =>{
    return isLogged ? children : <Navigate to="/login" />
}

const routes = createBrowserRouter(
    [
        {
            path: "/login",
            element:<Login/>
        },
        {
            path: "/",
            element: (
                <PrivateRoute>
                    <App/>
                </PrivateRoute>
            ),
            errorElement: <NotFound/>,
            children:[
                {
                    path: "/",
                    element:<Dashboard/>
                },
                {
                    path: "/lista-locais",
                    element:<ListaLocais/>
                },
                {
                    path: "/cadastro-local",
                    element:<Cadastro/>
                },
                {
                    path: "/editar-local/:id",
                    element:<EditarLocal/>
                },
                // {
                //     path: "/login",
                //     element:<Login/>
                // }
            ]
        }
    ]
)

export default routes;