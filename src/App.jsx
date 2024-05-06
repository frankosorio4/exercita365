import { Outlet } from "react-router-dom"
import Header from "./components/header";
import { FetchContextProvider } from "./context/FetchContext";
// import { UsuarioContextProvider } from "./context/UsuariosContext";
import { LocaisContextProvider } from "./context/LocaisContext";

function App() {

  return (
    <LocaisContextProvider>
      {/* <UsuarioContextProvider> */}
        <FetchContextProvider>

          <Header />

          <Outlet />

        </FetchContextProvider>
      {/* </UsuarioContextProvider> */}
    </LocaisContextProvider>
  )
}

export default App;
