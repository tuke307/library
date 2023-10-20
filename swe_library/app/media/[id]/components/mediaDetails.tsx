"use client";
import {
  Textarea,
  Input,
  Chip,
  Spacer,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";
import { MediaDetails } from "@/models/mediaDetails";
import { BsDisc, BsMap, BsNewspaper, BsBook } from "react-icons/bs";

export default function MediaDetailsPage({
  mediaDetails,
}: {
  mediaDetails: MediaDetails;
}) {
  let mediaTypeIcon;
  switch (mediaDetails.mediaType) {
    case "BOOK":
      mediaTypeIcon = <BsBook className="m-2" />;
      break;
    case "CD":
      mediaTypeIcon = <BsDisc className="m-2" />;
      break;
    case "MAP":
      mediaTypeIcon = <BsMap className="m-2" />;
      break;
    case "MAGAZINE":
      mediaTypeIcon = <BsNewspaper className="m-2" />;
      break;
    default:
      mediaTypeIcon = <BsDisc className="m-2" />;
  }

  return (
    <section className="grid grid-cols-2 grid-rows-3 gap-3">
      <Card shadow="md" className="row-span-3">
        <CardHeader className="flex gap-3">
          <h1 className="text-3xl">Medium</h1>
          <Chip startContent={mediaTypeIcon} variant="flat" color="default">
            {mediaDetails.mediaType}
          </Chip>
          <Chip
            variant="flat"
            color={mediaDetails.published ? "success" : "warning"}
          >
            {mediaDetails.published ? "Veröffentlicht" : "Nicht veröffentlicht"}
          </Chip>
        </CardHeader>
        <Divider />
        <CardBody>
          <Input
            isReadOnly
            type="text"
            label="Titel"
            variant="bordered"
            className="max-w"
            value={mediaDetails.title}
          />

          <Spacer y={2} />

          <Textarea
            isReadOnly
            type="text"
            label="Inhaltsausschnitt"
            variant="bordered"
            className="max-w"
            value={mediaDetails.content ?? ""}
          />

          <Spacer y={7} />

          <Input
            isReadOnly
            type="text"
            label="ISBN"
            variant="bordered"
            className="max-w"
            value={mediaDetails.ISBN ?? ""}
          />

          <Spacer y={3} />

          <div className="grid grid-cols-2 gap-2">
            <Input
              isReadOnly
              type="text"
              label="hinzugefügt am"
              variant="bordered"
              className="max-w"
              value={
                (
                  mediaDetails.createdAt.getDay() +
                  "." +
                  mediaDetails.createdAt.getMonth() +
                  "." +
                  mediaDetails.createdAt.getFullYear()
                ).toString() ?? ""
              }
            />
            <Input
              isReadOnly
              type="text"
              label="letztes Update"
              variant="bordered"
              className="max-w"
              value={
                (
                  mediaDetails.updatedAt.getDay() +
                  "." +
                  mediaDetails.updatedAt.getMonth() +
                  "." +
                  mediaDetails.updatedAt.getFullYear()
                ).toString() ?? ""
              }
            />
          </div>
        </CardBody>
      </Card>

      <Card shadow="md" className="row-span-2">
        <CardHeader className="flex gap-3">
          <h1 className="text-3xl">Author</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-2 gap-2">
            <Input
              isReadOnly
              type="text"
              label="Nachname"
              variant="bordered"
              className="max-w"
              value={mediaDetails.author.lastName}
            />
            <Input
              isReadOnly
              type="text"
              label="Vorname"
              variant="bordered"
              className="max-w"
              value={mediaDetails.author.firstName}
            />
          </div>

          <Spacer y={5} />

          <Input
            isReadOnly
            type="email"
            label="Email"
            variant="bordered"
            className="max-w"
            value={mediaDetails.author.email ?? ""}
          />

          <Spacer y={3} />

          <Input
            isReadOnly
            type="text"
            label="Geburtsdatum"
            variant="bordered"
            className="max-w"
            value={
              (
                mediaDetails.author.birthday?.getDay() +
                "." +
                mediaDetails.author.birthday?.getMonth() +
                "." +
                mediaDetails.author.birthday?.getFullYear()
              ).toString() ?? ""
            }
          />
        </CardBody>
      </Card>

      <Card shadow="md">
        <CardHeader className="flex gap-3">
          <h1 className="text-3xl">Lokation</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-3 gap-2">
            <Input
              isReadOnly
              type="text"
              label="Etage"
              variant="bordered"
              className="max-w"
              value={mediaDetails.location?.floor.toString() ?? ""}
            />
            <Input
              isReadOnly
              type="text"
              label="Regal"
              variant="bordered"
              className="max-w"
              value={mediaDetails.location?.shelf.toString() ?? ""}
            />
            <Input
              isReadOnly
              type="text"
              label="Regalabschnitt"
              variant="bordered"
              className="max-w"
              value={mediaDetails.location?.shelfSection.toString() ?? ""}
            />
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
