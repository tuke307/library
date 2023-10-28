"use client";
import React from "react";
import { RentedMediaTableProp } from "@/models/rentedMediaTable";
import InputForm from "./components/inputForm";
import ReturnMediaTable from "./components/returnMediaTable";


export default function ReturnRentedMediaPage() {
  const [rentedMediaData, setRentedMediaData] = React.useState<RentedMediaTableProp[]>([]);

  return (
    <section className="m-10 flex flex-col gap-5">
      <InputForm onFetchSuccess={setRentedMediaData} />
      <ReturnMediaTable returnMediaTableProps={rentedMediaData} />
    </section>
  );
}