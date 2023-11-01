"use server";
import { Media, MediaType, PrismaClient, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { MediaDetailProp } from "@/models/mediaDetails";
import { MediaTableProp } from "@/models/mediaTable";

const prisma = new PrismaClient();

export async function createMedia(formData: FormData): Promise<Media | null> {
  try {
    const media = await prisma.media.create({
      data: {
        mediaType: formData.get("mediaMediaType") as MediaType,
        title: formData.get("mediaTitle") as string,
        content: formData.get("mediaContent") as string,
        published: Boolean(formData.get("mediaPublished")),
        ISBN: formData.get("mediaISBN") as string,
        authorId: Number(formData.get("authorId")),
        locationId: Number(formData.get("locationId")),
      },
    });

    return media;
  } catch (err) {
    //console.log(err);
    return null;
  }
}

export async function getMediaDetails(
  id: string,
): Promise<MediaDetailProp | null> {
  try {
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
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
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

    if (media === null) {
      return null;
    }

    const mediaDetails: MediaDetailProp = {
      mediaId: media.id,
      mediaTitle: media.title,
      mediaMediaType: media.mediaType,
      mediaContent: media.content!,
      mediaPublished: media.published,
      mediaISBN: media.ISBN!,
      mediaCreatedAt: media.createdAt,
      mediaUpdatedAt: media.updatedAt,

      authorId: media.author.id,
      authorFirstName: media.author.firstName,
      authorLastName: media.author.lastName,
      authorBirthday: media.author.birthday,
      authorEmail: media.author.email,

      locationId: media.location.id,
      locationFloor: media.location.floor,
      locationShelf: media.location.shelf,
      locationShelfSection: media.location.shelfSection,

      rentedMediaId:
        media.rentedBy.length > 0 ? media.rentedBy[0].id : null,
      rentedMediaMediaId:
        media.rentedBy.length > 0 ? media.rentedBy[0].mediaId : null,
      rentedMediaUserId:
        media.rentedBy.length > 0 ? media.rentedBy[0].userId : null,
      rentedMediaUserLastName:
        media.rentedBy.length > 0 ? media.rentedBy[0].user.lastName : null,
      rentedMediaUserFirstName:
        media.rentedBy.length > 0 ? media.rentedBy[0].user.firstName : null,
      rentedMediaRentedDate:
        media.rentedBy.length > 0 ? media.rentedBy[0].rentedAt : null,
      rentedMediaReturnDate:
        media.rentedBy.length > 0 ? media.rentedBy[0].returnedAt : null,
    };

    return mediaDetails;
  } catch (err) {
    //console.log(err);
    return null;
  }
}

export async function getMediaTable(): Promise<MediaTableProp[] | null> {
  try {
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

    const mediaTableProps: MediaTableProp[] = medias.map((media) => ({
      id: media.id,
      title: media.title,
      authorName: `${media.author.firstName} ${media.author.lastName}`,
      rented: media.rentedBy.length > 0 ? true : false,
      locationName: `${media.location.floor}-${media.location.shelf}-${media.location.shelfSection}`,
    }));

    return mediaTableProps;
  } catch (err) {
    //console.log(err);
    return null;
  }
}

export async function updateMedia(media: Media): Promise<Media | null> {
  try {
    const retMedia = await prisma.media.update({
      where: {
        id: media.id,
      },
      data: {
        mediaType: media.mediaType,
        title: media.title,
        content: media.content,
        published: media.published,
        ISBN: media.ISBN,
        authorId: media.authorId,
        locationId: media.locationId,
        updatedAt: new Date(),
      },
    });

    return retMedia;
  } catch (err) {
    //console.log(err);
    return null;
  }
}

// also deletes all rentals of this media
export async function deleteMedia(id: string): Promise<Media | null> {
  try {
    const media = await prisma.media.delete({
      where: {
        id: id,
      },
    });

    return media;
  } catch (err) {
    //console.log(err);
    return null;
  }
}
