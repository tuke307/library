"use server";
import { MediaDetails } from "@/models/mediaDetails";
import { MediaTableProp } from "@/models/mediaTable";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

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
