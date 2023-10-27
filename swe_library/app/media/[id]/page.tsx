import React from "react";
import MediaDetailsPage from "./components/mediaDetails";
import { getMediaDetails } from "@/actions/media";

export default async function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const mediaDetails = await getMediaDetails(params.id);

  if (!mediaDetails) {
    return <div>Media not found</div>;
  }

  return (
    <section className="m-10">
      <MediaDetailsPage mediaDetails={mediaDetails} />
    </section>
  );
}
