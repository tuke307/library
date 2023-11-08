import getAllAuthors from "@/actions/authors";
import prisma from "@/client";

const author = {
  firstName: "Musterman",
  lastName: "Max",
  birthday: "1975-06-26T00:00:00.000Z"
};

test("getAllAuthors returns an array of authors", async () => {
  let newAuthorData;

  try {
    // Create the author and capture the ID
    newAuthorData = await prisma.author.create({
      data: author,
    });
  } catch (error) {
    console.error("Error creating author:", error);
  }

  // Check if newAuthorData is defined before accessing its properties
  if (newAuthorData) {
    const newAuthorId = newAuthorData.id;

    const authors = await getAllAuthors();

    expect(authors).not.toBeNull();
    expect(authors).not.toBeUndefined();

    if (authors) {
      expect(authors.length).toBeGreaterThan(0);

      const author = authors.find((author) => author.id === newAuthorId);
      expect(author).toHaveProperty("id", newAuthorId);
      expect(author).toHaveProperty("firstName", newAuthorData.firstName);
      expect(author).toHaveProperty("lastName", newAuthorData.lastName);
    }

    // Delete the author using the captured ID
    await prisma.author.delete({
      where: {
        id: newAuthorId,
      },
    });
  }
});
