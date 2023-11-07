"use server";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(formData: FormData): Promise<User | null> {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        street: formData.get("street") as string,
        houseNumber: formData.get("houseNumber") as string,
        plz: parseInt(formData.get("plz") as string),
        city: formData.get("city") as string,
      },
    });

    return user;
  } catch (err) {
    // console.log(err);
    return null;
  }
}

export async function getAllUsers(): Promise<User[] | null> {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.log(err);
    return null;
  }
}
