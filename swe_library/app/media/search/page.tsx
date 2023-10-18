import { PrismaClient, Media } from "@prisma/client";
import React from "react";
import { MediaTableProp } from "@/models/mediaTable";
import MediaTable from "./components/mediaTable";

const prisma = new PrismaClient();

export default async function MediaSearchPage() {
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

  const mediaTableProps : MediaTableProp[] = medias.map((media) => ({
    id: media.id,
    title: media.title,
    authorName: `${media.author.firstName} ${media.author.lastName}`,
    rented: media.rentedBy.length > 0 ? true : false,
    locationName: `${media.location.floor}-${media.location.shelf}-${media.location.shelfSection}`,
  }));

  return (
    <section>
      <MediaTable mediaTableProps={mediaTableProps} />
    </section>
  );
}