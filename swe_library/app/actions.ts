"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Create a new Prisma client instance for handling our database requests
const prisma = new PrismaClient();


// Create a new user
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
        birthday: new Date(data.birthdayYear, data.birthdayMonth-1, data.birthdayDay+1),
        email: data.email,
        street: data.street,
        houseNumber: data.houseNumber,
        plz: data.plz,
        city: data.city,
      },
    });

    revalidatePath('/user/create')

    return { message: `Added user with id ${user.id}` }
  } catch (err) {
    return { message: `Failed to create user: ${err}` }
  }
}


// Employee login, returns the employee object and a token
export async function loginEmployee(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      id: z.coerce.number(),
      password: z.string(),
    });

    const data = schema.parse({
      id: formData.get("id"),
      password: formData.get("password"),
    });

    const employee = await prisma.employee.findUnique({
      where: {
        id: data.id,
        password : data.password,
      },
    });

    if (!employee) {
      throw new Error("Employee not found");
    }

    return { message: `Employee with id ${employee.id} was found.` }
  } catch (err) {
    return { message: `Failed to login employee: ${err}` }
  }
}


// login user
export async function loginUser(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      id: z.coerce.number(),
      birthdayDay: z.coerce.number(),
      birthdayMonth: z.coerce.number(),
      birthdayYear: z.coerce.number(),
    });

    const data = schema.parse({
      id: formData.get("id"),
      birthdayDay: formData.get("birthdayDay"),
      birthdayMonth: formData.get("birthdayMonth"),
      birthdayYear: formData.get("birthdayYear"),
    });


    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
        birthday: new Date(data.birthdayYear, data.birthdayMonth-1, data.birthdayDay+1),
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { message: `User with id ${user.id} was found.` }
  } catch (err) {
    return { message: `Failed to login user: ${err}` }
  }
}

