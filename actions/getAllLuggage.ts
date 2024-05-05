"use server";
import {db } from "@/lib/db";
import { auth } from "@/auth";
export const getAllLuggage = async() => {

    const session = await auth();
    const userId = session?.user.id;
    try{
        const luggage = await db.luggageID.findMany({ where: { userId: userId } });
        return luggage;
    }catch {
        return {error: "Error fetching luggage"}
    }
}
