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
        const postsWithFavoriteRemoved = user.data.favoritePosts.filter(
          (favorite) => {
            if (favorite.postId !== postId) {
              return favorite;
            }
          }
        );

        const removeFavorite = await fauna.query(
          q.Update(q.Ref(q.Collection("users"), user.ref.id), {
            data: { favoritePosts: postsWithFavoriteRemoved },
          })
        );

        return res.json({
          message: "Post removido dos favoritos",
          deleted: true,
        });
      }

      return res.json({
        message: "Post não está nos favoritos",
        deleted: true,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        message: "Falha ao remover post dos favoritos",
        error: true,
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Methond not allowed");
  }
};
