export { default } from "next-auth/middleware"

export const config = { 
    matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"] //pages for which the user must be signed in
}