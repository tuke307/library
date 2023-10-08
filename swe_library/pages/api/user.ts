import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import multer from "multer";

// Create a new Prisma client instance for handling our database requests
const prisma = new PrismaClient();

// Create a multer instance for handling form data
const upload = multer();

// set bodyparser for the post multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ error: "Failed to load data" });
    }
  } else if (req.method === "POST") {
    try {
      upload.none()(req as any, res as any, async () => {
        const formData = req.body; // Now req.body contains the parsed form data

        const result = await createUser(formData);
        res.status(200).json({ result });
      });
    } catch (err) {
      res.status(500).json({ error: "failed to load data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

async function createUser(input :any) {
  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      street: input.street,
      plz: parseInt(input.plz),
      city: input.city,
    },
  });
  return user;
}
