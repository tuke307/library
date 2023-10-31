import React from "react";
import getAllAuthors from "@/actions/authors";
import getAllFreeLocations from "@/actions/location";
import MediaDetails from "../components/mediaDetails";
import { getAllUsers } from "@/actions/user";
 

export default async function MediaCreatePage() {
  const authorList = await getAllAuthors();
  const freeLocationList = await getAllFreeLocations();
  const users = await getAllUsers();

  return (
    <section className="m-5">
      <MediaDetails authors={authorList} locations={freeLocationList} users={users} mediaDetails={null} />
    </section>
  );
}