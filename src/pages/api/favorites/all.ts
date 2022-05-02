import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";

type User = {
  ref: {
    id: string;
  };
  data: {
    favoritePosts: Array<{
      postId: string;
    }>;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { userEmail } = req.body;

      const user = await fauna.query<User>(
        q.Get(q.Match(q.Index("user_by_email"), userEmail))
      );

      const { favoritePosts } = user.data;

      return res.json({ favoritePosts });
    } catch (error) {
      console.log(error);
      return res.json({
        message: "Falha ao buscar favoritos",
        error: true,
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Methond not allowed");
  }
};
