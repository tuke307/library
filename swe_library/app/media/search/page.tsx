"use server";
import React from "react";
import MediaTable from "./components/mediaTable";
import { getMediaTable } from "@/actions/media";

export default async function MediaSearchPage() {
  const mediaTableProps = await getMediaTable();

  return (
    <section className="m-10">
      <MediaTable mediaTableProps={mediaTableProps} />
    </section>
  );
}
