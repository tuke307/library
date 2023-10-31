"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Input,
  Chip,
  Button,
  Link,
  SortDescriptor,
} from "@nextui-org/react";
import React from "react";
import { RentedMediaTableProp } from "@/models/rentedMediaTable";
import { updateRentedMediaById } from "@/actions/rentedMedia";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ReturnMediaTable({
  returnMediaTableProps,
}: {
  returnMediaTableProps: RentedMediaTableProp[] | null;
}) {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "returnedAt",
    direction: "descending",
  });

  const medias = returnMediaTableProps;
  const rowsPerPage = 10;

  const pages = Math.ceil((medias?.length ?? 0) / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return medias?.slice(start, end) ?? [];
  }, [page, medias, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first =
        a[sortDescriptor.column as keyof RentedMediaTableProp] ?? "";
      const second =
        b[sortDescriptor.column as keyof RentedMediaTableProp] ?? "";
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages]);

  async function updateRentedMedia(id: number) {
    const rentedMedia = await updateRentedMediaById(id);

    if (!rentedMedia) {
      toast.error("Fehler beim Zurückgeben des Mediums");
      return;
    } else {
      router.refresh();
      toast.success("Medium erfolgreich zurückgegeben");
    }
  }

  return (
    <section>
      <Table
        aria-label="return media table"
        topContentPlacement="outside"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn key="mediaTitle" allowsSorting>
            Titel
          </TableColumn>
          <TableColumn key="mediaId" allowsSorting>
            Media ID
          </TableColumn>
          <TableColumn key="rentedAt" allowsSorting>
            Ausgeliehen am
          </TableColumn>
          <TableColumn key="returnedAt" allowsSorting>
            Zurückgegeben am
          </TableColumn>
          <TableColumn key="action">Aktion</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"keine ausgeliehenen Medien gefunden."}>
          {sortedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{getKeyValue(item, "mediaTitle")}</TableCell>
              <TableCell>{getKeyValue(item, "mediaId")}</TableCell>
              <TableCell>
                {getKeyValue(item, "rentedAt").toLocaleDateString()}
              </TableCell>
              <TableCell>
                {getKeyValue(item, "returnedAt")
                  ? getKeyValue(item, "returnedAt").toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell>
                {getKeyValue(item, "returnedAt") ? (
                  "-"
                ) : (
                  <Button
                    onPress={() => updateRentedMedia(getKeyValue(item, "id"))}
                    color="primary"
                    variant="flat"
                  >
                    zurückgegeben
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
