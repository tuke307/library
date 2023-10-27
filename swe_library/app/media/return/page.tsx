"use client";
import React from "react";
import InputForm from "./components/inputForm";
import ReturnMediaTable from "./components/returnMediaTable";
import { RentedMediaTableProp } from "@/models/rentedMediaTabl";


export default function ReturnMediaPage() {
  const [rentedMediaData, setRentedMediaData] = React.useState<RentedMediaTableProp[]>([]);

  return (
    <section className="m-10 flex flex-col gap-5">
      <InputForm onFetchSuccess={setRentedMediaData} />
      <ReturnMediaTable returnMediaTableProps={rentedMediaData} />
    </section>
  );
}