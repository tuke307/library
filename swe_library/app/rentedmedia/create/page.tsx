import { getAllUsers } from "@/actions/user";
import React from "react";
import CreateRentedMedia from "../components/createRentedMedia";
import { getAllFreeMedias } from "@/actions/media";

export default async function CreateRentedMediaPage() {
  const users = await getAllUsers();
  const medias = await getAllFreeMedias();

  return (
    <section>
      <CreateRentedMedia users={users} medias={medias} />
    </section>
  );
}
