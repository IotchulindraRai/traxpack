import { useEffect, useState } from "react";
import axios from "axios";

export default function useCoordinated() {

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/random-coordinates`)
            .then((response) => {
                console.log(response.data.lat, response.data.lng);
                setLatitude(response.data.lat);
                setLongitude(response.data.lng);
            })
            .catch((error) => {
                console.error("Error fetching coordinates:", error);
            });
    }, []);

    return {
        latitude,
        longitude
    };
}
