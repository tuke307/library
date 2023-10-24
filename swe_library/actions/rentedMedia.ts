"use server";
import { RentedMediaTableProp } from "@/models/rentedmediaTable";
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
        mediaId: rentedMedia.mediaId,
        title: rentedMedia.media.title,
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
