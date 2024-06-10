import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak"

const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ]
}

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };