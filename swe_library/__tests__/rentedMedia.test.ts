import { getRentedMediaByUserId } from "@/actions/rentedMedia";
import prisma from "@/client";
import {
  Location,
  Media,
  MediaType,
  PrismaClient,
  RentedMedia,
  User,
} from "@prisma/client";

const author = {
  id: 999,
  firstName: "Musterman",
  lastName: "Max",
  birthday: "1975-06-26T00:00:00.000Z",
};

const user = {
  id: 999,
  firstName: "Max",
  lastName: "Mustermann",
  street: "Musterstraße 1",
  plz: 12345,
  city: "Musterstadt",
  houseNumber: "1",
}

const location = {
  id: 999,
  floor: 999,
  shelf: 999,
  shelfSection: 999,
};

const media = {
  id: "76df5eac-e3ee-4f5e-8fde-f32f7c27b329",
  title: "Test",
  type: MediaType.BOOK,
  authorId: 999,
  locationId: 999,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const rentedMedia = {
  id: 999,
  userId: 999,
  mediaId: "76df5eac-e3ee-4f5e-8fde-f32f7c27b329",
  returnedAt: new Date(),
  rentedAt: new Date(),
};

test("getRentedMediaByUserId returns rented media for user 999", async () => {
  const createdAuthor = await prisma.author.create({
    data: author,
  });
  const createdUser = await prisma.user.create({
    data: user,
  });
  const createdLocation = await prisma.location.create({
    data: location,
  });
  const createdMedia = await prisma.media.create({
    data: media,
  });
  const createdRentedMedia = await prisma.rentedMedia.create({
    data: rentedMedia,
  });

  const rentedMedias = await getRentedMediaByUserId(999);

  expect(rentedMedias).not.toBeNull();
  expect(rentedMedias).not.toBeUndefined();

  if (rentedMedias) {
    expect(rentedMedias.length).toBeGreaterThan(0);

    const firstMedia = rentedMedias[0];
    expect(firstMedia).toHaveProperty("id");
    expect(firstMedia).toHaveProperty("mediaId");
  }
});
