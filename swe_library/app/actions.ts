"use server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

// Create a new Prisma client instance for handling our database requests
const prisma = new PrismaClient();


export async function createUser(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      street: z.string(),
      plz: z.number(),
      city: z.string(),
    });

    const data = schema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      street: formData.get("street"),
      plz: formData.get("plz"),
      city: formData.get("city"),
    });

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        street: data.street,
        plz: data.plz,
        city: data.city,
      },
    });

    return user;
  } catch (err) {
    return err;
  }
}
