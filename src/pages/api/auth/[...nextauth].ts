import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ email }) {
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            ),
            q.Create(q.Collection("users"), {
              data: { email, favoritePosts: [] },
            }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
          )
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
