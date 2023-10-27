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
  Button,
} from "@nextui-org/react";
import React from "react";
import { MediaDetails } from "@/models/mediaDetails";
import { mediaTypesWithIcons } from "@/models/mediaTypesWithIcons";
import { useSession } from "next-auth/react";
import { AiFillEdit, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { updateMedia } from "@/actions/media";
import { revalidatePath } from "next/cache";

export default function MediaDetailsPage({
  mediaDetails,
}: {
  mediaDetails: MediaDetails;
}) {
  const { data: session } = useSession();
  const [editable, setEditable] = React.useState(false);
  const [formData, setFormData] = React.useState({
    ...mediaDetails,
  });

  const mediaTypeIcon = mediaTypesWithIcons.find(
    (mediaType) => mediaType.enum === mediaDetails.mediaType,
  )?.icon;

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  // create component, if session, then show edit button
  function EditButton() {
    const handleSave = () => {
      updateMedia(
        formData.id,
        formData.title,
        formData.content ? formData.content : "",
      );
      setEditable(false);
    };

    const handleDiscard = () => {
      setEditable(false);
    };

    return session ? (
      <div className="flex gap-3">
        {editable ? (
          <>
            <Button
              color="success"
              variant="flat"
              startContent={<AiOutlineSave />}
              onClick={handleSave}
            >
              Speichern
            </Button>
            <Button
              color="danger"
              variant="flat"
              startContent={<AiOutlineClose />}
              onClick={handleDiscard}
            >
              Abbrechen
            </Button>
          </>
        ) : (
          <Button
            color="primary"
            variant="flat"
            startContent={<AiFillEdit />}
            onClick={() => setEditable(true)}
          >
            Bearbeiten
          </Button>
        )}
      </div>
    ) : null;
  }

  return (
    <section className="grid grid-cols-2 grid-rows-3 gap-3">
      <Card shadow="md" className="row-span-3">
        <CardHeader className="flex justify-between gap-3">
          <div className="flex gap-3">
            <h1 className="text-3xl">Medium</h1>
            <Chip startContent={mediaTypeIcon} variant="flat" color="default">
              {mediaDetails.mediaType}
            </Chip>
            <Chip
              variant="flat"
              color={mediaDetails.published ? "success" : "warning"}
            >
              {mediaDetails.published
                ? "Veröffentlicht"
                : "Nicht veröffentlicht"}
            </Chip>
          </div>

          <EditButton />
        </CardHeader>
        <Divider />
        <CardBody>
          <Input
            isReadOnly={!editable}
            type="text"
            label="Titel"
            name="title"
            variant="bordered"
            className="max-w"
            onChange={handleChange}
            value={formData.title}
          />

          <Spacer y={2} />

          <Textarea
            isReadOnly={!editable}
            type="text"
            label="Inhaltsausschnitt"
            name="content"
            variant="bordered"
            className="max-w"
            onChange={handleChange}
            value={formData.content ?? ""}
          />

          <Spacer y={7} />

          <Input
            isReadOnly
            type="text"
            label="ISBN"
            variant="bordered"
            className="max-w"
            value={formData.ISBN ?? ""}
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
                  formData.createdAt.getDay() +
                  "." +
                  formData.createdAt.getMonth() +
                  "." +
                  formData.createdAt.getFullYear()
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
                  formData.updatedAt.getDay() +
                  "." +
                  formData.updatedAt.getMonth() +
                  "." +
                  formData.updatedAt.getFullYear()
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
              value={formData.author.lastName}
            />
            <Input
              isReadOnly
              type="text"
              label="Vorname"
              variant="bordered"
              className="max-w"
              value={formData.author.firstName}
            />
          </div>

          <Spacer y={5} />

          <Input
            isReadOnly
            type="email"
            label="Email"
            variant="bordered"
            className="max-w"
            value={formData.author.email ?? ""}
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
                formData.author.birthday?.getDay() +
                "." +
                formData.author.birthday?.getMonth() +
                "." +
                formData.author.birthday?.getFullYear()
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
              value={formData.location?.floor.toString() ?? ""}
            />
            <Input
              isReadOnly
              type="text"
              label="Regal"
              variant="bordered"
              className="max-w"
              value={formData.location?.shelf.toString() ?? ""}
            />
            <Input
              isReadOnly
              type="text"
              label="Regalabschnitt"
              variant="bordered"
              className="max-w"
              value={formData.location?.shelfSection.toString() ?? ""}
            />
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
