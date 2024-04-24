/**
* PASSOS PARA CONFIGURAR O REACT ROUTER DOM
*
* 1 - [X] - INSTALE O REACT ROUTER DOM USANDO O COMANDO "npm install react-router-dom"
* 2 - [X] - IMPORTE O "createBrowserRouter" DA BIBLIOTECA REACT ROUTER DOM
*    'import {createBrowserRouter} from "react-router-dom"'
* 3 - [X] - CRIE A LISTA DE ROTAS USANDO A FUNÇÃO "createBrowserRouter()""
* 4 - [x] - IMPORTE O RouterProvider DA BIBLIOTECA REACT ROUTER DOM
* "import {createBrowserRouter, RouterProvider} from "react-router-dom"
* 5 - [x] - CONFIGURAR O PROVIDER PASSANDO A PROP DAS ROTAS
* 6 - [] - CRIAR AS PÁGINAS E CONFIGURAR NA LISTA DE ROTAS
* 7 - [] - Importar as paginas
*/

import {createBrowserRouter} from "react-router-dom"
import App from "../App.jsx"
import Dashboard from "../pages/dashboard.jsx"
import Cadastro from "../pages/cadastroLocais.jsx"
import ListaLocais from "../pages/listaLocais.jsx"
import Login from "../pages/loginCadastro.jsx"

const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            // errorElement: <NotFound/>,
            children:[
                {
                    path: "/",
                    element:<Dashboard/>
                },
                {
                    path: "/cadastro",
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