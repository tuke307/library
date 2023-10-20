
import { Author, Location, Media, RentedMedia } from "@prisma/client";

// derivated media model from Media, with additional properties
export type MediaDetails = Media & {
  author: Author;
  location: Location | null;
  rentedBy: RentedMedia[] | null;
};