"use client";
import React from "react";
import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  SortDescriptor,
  Selection,
} from "@nextui-org/react";
import { Media } from "@prisma/client";
import { MediaTableProp } from "@/models/mediaTable";

export default function MediaModal({
  mediaList,
  show,
  close,
  setMedia,
}: {
  mediaList: MediaTableProp[] | null;
  show: boolean;
  close: () => void;
  setMedia: (selectedMedia: MediaTableProp) => void;
}) {
  const { onClose, onOpen, onOpenChange } = useDisclosure();
  const [MediaFilterValue, setMediaFilterValue] = React.useState("");
  const [MediaPage, setMediaPage] = React.useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "lastName",
    direction: "ascending",
  });
  const [selectedMediaKeys, setSelectedMediaKeys] = React.useState<Selection>(
    new Set([]),
  );

  const Medias = mediaList;
  const rowsPerPage = 10;
  const hasSearchFilter = Boolean(MediaFilterValue);

  const MediaPages = Math.ceil((Medias?.length ?? 0) / rowsPerPage);

  const filteredMediaItems = React.useMemo(() => {
    let filteredUsers = [...(Medias ?? [])];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((Media) =>
        Media.title.toLowerCase().includes(MediaFilterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [Medias, MediaFilterValue]);

  const MediaItems = React.useMemo(() => {
    const start = (MediaPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredMediaItems.slice(start, end);
  }, [MediaPage, filteredMediaItems, rowsPerPage]);

  const sortedMediaItems = React.useMemo(() => {
    return [...MediaItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof MediaTableProp] ?? "";
      const second = b[sortDescriptor.column as keyof MediaTableProp] ?? "";
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, MediaItems]);

  const onSearchChange = React.useCallback(
    (value: React.SetStateAction<string>) => {
      if (value) {
        setMediaFilterValue(value);
        setMediaPage(1);
      } else {
        setMediaFilterValue("");
      }
    },
    [],
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <Input
          isClearable
          placeholder="Suche nach Titel..."
          size="sm"
          value={MediaFilterValue}
          variant="bordered"
          onClear={() => setMediaFilterValue("")}
          onValueChange={onSearchChange}
        />
      </div>
    );
  }, [MediaFilterValue, onSearchChange, hasSearchFilter]);

  const bottomMediaContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          page={MediaPage}
          total={MediaPages}
          variant="light"
          onChange={setMediaPage}
        />
      </div>
    );
  }, [MediaPage, MediaPages]);

  return (
    <Modal backdrop="blur" placeholder="center" isOpen={show} onClose={close}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          unausgeliehene Medien
        </ModalHeader>
        <ModalBody>
          <Table
            aria-label="Media table"
            topContent={topContent}
            topContentPlacement="outside"
            bottomContent={bottomMediaContent}
            bottomContentPlacement="outside"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            selectionMode="single"
            selectedKeys={selectedMediaKeys}
            onSelectionChange={setSelectedMediaKeys}
          >
            <TableHeader>
              <TableColumn key="id" allowsSorting>
                Id
              </TableColumn>
              <TableColumn key="title" allowsSorting>
                Title
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent={"keine Medien gefunden"}>
              {sortedMediaItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{getKeyValue(item, "id")}</TableCell>
                  <TableCell>{getKeyValue(item, "title")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={close}>
            schließen
          </Button>
          <Button
            color="primary"
            onPress={() => {
              const selectedMedia = sortedMediaItems.find(
                (x) =>
                  x.id ==
                  (selectedMediaKeys as Set<string>).values().next().value,
              );
              if (selectedMedia) {
                setMedia(selectedMedia);
              }

              close();
            }}
          >
            auswählen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
