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
      const { postId, userEmail } = req.body;

      const user = await fauna.query<User>(
        q.Get(q.Match(q.Index("user_by_email"), userEmail))
      );

      const isInFavorites = user.data.favoritePosts.find(
        (favorite) => favorite.postId === postId
      );

      if (isInFavorites) {
        return res.json({
          message: "Post já está nos favoritos",
          error: false,
        });
      }

      const addFavorite = await fauna.query(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: { favoritePosts: [...user.data.favoritePosts, { postId }] },
        })
      );

      console.log(addFavorite);
      return res.json({ message: "Adicionado aos favoritos", error: false });
    } catch (error) {
      console.log(error);
      return res.json({
        message: "Falha ao adicionar post aos favoritos",
        error: true,
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Methond not allowed");
  }
};
