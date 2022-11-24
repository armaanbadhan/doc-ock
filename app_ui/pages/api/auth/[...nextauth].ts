import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    providers: [],
    pages: {
        signIn: "/login"
    }
})