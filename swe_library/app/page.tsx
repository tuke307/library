"use client";
import React from "react";
import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function HomePage() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
        <Card
          shadow="sm"
          key="1"
          isPressable
          isHoverable
          className="h-[250px] w-[300px]"
          onPress={() => router.push("/mediasearch")}
        >
          <CardBody className="">
            <BiSearch className="h-full w-full" />
          </CardBody>
          <Divider />
          <CardFooter className="">
            <h4 className="text-large font-bold">Medium suchen</h4>
          </CardFooter>
        </Card>

        <Card
          shadow="sm"
          key="2"
          isPressable
          isHoverable
          className="h-[250px] w-[300px]"
          onPress={() => router.push("/media-create")}
        >
          <CardBody className="">
            <AiOutlinePlus className="h-full w-full" />
          </CardBody>
          <Divider />
          <CardFooter className="">
            <h4 className="text-large font-bold">Medium erstellen</h4>
          </CardFooter>
        </Card>

        <Card
          shadow="sm"
          key="3"
          isPressable
          isHoverable
          className="h-[250px] w-[300px]"
          onPress={() => router.push("/borrowed-media")}
        >
          <CardBody className="">
            <ImBooks className="h-full w-full" />
          </CardBody>
          <Divider />
          <CardFooter className="">
            <h4 className="text-large font-bold">
              ausgeliehene Medien anzeigen
            </h4>
          </CardFooter>
        </Card>

        <Card
          shadow="sm"
          key="4"
          isPressable
          isHoverable
          className="h-[250px] w-[300px]"
          onPress={() => router.push("/return-media")}
        >
          <CardBody className="">
            <RiArrowGoBackFill className="h-full w-full" />
          </CardBody>
          <Divider />
          <CardFooter className="">
            <h4 className="text-large font-bold">Medium zurückgeben</h4>
          </CardFooter>
        </Card>

        <Card
          shadow="sm"
          key="5"
          isPressable
          isHoverable
          className="h-[250px] w-[300px]"
          onPress={() => router.push("/users")}
        >
          <CardBody className="">
            <FiUsers className="h-full w-full" />
          </CardBody>
          <Divider />
          <CardFooter className="">
            <h4 className="text-large font-bold">Kundenverwaltung</h4>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
