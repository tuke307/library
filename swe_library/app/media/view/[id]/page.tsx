import React from "react";
import ViewMedia from "../../components/viewMedia";
import { getMediaDetails } from "@/actions/media";

export default async function MediaDetailsPage({
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
      <ViewMedia mediaDetails={mediaDetails} />
    </section>
  );
}
