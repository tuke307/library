import React from "react";
import getAllAuthors from "@/actions/authors";
import getAllFreeLocations from "@/actions/location";
import CreateMedia from "../components/createMedia";

export default async function MediaCreatePage() {
  const authorList = await getAllAuthors();
  const freeLocationList = await getAllFreeLocations();

  return (
    <section className="m-3">
      <CreateMedia authors={authorList} locations={freeLocationList} />
    </section>
  );
}
