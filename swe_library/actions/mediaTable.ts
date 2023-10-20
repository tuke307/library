"use server";
import { MediaTableProp } from "@/models/mediaTable";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getMediaTable(): Promise<MediaTableProp[] | null> {
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