import { useEffect, useState } from "react";
import axios from "axios";

export default function useCoordinated() {

    const [latitude, setLatitude] = useState<{lat: number; }[]>([]);
    const [Longitude, setLongitude] = useState<{lat: number;}[]>([]);
    useEffect(() => {

        axios.get("http://localhost:8080/random-coordinates")
        .then((response)=>{
            console.log(response.data.lat, response.data.lng);
            setLatitude(response.data.lat);
            setLongitude(response.data.lng);
        })
    },[])
    return {
        latitude,
        Longitude
    }
}
