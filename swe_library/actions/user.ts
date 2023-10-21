"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient();


export async function createUser(prevState: any, formData: FormData) {
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
    
    revalidatePath('/')
    return { message: `${user.lastName} ${user.firstName} erfolgreich erstellt.` }
  } catch (err) {
    console.log(err);
    return { message: 'Fehler beim erstellen des Kunden!' }
  }
}