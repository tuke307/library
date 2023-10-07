import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import React from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { BiSearch } from 'react-icons/bi';
import { ImBooks } from 'react-icons/im';

export default function IndexPage() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <main>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
            <Card
              shadow="sm"
              key="1"
              isPressable
              onPress={() => router.push("/search")}
            >
              <CardBody className="overflow-visible p-0">
                <Button radius="lg" className="h-[140px] w-full object-cover" onPress={() => router.push("/search")}>
                  <BiSearch />
                </Button>
              </CardBody>
              <CardFooter className="justify-between text-small">
                <b>Medium suchen</b>
              </CardFooter>
            </Card>

            <Card
              shadow="sm"
              key="1"
              isPressable
              onPress={() => router.push("/ausleihen")}
            >
              <CardBody className="overflow-visible p-0">
                <Button radius="lg" className="h-[140px] w-full object-cover" onPress={() => router.push("/ausleihen")}>
                  <ImBooks />
                </Button>
              </CardBody>
              <CardFooter className="justify-between text-small">
                <b>ausgeliehene Medien anzeigen</b>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
}
