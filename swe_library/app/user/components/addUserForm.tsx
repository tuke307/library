"use client";
import React from "react";
import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { createUser } from "@/actions/user";
import { SubmitButton } from "@/app/components/submitButton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialState = {
  lastName: "",
  firstName: "",
  email: "",
  street: "",
  houseNumber: "",
  plz: "",
  city: "",
};

export default async function AddUserForm() {
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const sendformData = new FormData();
    sendformData.append("lastName", formData.lastName);
    sendformData.append("firstName", formData.firstName);
    sendformData.append("email", formData.email);
    sendformData.append("street", formData.street);
    sendformData.append("houseNumber", formData.houseNumber);
    sendformData.append("plz", formData.plz);
    sendformData.append("city", formData.city);
  
    const user = await createUser(sendformData);

    if (!user) {
      toast.error("Nutzer konnte nicht erstellt werden");
      return;
    } else {
      router.back();
      toast.success("Nutzer erfolgreich erstellt");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
              value={formData.email}
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
              value={formData.plz}
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

      <SubmitButton text="Kunde erstellen" />
    </form>
  );
}
