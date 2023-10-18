import { Media } from "@prisma/client";

// derivated media model from Media, with additional properties
export type MediaTableProp = {
  id: string;
  title: string;
  authorName: string;
  rented: Boolean;
  locationName: string;
};
