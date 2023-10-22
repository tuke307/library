"use server";
import { Location, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getAllFreeLocations(): Promise<Location[] | null> {
  const authors = await prisma.location.findMany({
    where: {
      media: null,
    },
  });

  return authors;
}
