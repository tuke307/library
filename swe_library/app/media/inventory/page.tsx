import { getMediaTable } from "@/actions/media";
import React from "react";
import MediaTable from "../components/mediaTable";

export default async function InventoryPage() {
  const mediaTableProps = await getMediaTable();

  return (
    <section className="m-3">
      <MediaTable mediaTableProps={mediaTableProps} showExistCheckbox={true} />
    </section>
  );
}
