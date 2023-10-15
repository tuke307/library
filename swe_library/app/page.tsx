import React from "react";
import UserCards from "./components/userCards";
import { getServerSession } from "next-auth";
import EmployeeCards from "./components/employeeCards";

export default async function HomePage() {
  const session = await getServerSession();

  if (!session) {
    return <UserCards />;
  }else
  {
    return <EmployeeCards />;
  }
}