import React from "react";
import AddMediaForm from "./components/addMediaForm";
import getAllAuthors from "@/actions/authors";
import getAllFreeLocations from "@/actions/location";
 

export default async function MediaCreatePage() {
  const authorList = await getAllAuthors();
  const freeLocationList = await getAllFreeLocations();

  if (!authorList || !freeLocationList) {
    return <div>error...</div>;
  }

  return (
    <section className="m-5">
      <AddMediaForm authorList={authorList} freeLocations={freeLocationList} />
    </section>
  );
}