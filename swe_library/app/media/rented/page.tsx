"use client";
import { useState } from "react";
import React from "react";
import RentedMediaTable from "./components/rentedMediaTable";
import InputForm from "./components/inputForm";
import { RentedMediaTableProp } from "@/models/rentedMediaTabl";


export default async function rentedMediaPage() {
  const [rentedMediaData, setRentedMediaData] = useState<RentedMediaTableProp[]>([]);

  return (
    <section className="m-10 flex flex-col gap-5">
      <InputForm onFetchSuccess={setRentedMediaData} />
      <RentedMediaTable rentedMediaTableProp={rentedMediaData} />
    </section>
  );
}
