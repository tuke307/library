"use server";
import { MediaType, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createMedia(prevState: any, formData: FormData) {
  try {
    const authorId = Number(formData.get("authorId"));
    const locationId = Number(formData.get("locationId"));
    if (isNaN(authorId) || isNaN(locationId)) {
      throw new Error("Invalid authorId or locationId");
    }

    const media = await prisma.media.create({
      data: {
        mediaType: formData.get("type") as MediaType,
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        published: formData.get("published")
          ? formData.get("published") === "true"
          : false,
        ISBN: formData.get("ISBN") as string,
        authorId: authorId,
        locationId: locationId,
      },
    });
    revalidatePath("/");
    return { message: `Media with ID: ${media.id} successfully created.` };
  } catch (err) {
    console.log(err);
    return { message: "Error creating media!" };
  }
}
