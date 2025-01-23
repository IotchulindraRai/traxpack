"use server";
import * as z from "zod";
import { LuggageSchema } from "@/zod/validator";
import { db } from "@/lib/db";
import { currentUserServerSide } from "@/hooks/currentUserServerSide";
import { getRFID } from "@/data/user";

export const luggageRegister = async (values: z.infer<typeof LuggageSchema>) => {
    try {
        // Validate the input fields using Zod schema
        const { success, data, error } = LuggageSchema.safeParse(values);

        // If validation fails, return an error message
        if (!success) {
            return { error: error?.message || "Invalid input fields!" };
        }

        // Check for authenticated user
        const user = await currentUserServerSide();
        if (!user) {
            return { error: "Unauthorized access" };
        }

        const userId = user.id!;

        // Destructure validated values
        const { rfid, luggageName } = data;

        // Check if the RFID is already in use
        const existingLuggage = await getRFID(rfid);
        if (existingLuggage) {
            return { error: "RFID already in use. Please use a different RFID." };
        }

        // Create a new luggage entry in the database
        await db.luggageID.create({
            data: {
                luggageRfid: rfid,
                userId,
                luggageName,
            },
        });

        // Return success message after luggage is added
        return { success: "Luggage successfully added!" };
    } catch (error) {
        // Catch any other unexpected errors
        console.error("Error during luggage registration:", error);
        return { error: "An error occurred while registering the luggage." };
    }
};
