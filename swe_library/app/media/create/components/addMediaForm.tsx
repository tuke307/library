"use client";
import React from "react";
import {
  Input,
  Textarea,
  Spacer,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Select,
  SelectItem,
  Button,
  Switch,
} from "@nextui-org/react";
import { experimental_useFormState as useFormState } from "react-dom";
import { createMedia } from "@/actions/mediaCreation";
import { SubmitButton } from "./submitButton";
import { mediaTypesWithIcons } from "@/models/mediaTypesWithIcons";
import { Author, Location, MediaType } from "@prisma/client";
import AuthorModal from "./authorModal";
import LocationModal from "./locationModal";
import { BsSearch } from "react-icons/bs";

const initialState = {
  message: null,
};

export default function AddMediaForm({
  authorList,
  freeLocations,
}: {
  authorList: Author[];
  freeLocations: Location[];
}) {
  const [formData, setFormData] = React.useState({
    type: MediaType.BOOK,
    title: "",
    content: "",
    ISBN: "",
    published: true.toString(),
    authorId: "",
    authorLastName: "",
    authorFirstName: "",
    locationId: "",
    locationFloor: "",
    locationShelf: "",
    locationShelfSection: "",
  });
  const [state, formAction] = useFormState(createMedia, initialState);
  const [showAuthorModal, setShowAuthorModal] = React.useState<boolean>(false);
  const [showLocationModal, setShowLocationModal] =
    React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const setAuthor = (selectedAuthor: Author) => {
    // set selectedAuthor in form
    formData.authorId = selectedAuthor.id.toString();
    formData.authorLastName = selectedAuthor.lastName;
    formData.authorFirstName = selectedAuthor.firstName;
  };

  const setLocation = (selectedLocation: Location) => {
    // set selectedAuthor in form
    formData.locationId = selectedLocation.id.toString();
    formData.locationFloor = selectedLocation.floor.toString();
    formData.locationShelf = selectedLocation.shelf.toString();
    formData.locationShelfSection = selectedLocation.shelfSection.toString();
  };

  return (
    <form action={formAction}>
      <Card shadow="md">
        <CardHeader className="flex gap-3">
          <h1 className="text-3xl">Medium</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <Select
            name="type"
            label="Medientyp"
            selectionMode="single"
            className="max-w"
            value={formData.type}
            onChange={handleChange}
          >
            {mediaTypesWithIcons.map((mediaType) => (
              <SelectItem key={mediaType.enum} startContent={mediaType.icon}>
                {mediaType.label}
              </SelectItem>
            ))}
          </Select>

          <Spacer y={7} />

          <Input
            name="title"
            type="text"
            label="Titel"
            variant="bordered"
            className="max-w"
            value={formData.title}
            onChange={handleChange}
          />

          <Spacer y={2} />

          <Textarea
            name="content"
            title="content"
            type="text"
            label="Inhaltsausschnitt"
            variant="bordered"
            className="max-w"
            value={formData.content}
            onChange={handleChange}
          />

          <Spacer y={7} />

          <Input
            name="ISBN"
            title="ISBN"
            type="text"
            label="ISBN"
            variant="bordered"
            className="max-w"
            value={formData.ISBN}
            onChange={handleChange}
          />

          <Spacer y={2} />

          <Switch
            defaultSelected
            name="published"
            color="default"
            value={formData.published}
            onChange={handleChange}
          >
            veröffentlicht
          </Switch>
        </CardBody>
      </Card>

      <div className="mt-5 flex flex-row flex-wrap gap-5">
        <Card className="grow" shadow="md">
          <CardHeader className="flex gap-3">
            <h1 className="text-3xl">Author</h1>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-row gap-2">
              <Input
                isReadOnly
                isDisabled
                name="authorId"
                type="text"
                label="Id"
                variant="bordered"
                className="sr-only"
                value={formData.authorId}
                onChange={handleChange}
              />

              <Input
                isReadOnly
                isDisabled
                name="authorLastName"
                type="text"
                label="Nachname"
                variant="bordered"
                className=""
                value={formData.authorLastName}
                onChange={handleChange}
              />
              <Input
                isReadOnly
                isDisabled
                name="authorFirstName"
                type="text"
                label="Vorname"
                variant="bordered"
                className=""
                value={formData.authorFirstName}
                onChange={handleChange}
              />

              <div>
                <Button
                  isIconOnly
                  size="lg"
                  onPress={() => setShowAuthorModal(true)}
                  color="primary"
                >
                  <BsSearch className="m-1" />
                </Button>

                <AuthorModal
                  authorList={authorList}
                  show={showAuthorModal}
                  close={() => setShowAuthorModal(false)}
                  setAuthor={setAuthor}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="grow" shadow="md">
          <CardHeader className="flex gap-3">
            <h1 className="text-3xl">Lokation</h1>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-row gap-2">
              <Input
                isReadOnly
                isDisabled
                name="locationId"
                type="number"
                label="Id"
                variant="bordered"
                className="sr-only"
                value={formData.locationId}
                onChange={handleChange}
              />
              <Input
                isReadOnly
                isDisabled
                name="locationFloor"
                type="number"
                label="Etage"
                variant="bordered"
                className="grow"
                value={formData.locationFloor}
                onChange={handleChange}
              />
              <Input
                isReadOnly
                isDisabled
                name="locationShelf"
                type="number"
                label="Regal"
                variant="bordered"
                className="grow"
                value={formData.locationShelf}
                onChange={handleChange}
              />
              <Input
                isReadOnly
                isDisabled
                name="locationShelfSection"
                type="number"
                label="Regalabschnitt"
                variant="bordered"
                className="grow"
                value={formData.locationShelfSection}
                onChange={handleChange}
              />

              <div>
                <Button
                  isIconOnly
                  color="primary"
                  size="lg"
                  onPress={() => setShowLocationModal(true)}
                >
                  <BsSearch className="m-1" />
                </Button>

                <LocationModal
                  freeLocations={freeLocations}
                  show={showLocationModal}
                  close={() => setShowLocationModal(false)}
                  setLocation={setLocation}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <SubmitButton />

      {/* sr-only: only for the browser, not seeable!  */}
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  );
}
