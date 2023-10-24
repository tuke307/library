"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import React from "react";
import { RentedMediaTableProp } from "@/models/rentedmediaTable";

export default function rentedMediaTable({
  rentedMediaTableProp,
}: {
  rentedMediaTableProp: RentedMediaTableProp[];
}) {
  return (
    <Table aria-label="Rented Media Table">
      <TableHeader>
        <TableColumn key="title">Titel</TableColumn>
        <TableColumn key="mediaId">Media ID</TableColumn>
        <TableColumn key="rentedAt">Ausgeliehen am</TableColumn>
        <TableColumn key="returnedAt">Zurückgegeben am</TableColumn>
      </TableHeader>

      <TableBody emptyContent={"Keine ausgeliehenen Medien."}>
        {rentedMediaTableProp.map((media) => (
          <TableRow key={media.mediaId}>
            <TableCell>{media.title}</TableCell>
            <TableCell>{media.mediaId}</TableCell>
            <TableCell>{media.rentedAt.toLocaleDateString()}</TableCell>
            <TableCell>
              {media.returnedAt
                ? media.returnedAt.toLocaleDateString()
                : "Nicht zurückgegeben"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
