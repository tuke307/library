"use server";
import prisma from "@/client";
import { Author } from "@prisma/client";

export default async function getAllAuthors(): Promise<Author[] | null> {
  const authors = await prisma.author.findMany();

  return authors;
}
