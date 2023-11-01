"use client";
import React from "react";
import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { RiArrowGoBackFill } from "react-icons/ri";

export default async function UserCards() {
  const router = useRouter();

  return (
    <section className="flex flex-row flex-wrap items-center justify-center gap-4 py-8 md:py-10">
      <Card
        shadow="sm"
        key="1"
        isPressable
        isHoverable
        className="h-[250px] w-[300px]"
        onPress={() => router.push("/media/search")}
      >
        <CardBody>
          <BiSearch className="h-full w-full" />
        </CardBody>
        <Divider />
        <CardFooter>
          <h4 className="text-large font-bold">Medium suchen</h4>
        </CardFooter>
      </Card>

      <Card
        shadow="sm"
        key="2"
        isPressable
        isHoverable
        className="h-[250px] w-[300px]"
        onPress={() => router.push("/rentedmedia")}
      >
        <CardBody>
          <ImBooks className="h-full w-full" />
        </CardBody>
        <Divider />
        <CardFooter>
          <h4 className="text-large font-bold">ausgeliehene Medien anzeigen</h4>
        </CardFooter>
      </Card>
    </section>
  );
}
