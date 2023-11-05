import React from "react";
import UserCards from "./components/userCards";
import { getServerSession } from "next-auth";
import EmployeeCards from "./components/employeeCards";
import { Suspense } from "react";
import Loading from "./loading";

export default async function HomePage() {
  const session = await getServerSession();

  if (!session) {
    return (
      <Suspense fallback={<Loading />}>
        <UserCards />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<Loading />}>
        <EmployeeCards />
      </Suspense>
    );
  }
}
