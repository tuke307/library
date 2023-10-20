"use server";
import React from "react";
import MediaTable from "./components/mediaTable";
import getMediaTable from "@/actions/mediaTable";

export default async function MediaSearchPage() {
  const mediaTableProps = await getMediaTable();

  if (!mediaTableProps) {
    return <div>Medias not found</div>;
  }

  return (
    <section className="m-10">
      <MediaTable mediaTableProps={mediaTableProps} />
    </section>
  );
}
