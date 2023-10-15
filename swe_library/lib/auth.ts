import { PrismaClient } from "@prisma/client";
import { User } from "next-auth";

// Create a new Prisma client instance for handling our database requests
const prisma = new PrismaClient();


type LoginFn = (id: string, password: string) => Promise<User>;

export const login: LoginFn = async (id, password) => {
  const employee = await prisma.employee.findFirst({
    where: {
      id: parseInt(id),
      password: password
    },
  });
  if (employee && password == employee.password) {
    employee.password = "";
    
    // convert to User type
    const user: User = employee as unknown as User;
    
    return user;
  } else throw new Error("User Not Found!");
};