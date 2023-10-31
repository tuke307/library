import { Author, Location, Media, MediaType, RentedMedia, User } from "@prisma/client";


export type MediaDetailProp = {
  mediaId: string,
  mediaTitle: string,
  mediaMediaType: MediaType,
  mediaContent: string,
  mediaPublished: boolean,
  mediaISBN: string,
  mediaCreatedAt: Date,
  mediaUpdatedAt: Date,

  authorId: number | null,
  authorFirstName: string| null,
  authorLastName: string| null,
  authorBirthday: Date | null,
  authorEmail: string| null,

  locationId:  number | null,
  locationFloor: number | null,
  locationShelf: number | null,
  locationShelfSection: number | null,

  rentedMediaId: number| null,
  rentedMediaMediaId: string| null,
  rentedMediaUserId: number| null,
  rentedMediaUserLastName: string | null,
  rentedMediaUserFirstName: string | null,
  rentedMediaRentedDate: Date | null,
  rentedMediaReturnDate: Date | null,
};