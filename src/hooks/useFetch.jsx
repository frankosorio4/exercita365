import { useState } from "react";

async function useFetch(url) {
    const [data, setData] = useState(null);
    try {
        let response = await fetch(url)
        setData(response.json())
    }
    catch {
    }
    return (data);
}

export default useFetch;

// fetch(url)
//     .then((res) => res.json())
//     .then((res) => {
//         setData(res)
//     })
//     .catch(error => {
//         window.alert("Request Error");
//         console.error(error);
//     })
//     .finally(() => setLoading(false))

// Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore voluptas, dolore animi unde officiis porro libero numquam facilis at eos perspiciatis tempora ea quos nesciunt. Eum laudantium ea aperiam veniam?