"use server";
import { Author, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getAllAuthors(): Promise<Author[] | null> {
  const authors = await prisma.author.findMany();

  return authors;
}
