"use client";
import Track from "@/components/map/Track";
import { useParams } from "next/navigation";

export default function Page() {

    const { id } = useParams();
    return (
        <div>
            <Track params={{id:String(id)}} />
        </div>
    )
}
