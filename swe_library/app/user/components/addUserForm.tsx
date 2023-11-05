"use client";
import React from "react";
import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { createUser } from "@/actions/user";
import { SubmitButton } from "@/app/components/submitButton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

const initialState: User = {
  id: 0,
  lastName: "",
  firstName: "",
  email: "",
  street: "",
  houseNumber: "",
  plz: 0,
  city: "",
  birthday: new Date(),
  createdAt: new Date(),
};

export default function AddUserForm() {
  const router = useRouter();
  const [formData, setFormData] = React.useState(initialState);

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
    const user = await createUser(formData);

    if (!user) {
      toast.error("Nutzer konnte nicht erstellt werden");
      return;
    } else {
      router.back();
      toast.success("Nutzer erfolgreich erstellt");
    }
  }

  return (
    <form action={handleSubmit}>
      <Card shadow="md">
        <CardHeader className="flex gap-3">
          <h1 className="text-3xl">Nutzer hinzufügen</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-2 gap-2">
            <Input
              isRequired
              type="text"
              label="Nachname"
              placeholder="Enter your name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              isRequired
              type="text"
              label="Vorname"
              placeholder="Enter your Vorname"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <Input
              isRequired
              type="email"
              label="Email"
              placeholder="Enter your email"
              name="email"
              value={formData.email!}
              onChange={handleChange}
            />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2">
            <Input
              isRequired
              type="text"
              label="Straße"
              placeholder="Enter your Straße"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />

            <Input
              isRequired
              type="text"
              label="Hausnummer"
              placeholder="Gib deine Hausnummer ein"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
            />

            <Input
              isRequired
              type="number"
              label="PLZ"
              placeholder="Enter your PLZ"
              name="plz"
              value={formData.plz === 0 ? "" : formData.plz.toString()}
              onChange={handleChange}
            />

            <Input
              isRequired
              type="text"
              label="Stadt"
              placeholder="Enter your Stadt"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </CardBody>
      </Card>

      <SubmitButton>Kunde erstellen</SubmitButton>
    </form>
  );
}
