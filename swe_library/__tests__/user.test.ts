import { createUser } from "@/actions/user";
import prisma from "@/client";

const user = {
  firstName: "Max",
  lastName: "Musterman",
  email: "max.musterman@gmail.com",
  street: "123 Main St",
  houseNumber: "1A",
  plz: 12345,
  city: "Test City",
};


test("createUser creates a new user and deletes it afterwards", async () => {
  const newUser = await createUser(user);
  // get it from new user property

  expect(newUser).not.toBeNull();

  if (newUser) {
    expect(newUser).toHaveProperty("id");
    expect(newUser).toHaveProperty("firstName", user.firstName);
    expect(newUser).toHaveProperty("lastName", user.lastName);
    expect(newUser).toHaveProperty("email", user.email);
    expect(newUser).toHaveProperty("street", user.street);
    expect(newUser).toHaveProperty("houseNumber", user.houseNumber);
    expect(newUser).toHaveProperty("plz", user.plz);
    expect(newUser).toHaveProperty("city", user.city);
  }


  await prisma.user.delete({
    where: {
      id: newUser?.id,
    },
  });
});