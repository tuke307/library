"use client";
import React from "react";
import MediaTable from "../components/mediaTable";
import { getMediaTable } from "@/actions/media";
import ButtonComponent from "../inventory/components/ButtonComponent";
import { MediaTableProp } from "@/models/mediaTable";

export default function InventoryPage() {
  const [mediaTableProps, setMediaTableProps] = React.useState<MediaTableProp[] | null>(null);
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const props = await getMediaTable();
      setMediaTableProps(props);
    };

    fetchData();
  }, [update]);

  const handleButtonClick = () => {
    setUpdate(prevState => !prevState);
  };

  return (
    <section className="flex flex-col gap-3 m-3">
      {mediaTableProps && <MediaTable mediaTableProps={mediaTableProps} showExistCheckbox={true} />}
      <ButtonComponent onButtonClick={handleButtonClick} />
    </section>
  );
}
