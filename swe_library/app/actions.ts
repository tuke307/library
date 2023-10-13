"use server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

// Create a new Prisma client instance for handling our database requests
const prisma = new PrismaClient();


// Create a new user
export async function createUser(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      birthday: z.coerce.date(),
      email: z.coerce.string().email(),
      street: z.string(),
      houseNumber: z.string(),
      plz: z.coerce.number(),
      city: z.string(),
    });

    const data = schema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      birthday: new Date(2000, 1, 1),
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
        birthday: data.birthday,
        email: data.email,
        street: data.street,
        houseNumber: data.houseNumber,
        plz: data.plz,
        city: data.city,
      },
    });

    return user;
  } catch (err) {
    return err;
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

    return employee;
  } catch (err) {
    return err;
  }
}


// login user
export async function loginUser(prevState: any, formData: FormData) {
  try {
    const schema = z.object({
      id: z.coerce.number(),
      birthday: z.coerce.date(),
    });

    const data = schema.parse({
      id: formData.get("id"),
      birthday: formData.get("birthday"),
    });

    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
        birthday: data.birthday,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    return err;
  }
}

