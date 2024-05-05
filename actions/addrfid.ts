"use server";
import * as z from "zod";
import { LuggageSchema } from "@/zod/validator";
import { db } from "@/lib/db";
import { currentUserServerSide } from "@/hooks/currentUserServerSide";
import { getRFID } from "@/data/user";


export const luggageRegister = async (values: z.infer<typeof LuggageSchema>) => {
    const validatedFields = LuggageSchema.safeParse(values);
    const user = await currentUserServerSide();
    if(!user) {
        return { error : "Unauthorized"}
    }
    const userId = user.id!;

    if(!validatedFields.success) {
        return {error: "Invalid fields!"}
    }

    const { rfid, luggageName } = validatedFields.data;

    const existingLuggage = await getRFID(rfid);

    if(existingLuggage){
        return { error: "RFID already in use"}
    }

    await db.luggageID.create({
        data: {
            luggageRfid: rfid,
            userId: userId,
            luggageName: luggageName,
        }
    });

    return { success: "Luggage added successfully!"}
}
