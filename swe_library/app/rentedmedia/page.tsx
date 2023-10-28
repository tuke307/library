"use client";
import { useState } from "react";
import React from "react";
import { RentedMediaTableProp } from "@/models/rentedMediaTable";
import InputForm from "./components/inputForm";
import RentedMediaTable from "./components/rentedMediaTable";


export default async function RentedMediaPage() {
  const [rentedMediaData, setRentedMediaData] = useState<RentedMediaTableProp[]>([]);

  return (
    <section className="m-10 flex flex-col gap-5">
      <InputForm onFetchSuccess={setRentedMediaData} />
      <RentedMediaTable rentedMediaTableProp={rentedMediaData} />
    </section>
  );
}
