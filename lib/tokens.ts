import { fetchVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { fetchTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { fetchPasswordResetTokenByEmail } from "@/data/password-reset-token";

/**
 * Generate a password reset token for a given email address.
 * Deletes any existing password reset token for the email before generating a new one.
 * @param {string} email - The email address for which to generate the token.
 * @returns {Promise<object>} The generated password reset token.
 */
export const createPasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour expiry time

    const existingToken = await fetchPasswordResetTokenByEmail(email);

    if(existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id }
        });
    }

    const newPasswordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return newPasswordResetToken;
};

/**
 * Generate a verification token for the given email address.
 * If a previous token exists, it is deleted before generating a new one.
 * @param {string} email - The email address for the verification token.
 * @returns {Promise<object>} The generated verification token.
 */
export const createVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour expiry time

    const existingToken = await fetchVerificationTokenByEmail(email);

    if(existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id }
        });
    }

    const newVerificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return newVerificationToken;
};

/**
 * Generate a two-factor authentication token for the given email.
 * If an existing token is found, it is deleted before generating a new one.
 * @param {string} email - The email address for generating the two-factor token.
 * @returns {Promise<object>} The generated two-factor authentication token.
 */
export const createTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100000, 1000000).toString(); // 6-digit token
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry time

    const existingToken = await fetchTwoFactorTokenByEmail(email);

    if(existingToken) {
        await db.twoFactorToken.delete({
            where: { id: existingToken.id }
        });
    }

    const newTwoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return newTwoFactorToken;
};
