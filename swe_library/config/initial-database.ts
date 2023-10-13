import { MediaType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 8 users
const users = [
  {
    firstName: "John",
    lastName: "Doe",
    birthday: new Date(1995, 2, 15),
    email: "john.doe@example.com",
    street: "456 Elm St",
    plz: 67890,
    city: "Othertown",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    birthday: new Date(1998, 5, 20),
    email: "jane.doe@example.com",
    street: "789 Oak St",
    plz: 54321,
    city: "Somewhere",
  },
  {
    firstName: "Bob",
    lastName: "Smith",
    birthday: new Date(1985, 10, 12),
    email: "bob.smith@example.com",
    street: "321 Maple St",
    plz: 9876,
    city: "Nowhere",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    birthday: new Date(1976, 1, 1),
    email: "alice.johnson@example.com",
    street: "654 Pine St",
    plz: 13579,
    city: "Everywhere",
  },
  {
    firstName: "Sarah",
    lastName: "Lee",
    birthday: new Date(1990, 7, 7),
    email: "sarah.lee@example.com",
    street: "123 Main St",
    plz: 45678,
    city: "Anywhere",
  },
  {
    firstName: "David",
    lastName: "Kim",
    birthday: new Date(1988, 11, 25),
    email: "david.kim@example.com",
    street: "567 1st Ave",
    plz: 98765,
    city: "Nowhere",
  },
  {
    firstName: "Emily",
    lastName: "Chen",
    birthday: new Date(1993, 4, 30),
    email: "emily.chen@example.com",
    street: "890 2nd St",
    plz: 12345,
    city: "Somewhere",
  },
  {
    firstName: "Michael",
    lastName: "Wang",
    birthday: new Date(1980, 8, 8),
    email: "michael.wang@example.com",
    street: "246 3rd Ave",
    plz: 13579,
    city: "Anywhere",
  },
];

// 4 employees
const employees = [
  {
    firstName: "John",
    lastName: "Doe",
    password: "password1",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    password: "password2",
  },
  {
    firstName: "Bob",
    lastName: "Smith",
    password: "password3",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    password: "password4",
  },
];

// 10 authors
const authors = [
  {
    firstName: "John",
    lastName: "Doe",
    birthday: new Date(1995, 2, 15),
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    birthday: new Date(1990, 5, 10),
  },
  {
    firstName: "Bob",
    lastName: "Smith",
    birthday: new Date(1985, 8, 25),
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    birthday: new Date(1980, 11, 20),
  },
  {
    firstName: "Michael",
    lastName: "Wang",
    birthday: new Date(1975, 1, 5),
  },
  {
    firstName: "Emily",
    lastName: "Chen",
    birthday: new Date(1992, 4, 30),
  },
  {
    firstName: "David",
    lastName: "Kim",
    birthday: new Date(1988, 7, 15),
  },
  {
    firstName: "Sarah",
    lastName: "Lee",
    birthday: new Date(1993, 10, 10),
  },
  {
    firstName: "Oliver",
    lastName: "Garcia",
    birthday: new Date(1987, 3, 1),
  },
  {
    firstName: "Sophia",
    lastName: "Martinez",
    birthday: new Date(1998, 6, 20),
  },
];

// 8 locations
const locations = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
];

// 10 media
const media = [
  {
    title: "The Great Gatsby",
    mediaType: MediaType.BOOK,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "A novel by F. Scott Fitzgerald",
    published: true,
    ISBN: "978-3-16-148410-0",
    authorId: 1,
    locationId: 1,
  },
  {
    title: "The Catcher in the Rye",
    mediaType: MediaType.BOOK,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "A novel by J.D. Salinger",
    published: true,
    ISBN: "978-3-16-148410-1",
    authorId: 2,
    locationId: 2,
  },
  {
    title: "To Kill a Mockingbird",
    mediaType: MediaType.BOOK,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "A novel by Harper Lee",
    published: true,
    ISBN: "978-3-16-148410-2",
    authorId: 3,
    locationId: 3,
  },
  {
    title: "1984",
    mediaType: MediaType.BOOK,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "A novel by George Orwell",
    published: true,
    ISBN: "978-3-16-148410-3",
    authorId: 4,
    locationId: 4,
  },
  {
    title: "The Lord of the Rings",
    mediaType: MediaType.BOOK,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "A novel by J.R.R. Tolkien",
    published: true,
    ISBN: "978-3-16-148410-4",
    authorId: 5,
    locationId: 5,
  },
  {
    title: "The Hobbit",
    mediaType: MediaType.BOOK,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "A novel by J.R.R. Tolkien",
    published: true,
    ISBN: "978-3-16-148410-5",
    authorId: 5,
    locationId: 5,
  },
  {
    title: "The Da Vinci Code",
    mediaType: MediaType.BOOK,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "A novel by Dan Brown",
    published: true,
    ISBN: "978-3-16-148410-6",
    authorId: 6,
    locationId: 6,
  },
  {
    title: "The Girl with the Dragon Tattoo",
    mediaType: MediaType.BOOK,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "A novel by Stieg Larsson",
    published: true,
    ISBN: "978-3-16-148410-7",
    authorId: 7,
    locationId: 7,
  },
  {
    title: "The Hunger Games",
    mediaType: MediaType.BOOK,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "A novel by Suzanne Collins",
    published: true,
    ISBN: "978-3-16-148410-8",
    authorId: 8,
    locationId: 8,
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    mediaType: MediaType.BOOK,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "A novel by J.K. Rowling",
    published: true,
    ISBN: "978-3-16-148410-9",
    authorId: 9,
    locationId: 8,
  },
];

