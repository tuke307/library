export type RentedMediaTableProp = {
  id: number;
  mediaId: string;
  mediaTitle: string;
  rentedAt: Date;
  returnedAt: Date | null;
};
