export type RentedMediaTableProp = {
  mediaId: string;
  title: string;
  rentedAt: Date;
  returnedAt: Date | null;
};
