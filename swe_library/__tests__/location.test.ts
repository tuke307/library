import getAllFreeLocations from "@/actions/location";
import prisma from "@/client";
import { prismaMock } from "@/singleton";
import { PrismaClient, Location } from "@prisma/client";

const location = {
  floor: 1000,
  shelf: 1000,
  shelfSection: 1000,
};

test("getAllFreeLocations returns all free locations", async () => {
  let newLocation;

  try {
    newLocation = await prismaMock.location.create({
      data: location,
    });
  } catch (error) {
    console.error("Error creating location:", error);
  }

  // Check if newLocation is defined before accessing its properties
  if (newLocation) {
    const id = newLocation.id;

    prismaMock.location.findMany.mockResolvedValueOnce([newLocation]);
    const locations = await getAllFreeLocations();

    expect(locations).not.toBeNull();
    expect(locations).not.toBeUndefined();

    if (locations) {
      expect(locations.length).toBeGreaterThan(0);

      const foundLocation = locations.find((location) => location.id === id);
      expect(foundLocation).toHaveProperty("id", newLocation.id);
      expect(foundLocation).toHaveProperty("floor", newLocation.floor);
      expect(foundLocation).toHaveProperty("shelf", newLocation.shelf);
      expect(foundLocation).toHaveProperty("shelfSection", newLocation.shelfSection);
    }

    // Delete the location using the captured ID
    await prismaMock.location.delete({
      where: {
        id: newLocation.id,
      },
    });
  }
});
