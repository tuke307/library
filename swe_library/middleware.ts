export { default } from "next-auth/middleware"

// these are the routes that are protected by the middleware
// if a user is not authenticated, they will be redirected to the login page
export const config = { matcher: [ "/media/return", "/media/create", "/media/edit", "/user/create", "/rentedmedia/create", ] }