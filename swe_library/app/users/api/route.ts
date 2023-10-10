import { PrismaClient } from "@prisma/client";

// Create a new Prisma client instance for handling our database requests
const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json({ users });
  } catch (err) {
    return Response.error();
  }
}