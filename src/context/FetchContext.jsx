import { createContext, useState } from "react";
// import useFetch from "../hooks/useFetch";

export const FetchContext = createContext();

export const FetchContextProvider = ( {children} ) => {

    const [data, setData] = useState([]);
    // const [validValue,setValidValue] = useState('')
    
    function requestApi(url){
        fetch(url)
        .then((res) => res.json())
        .then((res) => {
            setData(res)
            // setValidValue(true)
        })
        .catch(error =>{
            //window.alert("Request Error");
            console.error(error);
            // setValidValue(false);
        })
    }

    return(
        // <FetchContext.Provider value={{data, requestApi,validValue}}>
        <FetchContext.Provider value={{data,requestApi}}>
            {children}
        </FetchContext.Provider>
    )
}