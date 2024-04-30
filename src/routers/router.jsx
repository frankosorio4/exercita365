import {createBrowserRouter} from "react-router-dom"
import App from "../App.jsx"
import Dashboard from "../pages/dashboard.jsx"
import Cadastro from "../pages/cadastroLocais.jsx"
import ListaLocais from "../pages/listaLocais.jsx"
import Login from "../pages/loginCadastro.jsx"
import NotFound from "../pages/NotFound.jsx"

const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            errorElement: <NotFound/>,
            children:[
                {
                    path: "/",
                    element:<Dashboard/>
                },
                {
                    path: "/cadastro-local",
                    element:<Cadastro/>
                },
                {
                    path: "/lista-locais",
                    element:<ListaLocais/>
                },
                {
                    path: "/login",
                    element:<Login/>
                },

            ]
        }
    ]
)

export default routes;