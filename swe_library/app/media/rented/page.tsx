"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function UserLoginPage() {
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState({
    userId: 1,
  });

  function handleChange(event: React.ChangeEvent<any>) {
    // TODO: any weg
    setWrongCredentials(false);
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // login the user
    try {
      setLoading(true);

      //const user = await getUserById(formData.userId);
      
      // todo: set user in session

    } catch (error: any) {
      /*
      // check if error code is 400 (wrong credentials)
      if ((error as ClientResponseError).status === 400) {
        setWrongCredentials(true);
        setErrorText(
          "Die angegebene E-Mail-Adresse oder das Passwort ist ungültig.",
        );
      } else {
        setErrorText(
          "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
        );
      }
      */
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="m-10">
      <form onSubmit={handleSubmit}>
        <div className="grid-cols-2 grid gap-5">
          <Input
            isRequired
            value={formData.userId.toString()}
            label="Kundennumer"
            type="number"
            variant="bordered"
            name="id"
            labelPlacement="outside"
            placeholder="Gib deine Kundennummer ein"
            className="max-w-xs"
            onChange={handleChange}
            validationState={wrongCredentials ? "invalid" : "valid"}
          />

          <Button
            type="submit"
            isLoading={loading}
            className="mt-10"
            color="primary"
          >
            Login
          </Button>
          <p className="mb-4 text-center text-base text-red-500">{errorText}</p>
        </div>
      </form>

      <section>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </section>
  );
}
