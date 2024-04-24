import React from "react";
import MediaTable from "../components/mediaTable";
import { getMediaTable } from "@/actions/media";
import { getServerSession } from "next-auth";

export default async function MediaSearchPage() {
  const mediaTableProps = await getMediaTable();
  const session = await getServerSession();

  return (
    <section className="m-3">
      <MediaTable mediaTableProps={mediaTableProps} showActions={!!session} />
    </section>
  );
}
