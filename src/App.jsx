import { Outlet } from "react-router-dom"
import Header from "./components/header";
import { FetchContextProvider } from "./context/FetchContext";
import { UsuarioContextProvider } from "./context/UsuariosContext";

function App() {

  return (
    <UsuarioContextProvider>
      <FetchContextProvider>

        <Header />

        <Outlet />

      </FetchContextProvider>
    </UsuarioContextProvider>
  )
}

export default App;
