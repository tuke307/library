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
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import React from "react";
import { toast } from "react-toastify";
import { MediaDetailProp } from "@/models/mediaDetails";
import { mediaTypesWithIcons } from "@/models/mediaTypesWithIcons";
import { useSession } from "next-auth/react";
import {
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai";
import { createMedia, deleteMedia, updateMedia } from "@/actions/media";
import { useRouter } from "next/navigation";
import { Author, Location, Media, MediaType, User } from "@prisma/client";
import AuthorModal from "./authorModal";
import { SubmitButton } from "@/app/components/submitButton";
import LocationModal from "./locationModal";
import UserModal from "./userModal";
import { createRentedMedia } from "@/actions/rentedMedia";

const initialMedia: MediaDetailProp = {
  mediaId: undefined,
  mediaTitle: undefined,
  mediaMediaType: MediaType.BOOK,
  mediaContent: undefined,
  mediaPublished: false,
  mediaISBN: undefined,
  mediaCreatedAt: undefined,
  mediaUpdatedAt: undefined,

  authorId: undefined,
  authorLastName: undefined,
  authorFirstName: undefined,
  authorEmail: undefined,
  authorBirthday: undefined,

  locationId: undefined,
  locationFloor: undefined,
  locationShelf: undefined,
  locationShelfSection: undefined,

  rentedMediaId: undefined,
  rentedMediaMediaId: undefined,
  rentedMediaUserId: undefined,
  rentedMediaUserLastName: undefined,
  rentedMediaUserFirstName: undefined,
  rentedMediaRentedDate: undefined,
  rentedMediaReturnDate: undefined,
};

export default function MediaDetails({
  mediaDetails,
  authors,
  locations,
  users,
}: {
  mediaDetails: MediaDetailProp | null;
  authors: Author[] | null;
  locations: Location[] | null;
  users: User[] | null;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const [isEditMode, setEditable] = React.useState(false);
  const [isDetailsMode, setDetailsMode] = React.useState(false);
  const [isCreationMode, setCreationMode] = React.useState(false);
  const [isEmployee, setEmployee] = React.useState(false);
  const [isRented, setRented] = React.useState(false);

  const [formData, setFormData] = React.useState<MediaDetailProp>({
    ...(mediaDetails ?? initialMedia),
  });
  const [showAuthorModal, setShowAuthorModal] = React.useState<boolean>(false);
  const [showLocationModal, setShowLocationModal] =
    React.useState<boolean>(false);
  const [showUserModal, setShowUserModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    mediaDetails ? setDetailsMode(true) : setDetailsMode(false);
    mediaDetails ? setCreationMode(false) : setCreationMode(true);
    session ? setEmployee(true) : setEmployee(false);
    mediaDetails?.rentedMediaId ? setRented(true) : setRented(false);

    if (isCreationMode) {
      setEditable(true);
    }
  }, [mediaDetails, session]);

  const mediaTypeIcon = React.useMemo(() => {
    return mediaDetails
      ? mediaTypesWithIcons.find(
          (mediaType) => mediaType.enum === mediaDetails.mediaMediaType,
        )?.icon
      : undefined;
  }, [mediaDetails]);

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  async function handleSubmit(formData: FormData) {
    const media = await createMedia(formData);

    if (!media) {
      toast.error("Erstellung des Mediums fehlgeschlagen!");
      return;
    } else {
      toast.success("Medium erfolgreich erstellt!");
    }
  }

  function EditButton() {
    const handleSave = async () => {
      if (!formData.mediaId || !formData.mediaTitle || !formData.authorId || !formData.locationId) {
        toast.error("Speichern fehlgeschlagen, fehlende Informationen!");
        return;
      }

      const updatedMedia = {
        id: formData.mediaId,
        mediaType: formData.mediaMediaType,
        title: formData.mediaTitle,
        content: formData.mediaContent,
        published: formData.mediaPublished,
        ISBN: formData.mediaISBN,
        authorId: formData.authorId ?? -1,
        locationId: formData.locationId ?? -1,
      };

      const media = await updateMedia(
        formData.mediaId,
        formData.mediaMediaType,
        formData.mediaTitle,
        formData.mediaContent,
        formData.mediaPublished,
        formData.mediaISBN,
        formData.authorId,
        formData.locationId,
      );

      if (!media) {
        toast.error("Speichern fehlgeschlagen!");
        return;
      } else {    
        toast.success("Speichern erfolgreich!");
        setEditable(false);
        router.refresh();
      }
    };

    const handleDelete = async () => {
      if (!formData.mediaId) {
        toast.error("Löschen fehlgeschlagen!");
        return;
      }

      const media = await deleteMedia(formData.mediaId);

      if (!media) {
        toast.error("Löschen fehlgeschlagen!");
        return;
      } else {
        toast.success("Löschen erfolgreich!");
        router.back();
      }
    };

    const handleDiscard = () => {
      setEditable(false);
      router.refresh();
    };

    return (
      isEmployee && (
        <div className="flex justify-start gap-3">
          {isCreationMode && <SubmitButton text="erstellen" />}

          {isDetailsMode && isEditMode && (
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
                color="warning"
                variant="flat"
                startContent={<AiOutlineClose />}
                onClick={handleDiscard}
              >
                Abbrechen
              </Button>
            </>
          )}

          {isDetailsMode && !isEditMode && (
            <>
              <Button
                color="primary"
                variant="flat"
                startContent={<AiOutlineEdit />}
                onClick={() => setEditable(true)}
              >
                Bearbeiten
              </Button>

              <Button
                color="danger"
                variant="flat"
                startContent={<AiOutlineDelete />}
                onClick={handleDelete}
              >
                Löschen
              </Button>
            </>
          )}
        </div>
      )
    );
  }

  const setAuthor = (selectedAuthor: Author) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        authorId: selectedAuthor.id,
        authorLastName: selectedAuthor.lastName,
        authorFirstName: selectedAuthor.firstName,
        authorEmail: selectedAuthor.email ?? "",
        authorBirthday: selectedAuthor.birthday ?? new Date(),
      };
    });
  };

  const setLocation = (selectedLocation: Location) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        locationId: selectedLocation.id,
        locationFloor: selectedLocation.floor,
        locationShelf: selectedLocation.shelf,
        locationShelfSection: selectedLocation.shelfSection,
      };
    });
  };

  const setUser = async (selectedUser: User) => {
    if (!formData.mediaId) {
      console.log("mediaId is undefined");
      toast.error("Medium löschen fehlgeschlagen!");
      return;
    }

    const rentedMedia = await createRentedMedia(selectedUser.id, formData.mediaId);

    if (!rentedMedia) {
      toast.error("Ausleihe fehlgeschlagen!");
    } else {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          rentedMediaId: rentedMedia.id,
          rentedMediaUserId: selectedUser.id,
          rentedMediaUserLastName: selectedUser.lastName,
          rentedMediaUserFirstName: selectedUser.firstName,
        };
      });

      setRented(true);

      toast.success("Ausleihe erfolgreich!");
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        <Card shadow="md" className="flex min-w-[50%] flex-grow">
          <CardHeader className="flex gap-3">
            <h1 className="text-3xl">Medium</h1>

            {isDetailsMode && !isEditMode && (
              <div className="flex flex-grow items-center gap-2">
                <Chip
                  startContent={mediaTypeIcon}
                  variant="flat"
                  color="default"
                >
                  {mediaDetails?.mediaMediaType}
                </Chip>
                <Chip
                  variant="flat"
                  color={mediaDetails?.mediaPublished ? "success" : "warning"}
                >
                  {mediaDetails?.mediaPublished
                    ? "Veröffentlicht"
                    : "Nicht veröffentlicht"}
                </Chip>
              </div>
            )}
          </CardHeader>

          <Divider />

          <CardBody className="flex-col">
            <div className="sr-only" hidden>
              <Input
                isReadOnly
                type="text"
                label="Id"
                name="mediaId"
                variant="bordered"
                onChange={handleChange}
                value={formData.mediaId}
              />
            </div>

            {isEditMode && (
              <div>
                <Select
                  label="Medientyp"
                  name="mediaMediaType"
                  selectionMode="single"
                  className="max-w"
                  items={mediaTypesWithIcons}
                  value={formData.mediaMediaType.toString()}
                  defaultSelectedKeys={["BOOK"]}
                  onChange={handleChange}
                >
                  {(mediaType) => (
                    <SelectItem
                      key={mediaType.enum}
                      startContent={mediaType.icon}
                    >
                      {mediaType.label}
                    </SelectItem>
                  )}
                </Select>

                <Spacer y={7} />
              </div>
            )}

            <Input
              isReadOnly={!isEditMode}
              type="text"
              label="Titel"
              name="mediaTitle"
              variant="bordered"
              className="max-w"
              onChange={handleChange}
              value={formData.mediaTitle}
            />

            <Spacer y={2} />

            <Textarea
              isReadOnly={!isEditMode}
              type="text"
              label="Inhaltsausschnitt"
              name="mediaContent"
              variant="bordered"
              className="max-w"
              onChange={handleChange}
              value={formData.mediaContent}
            />

            <Spacer y={7} />

            <Input
              isReadOnly={!isEditMode}
              type="text"
              label="ISBN"
              name="mediaISBN"
              variant="bordered"
              className="max-w"
              value={formData.mediaISBN}
              onChange={handleChange}
            />

            {isEditMode && (
              <div>
                <Spacer y={2} />

                <Switch
                  defaultSelected
                  name="published"
                  color="default"
                  value={formData.mediaPublished.toString()}
                  onChange={handleChange}
                >
                  veröffentlicht
                </Switch>
              </div>
            )}

            {isDetailsMode && !isEditMode && (
              <>
                <Spacer y={2} />

                <div className="flex gap-2">
                  <Input
                    isReadOnly
                    isDisabled
                    type="text"
                    label="hinzugefügt am"
                    name="mediaCreatedAt"
                    variant="bordered"
                    className="max-w"
                    value={formData.mediaCreatedAt?.toLocaleDateString()}
                  />
                  <Input
                    isReadOnly
                    isDisabled
                    type="text"
                    label="letztes Update"
                    name="mediaUpdatedAt"
                    variant="bordered"
                    className="max-w"
                    value={formData.mediaUpdatedAt?.toLocaleDateString()}
                  />
                </div>
              </>
            )}
          </CardBody>
        </Card>

        <div className="flex flex-col flex-wrap gap-3">
          <Card shadow="md">
            <CardHeader className="flex justify-between gap-3">
              <h1 className="text-3xl">Author</h1>

              {(isCreationMode || isEditMode) && (
                <div className="flex flex-row gap-2">
                  <Button
                    isIconOnly
                    size="lg"
                    onPress={() => setShowAuthorModal(true)}
                    color="primary"
                  >
                    <AiOutlineSearch className="m-1" />
                  </Button>

                  <AuthorModal
                    authorList={authors}
                    show={showAuthorModal}
                    close={() => setShowAuthorModal(false)}
                    setAuthor={setAuthor}
                  />
                </div>
              )}
            </CardHeader>

            <Divider />

            <CardBody>
              <div className="flex gap-2">
                <div className="sr-only" hidden>
                  <Input
                    isReadOnly
                    type="number"
                    label="Author-ID"
                    name="authorId"
                    variant="bordered"
                    value={formData.authorId?.toString()}
                    onChange={handleChange}
                  />
                </div>
                <Input
                  isReadOnly
                  isDisabled
                  type="text"
                  label="Nachname"
                  name="authorLastName"
                  variant="bordered"
                  className="flex-grow"
                  value={formData.authorLastName}
                  onChange={handleChange}
                />
                <Input
                  isReadOnly
                  isDisabled
                  type="text"
                  label="Vorname"
                  name="authorFirstName"
                  variant="bordered"
                  className="flex-grow"
                  value={formData.authorFirstName}
                  onChange={handleChange}
                />
              </div>

              <Spacer y={5} />

              <Input
                isReadOnly
                isDisabled
                type="email"
                label="Email"
                name="authorEmail"
                variant="bordered"
                className="max-w"
                value={formData.authorEmail}
              />

              <Spacer y={3} />

              <Input
                isReadOnly
                isDisabled
                type="text"
                label="Geburtsdatum"
                name="authorBirthday"
                variant="bordered"
                className="max-w"
                value={formData.authorBirthday?.toLocaleDateString()}
              />
            </CardBody>
          </Card>

          <Card shadow="md">
            <CardHeader className="flex justify-between gap-3">
              <h1 className="text-3xl">Lokation</h1>

              {(isCreationMode || isEditMode) && (
                <div>
                  <Button
                    isIconOnly
                    color="primary"
                    size="lg"
                    onPress={() => setShowLocationModal(true)}
                  >
                    <AiOutlineSearch className="m-1" />
                  </Button>

                  <LocationModal
                    freeLocations={locations}
                    show={showLocationModal}
                    close={() => setShowLocationModal(false)}
                    setLocation={setLocation}
                  />
                </div>
              )}
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex gap-2">
                <div className="sr-only" hidden>
                  <Input
                    isReadOnly
                    name="locationId"
                    type="number"
                    label="Id"
                    variant="bordered"
                    value={formData.locationId?.toString()}
                    onChange={handleChange}
                  />
                </div>

                <Input
                  isReadOnly
                  isDisabled
                  type="text"
                  label="Etage"
                  name="locationFloor"
                  variant="bordered"
                  className="grow"
                  value={formData.locationFloor?.toString()}
                  onChange={handleChange}
                />
                <Input
                  isReadOnly
                  isDisabled
                  type="text"
                  label="Regal"
                  name="locationShelf"
                  variant="bordered"
                  className="grow"
                  value={formData.locationShelf?.toString()}
                  onChange={handleChange}
                />
                <Input
                  isReadOnly
                  isDisabled
                  type="text"
                  name="locationShelfSection"
                  label="Regalabschnitt"
                  variant="bordered"
                  className="grow"
                  value={formData.locationShelfSection?.toString()}
                  onChange={handleChange}
                />
              </div>
            </CardBody>
          </Card>

          {!isCreationMode && (
                  <Card shadow="md">
                    <CardHeader className="flex justify-between gap-3">
                      <h1 className="text-3xl">Ausleihe</h1>

                      {isDetailsMode && (
                        <div className="flex-grow justify-items-center">
                          <Chip
                            variant="flat"
                            color={isRented ? "warning" : "success"}
                          >
                            {isRented ? "ausgeliehen" : "nicht ausgeliehen"}
                          </Chip>
                        </div>
                      )}

                      {isEmployee && !isRented && (
                        <div className="flex flex-row gap-2">
                          <Button
                            isIconOnly
                            size="lg"
                            onPress={() => setShowUserModal(true)}
                            color="primary"
                          >
                            <AiOutlineSearch className="m-1" />
                          </Button>

                          <UserModal
                            userList={users}
                            show={showUserModal}
                            close={() => setShowUserModal(false)}
                            setUser={setUser}
                          />
                        </div>
                      )}
                    </CardHeader>
                    {isEmployee && isRented && (
                      <>
                        <Divider />
                        <CardBody className="flex flex-row gap-2">
                          <div className="sr-only" hidden>
                            <Input
                              isReadOnly
                              type="text"
                              label="ID"
                              name="rentedMediaId"
                              variant="bordered"
                              className="max-w"
                              value={formData.rentedMediaId?.toString()}
                            />
                          </div>
                          <Input
                            isReadOnly
                            isDisabled
                            type="text"
                            label="Kunden-ID"
                            name="rentedMediaUserId"
                            variant="bordered"
                            className="max-w"
                            value={formData.rentedMediaUserId?.toString()}
                          />
                          <Input
                            isReadOnly
                            isDisabled
                            type="text"
                            label="Nachname"
                            name="rentedMediaUserLastName"
                            variant="bordered"
                            className="max-w"
                            value={formData.rentedMediaUserLastName?.toString()}
                          />
                          <Input
                            isReadOnly
                            isDisabled
                            type="text"
                            label="Nachname"
                            name="rentedMediaUserFirstName"
                            variant="bordered"
                            className="max-w"
                            value={formData.rentedMediaUserFirstName?.toString()}
                          />
                        </CardBody>
                      </>
                    )}
                  </Card>
                )}
              </div>
            </div>

            <EditButton />
    </form>
  );
}
