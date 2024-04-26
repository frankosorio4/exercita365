import { Outlet } from "react-router-dom"
import Header from "./components/header";
import { FetchContextProviders } from "./context/FetchContext";

function App() {

  return (
    <FetchContextProviders>

      <Header />

      <Outlet />
      
    </FetchContextProviders>
  )
}

export default App;
