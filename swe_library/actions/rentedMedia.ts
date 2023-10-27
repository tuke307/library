"use server";
import { RentedMediaTableProp } from "@/models/rentedMediaTable";
import { Media, PrismaClient } from "@prisma/client";

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

export async function updateRentedMediaById(id: number): Promise<boolean> {
  try {
    await prisma.rentedMedia.update({
      where: {
        id: id,
      },
      data: {
        returnedAt: new Date(),
      },
    });

    return true;
  } catch (err) {
    return false;
  }
}
