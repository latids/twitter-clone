import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { postId } = req.query;

      if (!postId || typeof postId !== "string") {
        throw new Error("Invalid ID");
      }

      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      if (!post || post === undefined) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);

      return res.status(400).end();
    }
  }
  if (req.method === "DELETE") {
    try {
      const { postId } = req.query;

      if (!postId || typeof postId !== "string") {
        throw new Error("Invalid ID");
      }

      await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
  } else {
    return res.status(405).end();
  }
}
