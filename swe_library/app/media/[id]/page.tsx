import React from "react";
import MediaDetails from "../components/mediaDetails";
import { getMediaDetails } from "@/actions/media";
import { getAllUsers } from "@/actions/user";
import getAllAuthors from "@/actions/authors";
import getAllFreeLocations from "@/actions/location";

export default async function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const mediaDetails = await getMediaDetails(params.id);
  const users = await getAllUsers();
  const authors = await getAllAuthors();
  const locations = await getAllFreeLocations();

  return (
    <section className="m-10">
      <MediaDetails mediaDetails={mediaDetails} authors={authors} locations={locations} users={users} />
    </section>
  );
}
