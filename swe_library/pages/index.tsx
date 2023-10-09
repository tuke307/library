import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { ImBooks } from "react-icons/im";

export default function IndexPage() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
          <Card
            shadow="sm"
            key="1"
            isPressable
            isHoverable
            className="h-[250px] w-[300px]"
            onPress={() => router.push("/search")}
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
            onPress={() => router.push("/ausleihen")}
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
        </div>
      </section>
    </DefaultLayout>
  );
}
