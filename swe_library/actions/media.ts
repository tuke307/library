"use server";
import { Media, MediaType, PrismaClient, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { MediaDetailProp } from "@/models/mediaDetails";
import { MediaTableProp } from "@/models/mediaTable";

const prisma = new PrismaClient();

export async function createMedia(
  mediaType: MediaType,
  title: string,
  published: boolean,
  content: string | undefined,
  ISBN: string | undefined,
  authorId: number,
  locationId: number,
): Promise<Media | null> {
  try {
    const mediaData: any = {
      mediaType,
      title,
      published,
      authorId,
      locationId,
    };

    if (content) {
      mediaData.content = content;
    }

    if (ISBN) {
      mediaData.ISBN = ISBN;
    }

    mediaData.createdAt = new Date();
    
    const media = await prisma.media.create({
      data: mediaData,
    });

    return media;
  } catch (err) {
    console.log(err);
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
      authorBirthday: media.author.birthday || undefined,
      authorEmail: media.author.email  || undefined,

      locationId: media.location.id,
      locationFloor: media.location.floor,
      locationShelf: media.location.shelf,
      locationShelfSection: media.location.shelfSection,

      rentedMediaId:
        media.rentedBy.length > 0 ? media.rentedBy[0].id : undefined,
      rentedMediaMediaId:
        media.rentedBy.length > 0 ? media.rentedBy[0].mediaId : undefined,
      rentedMediaUserId:
        media.rentedBy.length > 0 ? media.rentedBy[0].userId : undefined,
      rentedMediaUserLastName:
        media.rentedBy.length > 0 ? media.rentedBy[0].user.lastName : undefined,
      rentedMediaUserFirstName:
        media.rentedBy.length > 0 ? media.rentedBy[0].user.firstName : undefined,
      rentedMediaRentedDate:
        media.rentedBy.length > 0 ? media.rentedBy[0].rentedAt : undefined,
      rentedMediaReturnDate:
        media.rentedBy.length > 0 ? media.rentedBy[0].returnedAt ?? undefined : undefined,
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

export async function updateMedia(
  id: string,
  mediaType: MediaType,
  title: string,
  content: string | undefined,
  published: boolean,
  ISBN: string | undefined,
  authorId: number,
  locationId: number,
): Promise<Media | null> {
  try {
    const retMedia = await prisma.media.update({
      where: {
        id: id,
      },
      data: {
        mediaType: mediaType,
        title: title,
        content: content,
        published: published,
        ISBN: ISBN,
        authorId: authorId,
        locationId: locationId,
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

export async function getAllFreeMedias(): Promise<MediaTableProp[] | null> {
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
            returnedAt: {
              not: null,
            }
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
      rented: false,
      locationName: `${media.location.floor}-${media.location.shelf}-${media.location.shelfSection}`,
    }));

    return mediaTableProps;
  } catch (err) {
    //console.log(err);
    return null;
  }
}
