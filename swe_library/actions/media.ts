"use server";
import { Media, MediaType, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { MediaDetails } from "@/models/mediaDetails";
import { MediaTableProp } from "@/models/mediaTable";

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

export async function getMediaDetails(
  id: string,
): Promise<MediaDetails | null> {
  const media = await prisma.media.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      mediaType: true,
      createdAt: true,
      updatedAt: true,
      published: true,
      ISBN: true,
      authorId: true,
      locationId: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          email: true,
          birthday: true,
        },
      },
      rentedBy: {
        where: {
          returnedAt: null,
        },
        select: {
          id: true,
          mediaId: true,
          userId: true,
          returnedAt: true,
          rentedAt: true,
        },
      },
      location: {
        select: {
          id: true,
          floor: true,
          shelf: true,
          shelfSection: true,
          createdAt: true,
        },
      },
    },
  });

  if (!media) {
    return null;
  }

  const mediaDetails: MediaDetails = {
    ...media,
    author: media.author,
    rentedBy: media.rentedBy,
    location: media.location,
  };

  return mediaDetails;
}

export async function getMediaTable(): Promise<MediaTableProp[] | null> {
  const medias = await prisma.media.findMany({
    select: {
      id: true,
      title: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      rentedBy: {
        where: {
          returnedAt: null,
        },
        select: {
          id: true,
        },
      },
      location: {
        select: {
          floor: true,
          shelf: true,
          shelfSection: true,
        },
      },
    },
  });

  if (!medias) {
    return null;
  }

  const mediaTableProps: MediaTableProp[] = medias.map((media) => ({
    id: media.id,
    title: media.title,
    authorName: `${media.author.firstName} ${media.author.lastName}`,
    rented: media.rentedBy.length > 0 ? true : false,
    locationName: `${media.location.floor}-${media.location.shelf}-${media.location.shelfSection}`,
  }));

  return mediaTableProps;
}

export async function updateMedia(id: string, title: string, content: string): Promise<Media> {
  const media = await prisma.media.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
    },
  });

  if (!media) {
    throw new Error("Media not updated!");
  }

  return media;
}

export async function deleteMedia(id: string): Promise<Boolean> {
  try {
    await prisma.media.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (err) {
    //console.log(err);
    return false;
  }
}
