"use server";
import { PrismaClient, User } from "@prisma/client";
import { revalidatePath } from 'next/cache'

// Create a new Prisma client instance for handling our database requests
const prisma = new PrismaClient();


export default async function createUser(formData: FormData): Promise<User | null> {
  try {    
    const user = await prisma.user.create({
      data: {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        street: formData.get('street') as string,
        houseNumber:  formData.get('houseNumber') as string,
        plz: parseInt(formData.get('plz') as string),
        city: formData.get('city') as string,
      },
    });
    
    //await submitForm()
    revalidatePath('/')

    return user;
  } catch (err) {
    console.log(err);
    return null;
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
