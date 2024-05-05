"use client";
import { getAllLuggage } from "@/actions/getAllLuggage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function ListLuggage() {

    const route = useRouter();

    const [luggageAll, setLuggageAll] = useState<{ id: string; userId: string; luggageRfid: string; luggageName: string; }[]>([]);

    const OnClick = (id:string) => {
        route.push(`/track/${id}`);
    }
    useEffect(() => {
        const luggageData = getAllLuggage();
        luggageData.then((data) => {
            if ('error' in data) {
                console.error(data.error);
            } else {
                console.log(data);
                setLuggageAll(data);
            }
        });
    },[]);

    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader className="text-2xl font-bold justify-center flex items-center">
                List Luggage
            </CardHeader>
            <CardContent className="grid gap-7">
                    {luggageAll.map((luggage) => (
                        <div key={luggage.id} className="grid grid-rows-1 gap-4">
                            <h1 className="text-lg font-mono">{luggage.luggageName}</h1>
                            <Button variant="outline"
                            className="font-mono bg-teal-400 text-sm"
                            onClick={()=>{OnClick(luggage.luggageRfid)}}
                            >
                                Track
                            </Button>
                        </div>

                    ))}
            </CardContent>
        </Card>
    )
}
