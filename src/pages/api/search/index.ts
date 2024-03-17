import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { searchQuery } = req.query;

    try {
      if (typeof searchQuery !== "string") {
        throw new Error("Invalid search query");
      }

      const searchResults = await prisma.post.findMany({
        where: {
          body: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        include: {
          user: true,
        },
        take: 99,
      });
      const formattedSearchResults = searchResults.map((result) => ({
        id: result.id,
        userId: result.userId,
        name: result.user.name,
        username: result.user.username,
        body: result.body,
        createdAt: result.createdAt,
      }));

      res.status(200).json({ searchResults: formattedSearchResults });
    } catch (error) {
      console.error("Error fetching search results:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
