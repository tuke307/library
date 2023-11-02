"use server";
import { RentedMediaTableProp } from "@/models/rentedMediaTable";
import { Media, PrismaClient, RentedMedia } from "@prisma/client";

const prisma = new PrismaClient();

export async function getRentedMediaByUserId(
  id: number,
): Promise<RentedMediaTableProp[] | null> {
  try {
    const rentedMedias = await prisma.rentedMedia.findMany({
      where: {
        userId: {
          equals: id,
        },
      },

      select: {
        id: true,
        mediaId: true,
        rentedAt: true,
        returnedAt: true,
        media: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!rentedMedias) {
      return null;
    }

    const rentedMediaTableProp: RentedMediaTableProp[] = rentedMedias.map(
      (rentedMedia) => ({
        id: rentedMedia.id,
        mediaId: rentedMedia.mediaId,
        mediaTitle: rentedMedia.media.title,
        rentedAt: new Date(rentedMedia.rentedAt),
        returnedAt: rentedMedia.returnedAt
          ? new Date(rentedMedia.returnedAt)
          : null,
      }),
    );

    return rentedMediaTableProp;
  } catch (err) {
    return null;
  }
}

export async function updateRentedMediaById(id: number): Promise<RentedMedia | null> {
  try {
    const rentedMedia = await prisma.rentedMedia.update({
      where: {
        id: id,
      },
      data: {
        returnedAt: new Date(),
      },
    });

    return rentedMedia;
  } catch (err) {
    // console.log(err);
    return null;
  }
}

export async function createRentedMedia(
  userId: number,
  mediaId: string,
): Promise<RentedMedia> {
  try {
    const rentedMedia = await prisma.rentedMedia.create({
      data: {
        userId: userId,
        mediaId: mediaId,
        rentedAt: new Date(),
      },
    });

    return rentedMedia;
  } catch (err) {
    return false;
  }
}
