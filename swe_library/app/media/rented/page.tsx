"use client";
import { useState } from "react";
import React from "react";
import { RentedMediaTableProp } from "@/models/rentedmediaTable";
import MediaTable from "./components/rentedMediaTable";
import LoginForm from "./components/input";


export default async function rentedMediaPage() {

  const [rentedMediaData, setRentedMediaData] = useState<RentedMediaTableProp[]>([]);

  return (
    <section className="m-10 flex flex-col gap-5">
      <LoginForm onFetchSuccess={setRentedMediaData} />
      <MediaTable rentedMediaTableProp={rentedMediaData} />
    </section>
  );
}