// 10 rented media
const rentedMedia = [
  {
    userId: 1,
    mediaId: 1,
    rentedAt: new Date(),
    returnedAt: new Date(),
  },
  {
    userId: 2,
    mediaId: 2,
    rentedAt: new Date(),
    returnedAt: new Date(),
  },
  {
    userId: 3,
    mediaId: 3,
    rentedAt: new Date(),
    returnedAt: new Date(),
  },
  {
    userId: 4,
    mediaId: 4,
    rentedAt: new Date(),
    returnedAt: new Date(),
  },
  {
    userId: 5,
    mediaId: 5,
    rentedAt: new Date(),
    returnedAt: new Date(),
  },
  {
    userId: 6,
    mediaId: 6,
    rentedAt: new Date(),
    returnedAt: new Date(),
  },
  {
    userId: 7,
    mediaId: 7,
    rentedAt: new Date(),
    returnedAt: new Date(),
  },
  {
    userId: 8,
    mediaId: 8,
    rentedAt: new Date(),
    returnedAt: new Date(),
  },
  {
    userId: 8,
    mediaId: 9,
    rentedAt: new Date(),
    returnedAt: new Date(),
  },
  {
    userId: 8,
    mediaId: 8,
    rentedAt: new Date(),
    returnedAt: new Date(),
  },
];


async function main() {
  await createUsers();
  await createEmployees();
  await createAuthors();
  await createLocations();
  await createMedia();
  await createRentedMedia();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


async function createUsers() {
  for (const user of users) {
    const newUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        email: user.email,
        street: user.street,
        plz: user.plz,
        city: user.city,
      },
    });
    console.log(`Created user with id: ${newUser.id}`);
  }
}

async function createEmployees() {
  for (const employee of employees) {
    const newEmployee = await prisma.employee.create({
      data: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        password: employee.password,
      },
    });
    console.log(`Created employee with id: ${newEmployee.id}`);
  }
}

async function createAuthors() {
  for (const author of authors) {
    const newAuthor = await prisma.author.create({
      data: {
        firstName: author.firstName,
        lastName: author.lastName,
        birthday: author.birthday,
      },
    });
    console.log(`Created author with id: ${newAuthor.id}`);
  }
}

async function createLocations() {
  for (const location of locations) {
    const newLocation = await prisma.location.create({
      data: {
        id: location.id,
      },
    });
    console.log(`Created location with id: ${newLocation.id}`);
  }
}

async function createMedia() {
  for (const medium of media) {
    const newMedium = await prisma.media.create({
      data: {
        title: medium.title,
        mediaType: medium.mediaType,
        createdAt: medium.createdAt,
        updatedAt: medium.updatedAt,
        content: medium.content,
        published: medium.published,
        ISBN: medium.ISBN,
        authorId: medium.authorId,
        locationId: medium.locationId,
      },
    });
    console.log(`Created medium with id: ${newMedium.id}`);
  }
}

async function createRentedMedia() {
  for (const rentedMedium of rentedMedia) {
    const newRentedMedium = await prisma.rentedMedia.create({
      data: {
        userId: rentedMedium.userId,
        mediaId: rentedMedium.mediaId,
        rentedAt: rentedMedium.rentedAt,
        returnedAt: rentedMedium.returnedAt,
      },
    });
    console.log(`Created rented medium with id: ${newRentedMedium.id}`);
  }
}
