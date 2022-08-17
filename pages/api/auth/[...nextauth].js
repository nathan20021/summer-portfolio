import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import sha256 from "crypto-js/sha256";

// eslint-disable-next-line new-cap
export default NextAuth({
  providers: [
    // eslint-disable-next-line new-cap
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "You are not welcome here",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (
          credentials?.username === "nhanto20021@gmail.com" &&
          sha256(credentials?.password).toString() ===
            "e69cd58bf4dbf75f9b7770b12d3250726c0b0c80c5bafcc227b855859983790c"
        ) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: 1,
            name: "Nathan",
            email: "luongn4@mcmaster.ca",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
});
