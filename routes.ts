/**
 * List of public routes that can be accessed without authentication
 * These routes are open to everyone
 * @type {string[]}
 */
export const publicPaths = [
    "/",
    "/new-verification"
];

/**
 * List of routes related to authentication
 * Users who are already logged in will be redirected to /settings
 * @type {string[]}
 */
export const authenticationPaths = [
    "/login",
    "/register",
    "/error",
    "/reset",
    "/new-password"
];

/**
 * API authentication route prefix
 * All routes that start with this prefix are designated for API-based authentication
 * @type {string}
 */
export const apiAuthenticationPrefix = "/api/auth";

/**
 * Default path where users are redirected after successful login
 * @type {string}
 */
export const postLoginRedirect = "/dashboard";
