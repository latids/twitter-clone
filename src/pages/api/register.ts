import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email, username, name, password } = req.body;

    if (!email || !password || !username || !name) {
      throw new Error("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}
