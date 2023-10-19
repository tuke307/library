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
} from "@nextui-org/react";
import React from "react";
import { MediaTableProp } from "@/models/mediaTable";

export default function MediaTable({
  mediaTableProps,
}: {
  mediaTableProps: MediaTableProp[];
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "title",
    direction: "ascending",
  });

  const medias = mediaTableProps;
  const rowsPerPage = 10;
  const hasSearchFilter = Boolean(filterValue);

  const pages = Math.ceil(medias.length / rowsPerPage);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...medias];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((media) =>
        media.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [medias, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof MediaTableProp] ?? "";
      const second = b[sortDescriptor.column as keyof MediaTableProp] ?? "";
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onSearchChange = React.useCallback(
    (value: React.SetStateAction<string>) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    },
    [],
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder="Suche nach Titel..."
          size="sm"
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
      </div>
    );
  }, [filterValue, onSearchChange, hasSearchFilter]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <section className="m-10">
      <Table
        aria-label="Example table with dynamic content"
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn key="title" allowsSorting>
            Titel
          </TableColumn>
          <TableColumn key="authorName" allowsSorting>
            Author
          </TableColumn>
          <TableColumn key="location" allowsSorting>
            Ort
          </TableColumn>
          <TableColumn key="rented" allowsSorting>
            Verfügbarkeit
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{getKeyValue(item, "title")}</TableCell>
              <TableCell>{getKeyValue(item, "authorName")}</TableCell>
              <TableCell>{getKeyValue(item, "locationName")}</TableCell>
              <TableCell>
                <Chip
                  className="gap-1 border-none capitalize text-default-600"
                  color={
                    Boolean(getKeyValue(item, "rented"))
                      ? "danger"
                      : "success"
                  }
                  size="sm"
                  variant="flat"
                >
                  {Boolean(getKeyValue(item, "rented"))
                    ? "vermietet"
                    : "verfügbar"}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
