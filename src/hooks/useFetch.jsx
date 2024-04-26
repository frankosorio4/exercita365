import { useEffect, useState } from "react";

function useFetch(url){
    
    const [data, setData] = useState(null);

        fetch(url)
        .then((res) => res.json())
        .then((res) => {
            setData(res)
        })
        .catch(error =>{
            window.alert("Request Error");
            console.error(error);
        })
        .finally( () => setLoading(false))
    
    return( [data] );
}

export default useFetch;

// Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore voluptas, dolore animi unde officiis porro libero numquam facilis at eos perspiciatis tempora ea quos nesciunt. Eum laudantium ea aperiam veniam?