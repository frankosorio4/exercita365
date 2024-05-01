import { createContext, useState } from "react";
// import useFetch from "../hooks/useFetch";

export const FetchContext = createContext();

export const FetchContextProvider = ({ children }) => {

    const [data, setData] = useState([]);

    function requestApi(url) {
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setData(res)
            })
            .catch(error => {
                console.error(error);
            })
    }

    // async function requestApi(url) {
    //     try {
    //         let response = await fetch(url)
    //         setData(response.json())
    //     }
    //     catch {
    //         alert("CPE Invalido!")
    //     }
    // }

    return (
        // <FetchContext.Provider value={{data, requestApi,validValue}}>
        <FetchContext.Provider value={{ data, requestApi }}>
            {children}
        </FetchContext.Provider>
    )
}