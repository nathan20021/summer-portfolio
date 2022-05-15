import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const options = {
  providers: [
    // eslint-disable-next-line new-cap
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

// eslint-disable-next-line new-cap
export default (req, res) => NextAuth(req, res, options);
