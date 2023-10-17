import { MediaType, Media, User, Employee, PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// 8 users
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"), "utf8"));

// 4 employees
const employees = JSON.parse(fs.readFileSync(path.join(__dirname, "employees.json"), "utf8"));

// 10 authors
const authors = JSON.parse(fs.readFileSync(path.join(__dirname, "authors.json"), "utf8"));

// 8 locations
const locations = JSON.parse(fs.readFileSync(path.join(__dirname, "locations.json"), "utf8"));

// 10 media
const media = JSON.parse(fs.readFileSync(path.join(__dirname, "medias.json"), "utf8"));

// 10 rented media
const rentedMedia = JSON.parse(fs.readFileSync(path.join(__dirname, "rentedMedias.json"), "utf8"));

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
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createUsers() {
  for (const user of users) {
    const newUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        email: user.email,
        street: user.street,
        houseNumber: user.houseNumber,
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
        id: employee.id, // normally autoincremented
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
        floor: location.floor,
        shelf: location.shelf,
        shelfSection: location.shelfSection,
      },
    });
    console.log(`Created location with id: ${newLocation.id}`);
  }
}

async function createMedia() {
  for (const medium of media) {
    const newMedium = await prisma.media.create({
      data: {
        id : medium.id, // normally autoincremented
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
    console.log(`Created meida with id: ${newMedium.id}`);
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
    console.log(`Created rented media with id: ${newRentedMedium.id}`);
  }
}
