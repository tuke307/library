import { PrismaClient, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Create a new Prisma client instance for handling our database requests
const prisma = new PrismaClient();

export async function createUser(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      birthdayDay: z.coerce.number(),
      birthdayMonth: z.coerce.number(),
      birthdayYear: z.coerce.number(),
      email: z.coerce.string().email(),
      street: z.string(),
      houseNumber: z.string(),
      plz: z.coerce.number(),
      city: z.string(),
    });

    const data = schema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      birthdayDay: formData.get("birthdayDay"),
      birthdayMonth: formData.get("birthdayMonth"),
      birthdayYear: formData.get("birthdayYear"),
      email: formData.get("email"),
      street: formData.get("street"),
      houseNumber: formData.get("houseNumber"),
      plz: formData.get("plz"),
      city: formData.get("city"),
    });

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: new Date(
          data.birthdayYear,
          data.birthdayMonth,
          data.birthdayDay,
        ),
        email: data.email,
        street: data.street,
        houseNumber: data.houseNumber,
        plz: data.plz,
        city: data.city,
      },
    });

    revalidatePath("/user/create");

    return { message: `Added user with id ${user.id}` };
  } catch (err) {
    return { message: `Failed to create user: ${err}` };
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (err) {
    return { message: `Failed to get user: ${err}` };
  }
}