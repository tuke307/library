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

export default function AusleihenPage() {
  return (
    <section>
      <h1>Ausleihen</h1>
      <Link color="primary" href="/">
        zurück
      </Link>
    </section>
  );
}